import { useCallback, useEffect, useMemo, useState } from "react";
import { TaskContext } from "./TaskContext";
import { COLUMN_IDS, DONE_COLUMNS } from "../constants/columns";
import { todayISO, dueMeta } from "../utils/date";
import { uid } from "../utils/taskUtils";

const STORAGE_KEY = "taskflow.tasks.v1";
const DAY_MS = 24 * 60 * 60 * 1000;

const emptyBoard = () =>
  COLUMN_IDS.reduce((board, id) => ({ ...board, [id]: [] }), {});

/* A little demo data on the very first visit so the board isn't empty. */
const seedBoard = () => {
  const now = Date.now();
  const day = (offset) => todayISO(new Date(now + offset * DAY_MS));
  const task = (daysAgo, title, description, priority, date) => ({
    id: uid(),
    title,
    description,
    priority,
    date,
    createdAt: now - daysAgo * DAY_MS,
  });

  return {
    todo: [
      task(0, "Plan the week", "Pick the three outcomes that matter most and block time for them.", "high", day(1)),
      task(1, "Reply to design feedback", "Clear the leftover comments from the last review round.", "medium", todayISO()),
      task(2, "Research note-taking apps", "Compare the two contenders and write a short summary.", "low", day(4)),
      task(3, "Book dentist appointment", "", "medium", day(6)),
    ],
    progress: [
      task(2, "Polish onboarding flow", "Tighten the copy and fix spacing on the welcome screens.", "high", todayISO()),
      task(4, "Write release notes", "Summarize what shipped this cycle for the team announcement.", "medium", day(2)),
    ],
    done: [
      task(6, "Set up design tokens", "Colors, spacing and typography shared across the app.", "medium", day(-1)),
      task(8, "Fix login redirect bug", "Users were landing on a blank page after signing in.", "high", day(-2)),
    ],
    completed: [
      task(12, "Create the project board", "Columns, labels and the first batch of tasks.", "low", day(-5)),
    ],
  };
};

/* Read persisted tasks (or seed on first visit), always merging into a
   complete board so an older/foreign payload can never break the UI. */
const loadBoard = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedBoard();

    const parsed = JSON.parse(raw);
    const board = emptyBoard();
    for (const id of COLUMN_IDS) {
      if (Array.isArray(parsed?.[id])) board[id] = parsed[id];
    }
    return board;
  } catch {
    return emptyBoard();
  }
};

/* Which column currently holds this task id? */
const findColumnIn = (board, taskId) =>
  COLUMN_IDS.find((column) =>
    (board[column] ?? []).some((task) => task.id === taskId),
  ) ?? null;

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(loadBoard);
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState({ open: false, column: "todo", task: null });

  /* Persist every change. */
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      /* storage may be unavailable (private mode, quota) — ignore */
    }
  }, [tasks]);

  /* ------------------------------- actions ------------------------------ */

  const addTask = useCallback((data, column = "todo") => {
    const newTask = { id: uid(), createdAt: Date.now(), ...data };
    setTasks((prev) => ({
      ...prev,
      [column]: [newTask, ...(prev[column] ?? [])],
    }));
    return newTask;
  }, []);

  const updateTask = useCallback((id, patch, targetColumn = null) => {
    setTasks((prev) => {
      const from = findColumnIn(prev, id);
      if (!from) return prev;

      const task = prev[from].find((t) => t.id === id);
      const updated = { ...task, ...patch };
      const to = targetColumn && prev[targetColumn] ? targetColumn : from;

      const remaining = prev[from].filter((t) => t.id !== id);
      const toList =
        to === from
          ? [updated, ...remaining]
          : [updated, ...(prev[to] ?? [])];

      return { ...prev, [from]: remaining, [to]: toList };
    });
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks((prev) => {
      const column = findColumnIn(prev, id);
      if (!column) return prev;
      return { ...prev, [column]: prev[column].filter((t) => t.id !== id) };
    });
  }, []);

  /* Move a task, optionally inserting it before another card. */
  const moveTask = useCallback((id, toColumn, beforeId = null) => {
    setTasks((prev) => {
      const from = findColumnIn(prev, id);
      if (!from || !prev[toColumn]) return prev;

      const task = prev[from].find((t) => t.id === id);
      if (!task) return prev;

      const sameColumn = from === toColumn;
      const fromList = prev[from].filter((t) => t.id !== id);
      const toList = sameColumn ? [...fromList] : [...prev[toColumn]];

      if (beforeId && beforeId !== id) {
        const index = toList.findIndex((t) => t.id === beforeId);
        if (index >= 0) toList.splice(index, 0, task);
        else toList.push(task);
      } else {
        toList.push(task);
      }

      return { ...prev, [from]: fromList, [toColumn]: toList };
    });
  }, []);

  /* Tick a task complete (or send it back to To Do from a finished column). */
  const toggleTaskDone = useCallback((id) => {
    setTasks((prev) => {
      const from = findColumnIn(prev, id);
      if (!from) return prev;

      const task = prev[from].find((t) => t.id === id);
      const to = DONE_COLUMNS.includes(from) ? "todo" : "done";

      return {
        ...prev,
        [from]: prev[from].filter((t) => t.id !== id),
        [to]: [task, ...(prev[to] ?? [])],
      };
    });
  }, []);

  /* --------------------------- modal control ---------------------------- */

  const openAddTask = useCallback(
    (column = "todo") => setModal({ open: true, column, task: null }),
    [],
  );
  const openEditTask = useCallback(
    (task, column) => setModal({ open: true, column, task }),
    [],
  );
  const closeTaskModal = useCallback(
    () => setModal((prev) => ({ ...prev, open: false })),
    [],
  );

  /* ------------------------------ derived ------------------------------- */

  const findColumn = useCallback(
    (id) => findColumnIn(tasks, id),
    [tasks],
  );

  const allTasks = useMemo(
    () =>
      COLUMN_IDS.flatMap((column) =>
        (tasks[column] ?? []).map((task) => ({ ...task, column })),
      ),
    [tasks],
  );

  const stats = useMemo(() => {
    const withMeta = allTasks.map((task) => ({
      ...task,
      due: dueMeta(task.date),
    }));
    const open = withMeta.filter(
      (task) => !DONE_COLUMNS.includes(task.column),
    );

    const completedCount = withMeta.length - open.length;
    const counts = COLUMN_IDS.reduce(
      (acc, id) => ({ ...acc, [id]: (tasks[id] ?? []).length }),
      {},
    );
    const priority = open.reduce(
      (acc, task) => ({ ...acc, [task.priority]: (acc[task.priority] ?? 0) + 1 }),
      { low: 0, medium: 0, high: 0 },
    );
    const now = new Date();

    return {
      total: withMeta.length,
      openCount: open.length,
      inProgress: counts.progress ?? 0,
      completedCount,
      overdue: open.filter((task) => task.due?.isOverdue).length,
      dueToday: open.filter((task) => task.due?.isToday).length,
      highPriority: open.filter((task) => task.priority === "high").length,
      addedThisWeek: withMeta.filter(
        (task) => now.getTime() - (task.createdAt ?? 0) < 7 * DAY_MS,
      ).length,
      percent:
        withMeta.length === 0
          ? 0
          : Math.round((completedCount / withMeta.length) * 100),
      counts,
      priority,
    };
  }, [allTasks, tasks]);

  /* Open tasks with a due date, soonest first. */
  const upcoming = useMemo(
    () =>
      allTasks
        .filter(
          (task) =>
            !DONE_COLUMNS.includes(task.column) && dueMeta(task.date),
        )
        .map((task) => ({ ...task, due: dueMeta(task.date) }))
        .sort((a, b) => a.due.diff - b.due.diff),
    [allTasks],
  );

  /* Overdue / due-today tasks shown in the notification dropdown. */
  const attention = useMemo(
    () =>
      upcoming.filter((task) => task.due.isOverdue || task.due.isToday),
    [upcoming],
  );

  const value = {
    tasks,
    setTasks,
    allTasks,
    stats,
    upcoming,
    attention,
    query,
    setQuery,
    modal,
    openAddTask,
    openEditTask,
    closeTaskModal,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    toggleTaskDone,
    findColumn,
  };

  return <TaskContext value={value}>{children}</TaskContext>;
};
