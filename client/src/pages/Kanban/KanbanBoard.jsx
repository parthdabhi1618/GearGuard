import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
import { FiMoreHorizontal, FiUser, FiFilter, FiX, FiAlertCircle } from "react-icons/fi";
import "./Kanban.css";

/* ---------------- DATA ---------------- */

const initialData = {
  new: [
    { 
      id: "1", 
      title: "Motor Repair - Conveyor", 
      tech: "Ravi", 
      priority: "High",
      equipment: "EQ-001",
      equipmentName: "CNC Machine",
      dueDate: "2025-12-25"
    },
    { 
      id: "2", 
      title: "AC Service - Server Room", 
      tech: "Amit", 
      priority: "Low",
      equipment: "EQ-002",
      equipmentName: "Air Conditioner",
      dueDate: "2025-12-28"
    },
  ],
  progress: [
    { 
      id: "3", 
      title: "Server Check & Updates", 
      tech: "Suresh", 
      priority: "Medium",
      equipment: "EQ-003",
      equipmentName: "Server Rack",
      dueDate: "2025-12-26"
    },
  ],
  repaired: [
    { 
      id: "4", 
      title: "Hydraulic Fluid Change", 
      tech: "Ravi", 
      priority: "High",
      equipment: "EQ-001",
      equipmentName: "CNC Machine",
      dueDate: "2025-12-20"
    }, 
  ],
  scrap: []
};

/* ---------------- MAIN COMPONENT ---------------- */

export default function KanbanBoard() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [columns, setColumns] = useState(initialData);
  const [activeId, setActiveId] = useState(null);
  const [equipmentFilter, setEquipmentFilter] = useState(searchParams.get("equipment") || "");
  const [showFilters, setShowFilters] = useState(false);

  // Setup sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor)
  );

  // Filter columns based on equipment
  const filteredColumns = equipmentFilter ? 
    Object.keys(columns).reduce((acc, colId) => {
      acc[colId] = columns[colId].filter(item => item.equipment === equipmentFilter);
      return acc;
    }, {}) : columns;

  // Handle Dragging
  function onDragEnd(event) {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const sourceColId = findColumn(active.id);
    const destColId = over.data.current?.sortable?.containerId || over.id;

    if (!sourceColId || !destColId) return;

    // Handle scrap logic
    if (destColId === "scrap") {
      const confirmScrap = window.confirm(
        "Moving to Scrap will mark this equipment as no longer usable. Continue?"
      );
      
      if (!confirmScrap) {
        return;
      }
    }

    // Move between same column (reordering)
    if (sourceColId === destColId) {
      const items = [...columns[sourceColId]];
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      
      if (oldIndex !== newIndex) {
        const [movedItem] = items.splice(oldIndex, 1);
        items.splice(newIndex, 0, movedItem);
        
        setColumns({
          ...columns,
          [sourceColId]: items,
        });
      }
      return;
    }

    // Move between different columns
    const sourceItems = [...columns[sourceColId]];
    const destItems = [...columns[destColId]];
    const itemIndex = sourceItems.findIndex((i) => i.id === active.id);
    
    const [movedItem] = sourceItems.splice(itemIndex, 1);
    destItems.push(movedItem);

    setColumns({
      ...columns,
      [sourceColId]: sourceItems,
      [destColId]: destItems,
    });

    // Log the stage change
    console.log(`Request ${active.id} moved from ${sourceColId} to ${destColId}`);
  }

  function findColumn(itemId) {
    return Object.keys(columns).find((key) =>
      columns[key].some((i) => i.id === itemId)
    );
  }

  function clearFilter() {
    setEquipmentFilter("");
    navigate("/kanban", { replace: true });
  }

  // Calculate total counts
  const totalRequests = Object.values(filteredColumns).reduce((sum, col) => sum + col.length, 0);

  return (
    <div className="kanban-container">
      <div className="kanban-header">
        <div>
          <h1>Maintenance Board</h1>
          <p>Drag and drop tickets to update status • {totalRequests} total requests</p>
        </div>
        
        <button 
          className="filter-toggle-btn"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FiFilter /> Filters
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="filter-panel">
          <div className="filter-header">
            <h3>Filter by Equipment</h3>
            {equipmentFilter && (
              <button className="clear-filter-btn" onClick={clearFilter}>
                <FiX /> Clear
              </button>
            )}
          </div>
          
          <div className="filter-options">
            {["EQ-001", "EQ-002", "EQ-003"].map(eq => (
              <button
                key={eq}
                className={`filter-chip ${equipmentFilter === eq ? "active" : ""}`}
                onClick={() => setEquipmentFilter(eq === equipmentFilter ? "" : eq)}
              >
                {eq}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Active Filter Badge */}
      {equipmentFilter && (
        <div className="active-filter-badge">
          <FiFilter size={14} />
          Showing requests for: <strong>{equipmentFilter}</strong>
          <button onClick={clearFilter} style={{ marginLeft: "8px" }}>
            <FiX size={16} />
          </button>
        </div>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={(e) => setActiveId(e.active.id)}
        onDragEnd={onDragEnd}
      >
        <div className="kanban-board">
          {Object.entries(filteredColumns).map(([colId, items]) => (
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
    new: "New Requests",
    progress: "In Progress",
    repaired: "Repaired",
    scrap: "Scrapped"
  };

  return (
    <div className="kanban-column">
      <div className="column-header">
        <span className="column-title">
          <span style={{ 
            width: 8, 
            height: 8, 
            borderRadius: "50%", 
            background: getColumnColor(id) 
          }}></span>
          {titleMap[id]}
        </span>
        <span className="task-count">{items.length}</span>
      </div>

      <SortableContext
        id={id}
        items={items.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        <div style={{ minHeight: "200px" }}>
          {items.length === 0 ? (
            <div className="empty-placeholder">
              {id === "scrap" ? "No scrapped items" : "Drop items here"}
            </div>
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

  // Check if overdue
  const isOverdue = item.dueDate && new Date(item.dueDate) < new Date();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
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
      {/* Overdue indicator */}
      {isOverdue && (
        <div className="overdue-strip">
          <FiAlertCircle size={14} />
          OVERDUE
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
        <span 
          className="card-title" 
          onClick={() => navigate(`/maintenance/${item.id}`)}
        >
          {item.title}
        </span>
        <button style={{ 
          border: 'none', 
          background: 'transparent', 
          cursor: 'pointer', 
          color: '#94a3b8' 
        }}>
          <FiMoreHorizontal />
        </button>
      </div>

      <div style={{ 
        fontSize: "12px", 
        color: "#64748b", 
        marginTop: "6px",
        display: "flex",
        alignItems: "center",
        gap: "4px"
      }}>
        {item.equipmentName} ({item.equipment})
      </div>

      <PriorityBadge value={item.priority} />

      <div className="card-meta">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <FiUser /> {item.tech}
        </div>
        <span>ID: {item.id}</span>
      </div>

      {item.dueDate && (
        <div style={{ 
          fontSize: "11px", 
          color: isOverdue ? "#991b1b" : "#64748b",
          marginTop: "8px",
          fontWeight: isOverdue ? "600" : "normal"
        }}>
          Due: {new Date(item.dueDate).toLocaleDateString()}
        </div>
      )}
    </div>
  );
}

/* ---------------- HELPERS ---------------- */

function getColumnColor(id) {
  if(id === 'new') return '#3b82f6';
  if(id === 'progress') return '#f59e0b';
  if(id === 'repaired') return '#22c55e';
  return '#64748b'; // scrap
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