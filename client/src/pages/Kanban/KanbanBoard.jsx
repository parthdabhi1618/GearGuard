import { useState } from "react";
import { motion } from "framer-motion";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { useNavigate } from "react-router-dom";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

/* ---------------- DATA ---------------- */

const initialData = {
  open: [
    { id: "1", title: "Motor Repair", tech: "Ravi", priority: "High" },
    { id: "2", title: "AC Service", tech: "Amit", priority: "Low" },
  ],
  progress: [
    { id: "3", title: "Server Check", tech: "Suresh", priority: "Medium" },
  ],
  done: [],
};

/* ---------------- PAGE ---------------- */

export default function KanbanBoard() {
  const [columns, setColumns] = useState(initialData);
  const [activeColumn, setActiveColumn] = useState(null);
  const navigate = useNavigate();


  function onDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    const from = activeColumn;
    const to = over.data.current?.column;

    if (!from || !to) return;

    const sourceItems = [...columns[from]];
    const destItems = [...columns[to]];

    const index = sourceItems.findIndex(i => i.id === active.id);
    const [moved] = sourceItems.splice(index, 1);
    destItems.push(moved);

    setColumns({
      ...columns,
      [from]: sourceItems,
      [to]: destItems,
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ padding: "30px" }}
    >
      <h1>Maintenance Kanban</h1>
      <p style={{ color: "#64748b", marginBottom: "25px" }}>
        Track and manage maintenance workflow
      </p>

      <DndContext
        collisionDetection={closestCenter}
        onDragStart={(e) => setActiveColumn(e.active.data.current.column)}
        onDragEnd={onDragEnd}
      >
        <div style={board}>
          {Object.entries(columns).map(([key, items]) => (
            <KanbanColumn key={key} id={key} items={items} />
          ))}
        </div>
      </DndContext>
    </motion.div>
  );
}

/* ---------------- COLUMN ---------------- */

function KanbanColumn({ id, items }) {
  return (
    <motion.div
      whileHover={{ backgroundColor: "#eef2ff" }}
      transition={{ duration: 0.2 }}
      style={column}
    >
      <h3 style={{ marginBottom: "12px" }}>{titleMap[id]}</h3>

      <SortableContext
        items={items.map(i => i.id)}
        strategy={verticalListSortingStrategy}
      >
        {items.length === 0 ? (
          <div style={emptyColumn}>No tasks</div>
        ) : (
          items.map(item => (
            <KanbanCard key={item.id} item={item} column={id} />
          ))
        )}
      </SortableContext>
    </motion.div>
  );
}

/* ---------------- CARD ---------------- */

function KanbanCard({ item, column }) {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: item.id,
      data: { column },
    });

  return (
    <motion.div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      style={{
        ...card,
        transform: CSS.Transform.toString(transform),
        transition,
        borderLeft: `6px solid ${priorityColor(item.priority)}`,
      }}
    >
      <strong onClick={() => navigate("/maintenance/101")} style={{ cursor: "pointer" }}>
          {item.title}
      </strong>

      <p style={meta}>Technician: {item.tech}</p>
      <PriorityBadge value={item.priority} />
    </motion.div>
  );
}

/* ---------------- UI PARTS ---------------- */

function PriorityBadge({ value }) {
  const map = {
    High: ["#fee2e2", "#991b1b"],
    Medium: ["#fef3c7", "#92400e"],
    Low: ["#dcfce7", "#166534"],
  };

  const [bg, color] = map[value];

  return (
    <span
      style={{
        background: bg,
        color,
        padding: "4px 10px",
        borderRadius: "12px",
        fontSize: "12px",
        display: "inline-block",
        marginTop: "6px",
      }}
    >
      {value}
    </span>
  );
}

/* ---------------- HELPERS ---------------- */

const titleMap = {
  open: "Open",
  progress: "In Progress",
  done: "Done",
};

function priorityColor(p) {
  if (p === "High") return "#ef4444";
  if (p === "Medium") return "#f59e0b";
  return "#22c55e";
}

/* ---------------- STYLES ---------------- */

const board = {
  display: "flex",
  gap: "20px",
};

const column = {
  background: "#f8fafc",
  padding: "16px",
  borderRadius: "14px",
  width: "300px",
  minHeight: "420px",
  transition: "0.2s",
};

const card = {
  background: "#ffffff",
  padding: "14px",
  borderRadius: "10px",
  marginBottom: "12px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  cursor: "grab",
};

const meta = {
  fontSize: "13px",
  color: "#475569",
  margin: "6px 0",
};

const emptyColumn = {
  textAlign: "center",
  color: "#94a3b8",
  fontSize: "14px",
  marginTop: "40px",
};
