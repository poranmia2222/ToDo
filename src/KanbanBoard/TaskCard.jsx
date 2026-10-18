import { useContext } from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { LuCalendarDays, LuCheck, LuGripVertical, LuPencil, LuTrash2 } from "react-icons/lu";
import { TaskContext } from "../Context/TaskContext";
import { DONE_COLUMNS, priorityMeta } from "../constants/columns";
import { dueMeta, dueToneClass } from "../utils/date";

/*
  The visual part of a task card. Rendered both by the live card (with drag
  listeners attached) and by the DragOverlay ghost while a drag is running.
*/
export const TaskCardBody = ({ task, columnId, isDragging = false, overlay = false, dragProps = {} }) => {
    const { deleteTask, toggleTaskDone, openEditTask } = useContext(TaskContext);

    const isDone = DONE_COLUMNS.includes(columnId);
    const priority = priorityMeta(task.priority);
    const due = dueMeta(task.date);

    return (
        <div
            className={`group relative rounded-xl border border-l-4 border-base-300 ${priority.border} bg-base-100 p-3.5 shadow-sm transition-[box-shadow,opacity,border-color] ${
                isDragging
                    ? "opacity-40 border-dashed"
                    : "hover:border-base-content/20 hover:shadow-md"
            }`}
        >
            {/* Drag handle */}
            <div className="mb-1 flex items-start justify-between gap-2">
                <button
                    type="button"
                    aria-label="Drag to move task"
                    {...dragProps}
                    className="cursor-grab touch-none rounded-md p-0.5 text-base-content/25 transition hover:text-base-content/60 active:cursor-grabbing"
                >
                    <LuGripVertical className="text-base" />
                </button>
                {!overlay && (
                    <div className="flex items-center gap-0.5 opacity-70 transition hover:opacity-100">
                        <button
                            type="button"
                            onClick={() => openEditTask(task, columnId)}
                            aria-label="Edit task"
                            className="btn btn-ghost btn-xs btn-circle"
                        >
                            <LuPencil className="text-xs" />
                        </button>
                        <button
                            type="button"
                            onClick={() => deleteTask(task.id)}
                            aria-label="Delete task"
                            className="btn btn-ghost btn-xs btn-circle hover:text-error"
                        >
                            <LuTrash2 className="text-xs" />
                        </button>
                    </div>
                )}
            </div>

            {/* Title + description */}
            <h3 className={`px-0.5 text-sm font-semibold leading-snug ${isDone ? "text-base-content/40 line-through" : ""}`}>
                {task.title}
            </h3>
            {task.description && (
                <p className="mt-1 line-clamp-2 px-0.5 text-xs text-base-content/50">
                    {task.description}
                </p>
            )}

            {/* Meta row */}
            <div className="mt-3 flex flex-wrap items-center gap-2 px-0.5 pr-9">
                <span className={`badge badge-soft badge-sm ${priority.badge}`}>
                    {priority.label}
                </span>
                {due && (
                    <span className={`inline-flex items-center gap-1 text-[11px] ${dueToneClass(due)}`}>
                        <LuCalendarDays className="text-sm" />
                        {due.relative}
                    </span>
                )}
            </div>

            {/* Complete toggle */}
            {!overlay && (
                <button
                    type="button"
                    onClick={() => toggleTaskDone(task.id)}
                    aria-label={isDone ? "Mark as not done" : "Mark as done"}
                    className={`absolute bottom-3 right-3 btn btn-xs btn-circle border ${
                        isDone
                            ? "btn-primary border-primary text-primary-content"
                            : "border-base-300 bg-base-100 text-base-content/40 hover:border-primary hover:text-primary"
                    }`}
                >
                    <LuCheck className="text-xs" />
                </button>
            )}
        </div>
    );
};

const TaskCard = ({ task, columnId }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        isDragging,
    } = useDraggable({ id: task.id });
    const { setNodeRef: setDroppableRef } = useDroppable({ id: task.id });

    // The card is both draggable (by its handle) and a drop target, so
    // dropping onto another card can reorder within / across columns.
    const setRefs = (node) => {
        setNodeRef(node);
        setDroppableRef(node);
    };

    return (
        <div ref={setRefs} className="animate-card-in">
            <TaskCardBody
                task={task}
                columnId={columnId}
                isDragging={isDragging}
                dragProps={{ ...listeners, ...attributes }}
            />
        </div>
    );
};

export default TaskCard;
