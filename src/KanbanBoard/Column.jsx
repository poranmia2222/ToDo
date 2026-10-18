import { useContext } from "react";
import { useDroppable } from "@dnd-kit/core";
import { LuPlus } from "react-icons/lu";
import { TaskContext } from "../Context/TaskContext";
import TaskCard from "./TaskCard";

/*
  One kanban column. It is a droppable area, shows its tasks, and offers a
  quick "add task" affordance in the header and empty state.
*/
const Column = ({ id, title, tasks, Icon, searching = false }) => {
    const { setNodeRef, isOver } = useDroppable({ id });
    const { openAddTask } = useContext(TaskContext);

    return (
        <section
            ref={setNodeRef}
            className={`flex min-h-40 flex-col rounded-box border bg-base-300/30 p-3 transition-colors ${
                isOver
                    ? "border-primary bg-primary/5"
                    : "border-base-300/70"
            }`}
        >
            {/* Header */}
            <header className="mb-3 flex items-center justify-between gap-2 px-1">
                <div className="flex min-w-0 items-center gap-2">
                    {Icon && <Icon className="shrink-0 text-base-content/40" />}
                    <h2 className="truncate text-xs font-bold uppercase tracking-wider text-base-content/70">
                        {title}
                    </h2>
                    <span className="badge badge-ghost badge-sm font-semibold">
                        {tasks.length}
                    </span>
                </div>
                <button
                    type="button"
                    onClick={() => openAddTask(id)}
                    aria-label={`Add task to ${title}`}
                    className="btn btn-ghost btn-xs btn-circle"
                >
                    <LuPlus />
                </button>
            </header>

            {/* Cards */}
            <div className="flex flex-1 flex-col gap-3">
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} columnId={id} />
                ))}

                {tasks.length === 0 && (
                    <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-base-300 p-6 text-center">
                        {Icon && <Icon className="text-2xl text-base-content/20" />}
                        <p className="text-xs text-base-content/40">
                            {searching
                                ? "No matching tasks here"
                                : "No tasks yet"}
                        </p>
                        {!searching && (
                            <button
                                type="button"
                                onClick={() => openAddTask(id)}
                                className="btn btn-ghost btn-xs text-primary"
                            >
                                <LuPlus /> Add one
                            </button>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Column;
