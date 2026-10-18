import { LuCircleCheck, LuClipboardList, LuListTodo, LuTimer } from "react-icons/lu";

/*
  The kanban columns. Keys are stable (they are what gets persisted to
  localStorage), the rest is presentation used across the app.
*/
export const COLUMNS = [
  {
    id: "todo",
    title: "To Do",
    dot: "bg-primary",
    text: "text-primary",
    chip: "badge-primary",
    Icon: LuListTodo,
  },
  {
    id: "progress",
    title: "In Progress",
    dot: "bg-warning",
    text: "text-warning",
    chip: "badge-warning",
    Icon: LuTimer,
  },
  {
    id: "done",
    title: "Done",
    dot: "bg-success",
    text: "text-success",
    chip: "badge-success",
    Icon: LuCircleCheck,
  },
  {
    id: "completed",
    title: "Archived",
    dot: "bg-base-content/40",
    text: "text-base-content/60",
    chip: "badge-neutral",
    Icon: LuClipboardList,
  },
];

export const COLUMN_IDS = COLUMNS.map((column) => column.id);

/* Columns that hold finished work. */
export const DONE_COLUMNS = ["done", "completed"];

export const PRIORITIES = [
  { id: "low", label: "Low", badge: "badge-info", dot: "bg-info", text: "text-info", border: "border-l-info", chip: "badge-info" },
  { id: "medium", label: "Medium", badge: "badge-warning", dot: "bg-warning", text: "text-warning", border: "border-l-warning", chip: "badge-warning" },
  { id: "high", label: "High", badge: "badge-error", dot: "bg-error", text: "text-error", border: "border-l-error", chip: "badge-error" },
];

export const columnMeta = (id) =>
  COLUMNS.find((column) => column.id === id) ?? COLUMNS[0];

export const priorityMeta = (id) =>
  PRIORITIES.find((priority) => priority.id === id) ?? PRIORITIES[1];
