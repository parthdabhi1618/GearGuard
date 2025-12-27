import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FiMoreHorizontal, FiUser } from "react-icons/fi"; // Install react-icons
import "./Kanban.css"; // Import the CSS

/* ---------------- DATA ---------------- */

const initialData = {
  open: [
    { id: "1", title: "Motor Repair - Conveyor", tech: "Ravi", priority: "High" },
    { id: "2", title: "AC Service - Server Room", tech: "Amit", priority: "Low" },
  ],
  progress: [
    { id: "3", title: "Server Check & Updates", tech: "Suresh", priority: "Medium" },
  ],
  done: [
     { id: "4", title: "Hydraulic Fluid Change", tech: "Ravi", priority: "High" }, 
  ],
};

/* ---------------- MAIN COMPONENT ---------------- */

export default function KanbanBoard() {
  const [columns, setColumns] = useState(initialData);
  const [activeId, setActiveId] = useState(null);

  // Setup sensors for better mobile/desktop touch handling
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor)
  );

  // Handle Dragging
  function onDragEnd(event) {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    // Find the source column and destination column
    const sourceColId = findColumn(active.id);
    const destColId = over.data.current?.sortable?.containerId || over.id; // Handle dropping on column or item

    if (!sourceColId || !destColId || sourceColId === destColId) return;

    const sourceItems = [...columns[sourceColId]];
    const destItems = [...columns[destColId]];
    const itemIndex = sourceItems.findIndex((i) => i.id === active.id);
    
    // Move item
    const [movedItem] = sourceItems.splice(itemIndex, 1);
    destItems.push(movedItem);

    setColumns({
      ...columns,
      [sourceColId]: sourceItems,
      [destColId]: destItems,
    });
  }

  function findColumn(itemId) {
    return Object.keys(columns).find((key) =>
      columns[key].some((i) => i.id === itemId)
    );
  }

  return (
    <div className="kanban-container">
      <div className="kanban-header">
        <h1>Maintenance Board</h1>
        <p>Drag and drop tickets to update status</p>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={(e) => setActiveId(e.active.id)}
        onDragEnd={onDragEnd}
      >
        <div className="kanban-board">
          {Object.entries(columns).map(([colId, items]) => (
            <KanbanColumn key={colId} id={colId} items={items} />
          ))}
        </div>
      </DndContext>
    </div>
  );
}

/* ---------------- COLUMN ---------------- */

function KanbanColumn({ id, items }) {
  const titleMap = {
    open: "Open Requests",
    progress: "In Progress",
    done: "Completed",
  };

  return (
    <div className="kanban-column">
      <div className="column-header">
        <span className="column-title">
            {/* Dot Indicator */}
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: getColumnColor(id) }}></span>
            {titleMap[id]}
        </span>
        <span className="task-count">{items.length}</span>
      </div>

      <SortableContext
        id={id} // Important: This ID is used to identify destination
        items={items.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        <div style={{ minHeight: "200px" }}> {/* Drop zone area */}
            {items.length === 0 ? (
            <div className="empty-placeholder">Drop items here</div>
            ) : (
            items.map((item) => <KanbanCard key={item.id} item={item} />)
            )}
        </div>
      </SortableContext>
    </div>
  );
}

/* ---------------- CARD ---------------- */

function KanbanCard({ item }) {
  const navigate = useNavigate();
  
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1, // Visual feedback when dragging
    borderLeft: `4px solid ${priorityColor(item.priority)}`,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="kanban-card"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
        <span className="card-title" onClick={() => navigate(`/maintenance/${item.id}`)}>
            {item.title}
        </span>
        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#94a3b8' }}>
            <FiMoreHorizontal />
        </button>
      </div>

      <PriorityBadge value={item.priority} />

      <div className="card-meta">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FiUser /> {item.tech}
        </div>
        <span>ID: {item.id}</span>
      </div>
    </div>
  );
}

/* ---------------- HELPERS ---------------- */

function getColumnColor(id) {
    if(id === 'open') return '#3b82f6';
    if(id === 'progress') return '#f59e0b';
    return '#22c55e';
}

function priorityColor(p) {
  if (p === "High") return "#ef4444";
  if (p === "Medium") return "#f59e0b";
  return "#22c55e";
}

function PriorityBadge({ value }) {
  const map = {
    High: { bg: "#fee2e2", text: "#991b1b" },
    Medium: { bg: "#fef3c7", text: "#92400e" },
    Low: { bg: "#dcfce7", text: "#166534" },
  };

  const style = map[value];

  return (
    <span
      style={{
        background: style.bg,
        color: style.text,
        padding: "2px 8px",
        borderRadius: "4px",
        fontSize: "11px",
        fontWeight: "600",
        display: "inline-block",
        marginTop: "8px",
      }}
    >
      {value}
    </span>
  );
}