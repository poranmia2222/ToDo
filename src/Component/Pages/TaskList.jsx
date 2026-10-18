import { useContext, useMemo, useState } from "react";
import {
    LuCalendarDays,
    LuCheck,
    LuListX,
    LuPencil,
    LuPlus,
    LuTrash2,
} from "react-icons/lu";
import { TaskContext } from "../../Context/TaskContext";
import {
    COLUMNS,
    PRIORITIES,
    columnMeta,
    priorityMeta,
} from "../../constants/columns";
import { isDoneTask, matchesQuery } from "../../utils/taskUtils";
import { dueMeta, dueToneClass } from "../../utils/date";

const FilterChip = ({ active, onClick, children }) => (
    <button
        type="button"
        onClick={onClick}
        className={`btn btn-sm rounded-full ${
            active ? "btn-primary" : "btn-ghost border border-base-300"
        }`}
    >
        {children}
    </button>
);

const TaskList = () => {
    const {
        allTasks,
        query,
        openAddTask,
        openEditTask,
        deleteTask,
        toggleTaskDone,
    } = useContext(TaskContext);

    const [statusFilter, setStatusFilter] = useState("all");
    const [priorityFilter, setPriorityFilter] = useState("all");

    const filtered = useMemo(() => {
        return allTasks
            .filter((task) => {
                if (statusFilter !== "all" && task.column !== statusFilter)
                    return false;
                if (priorityFilter !== "all" && task.priority !== priorityFilter)
                    return false;
                return matchesQuery(task, query);
            })
            .sort((a, b) => (a.date || "9999").localeCompare(b.date || "9999"));
    }, [allTasks, statusFilter, priorityFilter, query]);

    const statusOptions = [
        { id: "all", label: "All", count: allTasks.length },
        ...COLUMNS.map((column) => ({
            id: column.id,
            label: column.title,
            count: allTasks.filter((task) => task.column === column.id).length,
        })),
    ];

    const handleDelete = (task) => {
        if (window.confirm(`Delete “${task.title}”? This cannot be undone.`)) {
            deleteTask(task.id);
        }
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <header className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">My Tasks</h1>
                    <p className="mt-1 text-sm text-base-content/60">
                        {filtered.length} of {allTasks.length} tasks shown
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => openAddTask()}
                    className="btn btn-primary"
                >
                    <LuPlus /> New Task
                </button>
            </header>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2 rounded-box border border-base-300 bg-base-100 p-3">
                {statusOptions.map((option) => (
                    <FilterChip
                        key={option.id}
                        active={statusFilter === option.id}
                        onClick={() => setStatusFilter(option.id)}
                    >
                        {option.label}
                        <span className="badge badge-sm">
                            {option.count}
                        </span>
                    </FilterChip>
                ))}

                <div className="mx-1 hidden h-6 w-px bg-base-300 sm:block" />

                {PRIORITIES.map((priority) => (
                    <FilterChip
                        key={priority.id}
                        active={priorityFilter === priority.id}
                        onClick={() =>
                            setPriorityFilter(
                                priorityFilter === priority.id
                                    ? "all"
                                    : priority.id,
                            )
                        }
                    >
                        <span className={`h-2 w-2 rounded-full ${priority.dot}`} />
                        {priority.label}
                    </FilterChip>
                ))}
            </div>

            {/* Rows */}
            {filtered.length > 0 ? (
                <div className="space-y-2">
                    {filtered.map((task) => {
                        const done = isDoneTask(task);
                        const priority = priorityMeta(task.priority);
                        const column = columnMeta(task.column);
                        const due = dueMeta(task.date);
                        const dueClass = done
                            ? "text-base-content/40"
                            : dueToneClass(due);

                        return (
                            <div
                                key={task.id}
                                className="group flex items-center gap-4 rounded-box border border-base-300 bg-base-100 p-4 transition hover:border-base-content/20 hover:shadow-sm"
                            >
                                {/* Complete toggle */}
                                <button
                                    type="button"
                                    onClick={() => toggleTaskDone(task.id)}
                                    aria-label={
                                        done
                                            ? "Mark as not done"
                                            : "Mark as done"
                                    }
                                    className={`btn btn-sm btn-circle border ${
                                        done
                                            ? "btn-primary border-primary text-primary-content"
                                            : "border-base-300 bg-base-100 text-base-content/30 hover:border-primary hover:text-primary"
                                    }`}
                                >
                                    <LuCheck />
                                </button>

                                {/* Content */}
                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h3
                                            className={`truncate font-semibold ${
                                                done
                                                    ? "text-base-content/40 line-through"
                                                    : ""
                                            }`}
                                        >
                                            {task.title}
                                        </h3>
                                        <span
                                            className={`badge badge-soft badge-xs ${priority.badge}`}
                                        >
                                            {priority.label}
                                        </span>
                                    </div>
                                    {task.description && (
                                        <p className="truncate text-sm text-base-content/50">
                                            {task.description}
                                        </p>
                                    )}
                                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-base-content/50">
                                        <span
                                            className={`badge badge-soft badge-xs ${column.chip}`}
                                        >
                                            {column.title}
                                        </span>
                                        {due && (
                                            <span
                                                className={`inline-flex items-center gap-1 ${dueClass}`}
                                            >
                                                <LuCalendarDays />
                                                {due.relative}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex shrink-0 items-center gap-1 opacity-60 transition group-hover:opacity-100">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            openEditTask(task, task.column)
                                        }
                                        aria-label="Edit task"
                                        className="btn btn-ghost btn-sm btn-circle"
                                    >
                                        <LuPencil />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(task)}
                                        aria-label="Delete task"
                                        className="btn btn-ghost btn-sm btn-circle hover:text-error"
                                    >
                                        <LuTrash2 />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="flex flex-col items-center gap-3 rounded-box border border-dashed border-base-300 bg-base-100 py-16 text-center">
                    <LuListX className="text-4xl text-base-content/20" />
                    <div>
                        <p className="font-medium">No tasks found</p>
                        <p className="text-sm text-base-content/50">
                            {query || statusFilter !== "all" || priorityFilter !== "all"
                                ? "Try adjusting the filters or search."
                                : "Create your first task to get going."}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => openAddTask()}
                        className="btn btn-primary btn-sm"
                    >
                        <LuPlus /> New Task
                    </button>
                </div>
            )}
        </div>
    );
};

export default TaskList;
