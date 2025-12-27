import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  // arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

const initialData = {
  open: [
    { id: "1", title: "Motor Repair", priority: "High", tech: "Ravi" },
    { id: "2", title: "AC Service", priority: "Low", tech: "Amit" },
  ],
  progress: [
    { id: "3", title: "Server Check", priority: "Medium", tech: "Suresh" },
  ],
  done: [],
};

export default function KanbanBoard() {
  const [columns, setColumns] = useState(initialData);
  const [activeCol, setActiveCol] = useState(null);

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    const sourceCol = activeCol;
    const destCol = over.data.current?.column;

    if (!sourceCol || !destCol) return;

    const sourceItems = [...columns[sourceCol]];
    const destItems = [...columns[destCol]];

    const activeIndex = sourceItems.findIndex(i => i.id === active.id);
    const [moved] = sourceItems.splice(activeIndex, 1);

    destItems.push(moved);

    setColumns({
      ...columns,
      [sourceCol]: sourceItems,
      [destCol]: destItems,
    });
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>Maintenance Kanban</h1>

      <DndContext
        collisionDetection={closestCenter}
        onDragStart={(e) => setActiveCol(e.active.data.current.column)}
        onDragEnd={handleDragEnd}
      >
        <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
          {Object.entries(columns).map(([key, items]) => (
            <KanbanColumn key={key} id={key} items={items} />
          ))}
        </div>
      </DndContext>
    </div>
  );
}

/* ---------- Column ---------- */

function KanbanColumn({ id, items }) {
  return (
    <div style={column}>
      <h3>{titleMap[id]}</h3>

      <SortableContext
        items={items.map(i => i.id)}
        strategy={verticalListSortingStrategy}
      >
        {items.map(item => (
          <KanbanCard key={item.id} item={item} column={id} />
        ))}
      </SortableContext>
    </div>
  );
}

/* ---------- Card ---------- */

function KanbanCard({ item, column }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: item.id,
    data: { column },
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        ...card,
        transform: CSS.Transform.toString(transform),
        transition,
        borderLeft: `6px solid ${priorityColor(item.priority)}`,
      }}
    >
      <strong>{item.title}</strong>
      <p style={small}>Technician: {item.tech}</p>
      <p style={small}>Priority: {item.priority}</p>
    </div>
  );
}

/* ---------- Helpers ---------- */

const titleMap = {
  open: "Open",
  progress: "In Progress",
  done: "Done",
};

function priorityColor(p) {
  if (p === "High") return "#f97316";
  if (p === "Medium") return "#eab308";
  return "#22c55e";
}

/* ---------- Styles ---------- */

const column = {
  background: "#f8fafc",
  padding: "15px",
  width: "300px",
  borderRadius: "10px",
  minHeight: "400px",
};

const card = {
  background: "#ffffff",
  padding: "12px",
  borderRadius: "8px",
  marginBottom: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
};

const small = {
  fontSize: "13px",
  color: "#475569",
  margin: "4px 0",
};
