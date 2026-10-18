import { DONE_COLUMNS } from "../constants/columns";

/* A task is "open" while it still lives outside the finished columns. */
export const isOpenTask = (task) => !DONE_COLUMNS.includes(task.column);

/* A task is "done" once it sits in a finished column. */
export const isDoneTask = (task) => DONE_COLUMNS.includes(task.column);

/* Case-insensitive title/description match used by the global search. */
export const matchesQuery = (task, query) => {
  const q = (query ?? "").trim().toLowerCase();
  if (!q) return true;
  return `${task.title ?? ""} ${task.description ?? ""}`
    .toLowerCase()
    .includes(q);
};

/* Stable, collision-safe-enough id for tasks (with a crypto fallback). */
export const uid = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `task-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
