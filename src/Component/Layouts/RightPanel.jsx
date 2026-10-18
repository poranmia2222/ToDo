import { useContext } from "react";
import { Link } from "react-router";
import { LuArrowRight, LuCalendarDays, LuListX } from "react-icons/lu";
import { TaskContext } from "../../Context/TaskContext";
import { COLUMNS, priorityMeta } from "../../constants/columns";
import { dueToneClass, greetingForHour } from "../../utils/date";

/*
  A compact "today at a glance" sidebar shown next to the main content.
*/
const RightPanel = () => {
    const { stats, upcoming, openAddTask } = useContext(TaskContext);
    const today = new Date();

    return (
        <div className="space-y-4">
            {/* Today */}
            <section className="rounded-box border border-base-300 bg-base-100 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-base-content/40">
                    {greetingForHour()}
                </p>
                <p className="mt-1 text-2xl font-bold">
                    {today.toLocaleDateString(undefined, {
                        weekday: "long",
                    })}
                </p>
                <p className="text-sm text-base-content/50">
                    {today.toLocaleDateString(undefined, {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    })}
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <span className="badge badge-warning badge-sm">
                        {stats.dueToday} due today
                    </span>
                    {stats.overdue > 0 && (
                        <span className="badge badge-error badge-sm">
                            {stats.overdue} overdue
                        </span>
                    )}
                </div>
            </section>

            {/* Board breakdown */}
            <section className="rounded-box border border-base-300 bg-base-100 p-4">
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-base-content/40">
                    Board breakdown
                </h2>
                <ul className="space-y-3">
                    {COLUMNS.map((column) => {
                        const count = stats.counts[column.id] ?? 0;
                        const percent = stats.total
                            ? Math.round((count / stats.total) * 100)
                            : 0;
                        return (
                            <li key={column.id}>
                                <div className="mb-1 flex items-center justify-between text-xs">
                                    <span className="flex items-center gap-2 font-medium">
                                        <span
                                            className={`h-2 w-2 rounded-full ${column.dot}`}
                                        />
                                        {column.title}
                                    </span>
                                    <span className="font-semibold">
                                        {count}
                                    </span>
                                </div>
                                <progress
                                    className={`progress w-full ${column.id === "todo" ? "progress-primary" : column.id === "progress" ? "progress-warning" : column.id === "done" ? "progress-success" : "progress-neutral"} h-1.5`}
                                    value={percent}
                                    max={100}
                                    aria-label={`${column.title}: ${count} tasks`}
                                />
                            </li>
                        );
                    })}
                </ul>
            </section>

            {/* Priority mix */}
            <section className="rounded-box border border-base-300 bg-base-100 p-4">
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-base-content/40">
                    Open tasks by priority
                </h2>
                <div className="flex flex-wrap gap-2">
                    {["high", "medium", "low"].map((id) => {
                        const meta = priorityMeta(id);
                        return (
                            <span
                                key={id}
                                className={`badge badge-soft badge-sm ${meta.chip}`}
                            >
                                {meta.label}: {stats.priority[id] ?? 0}
                            </span>
                        );
                    })}
                </div>
            </section>

            {/* Next up */}
            <section className="rounded-box border border-base-300 bg-base-100 p-4">
                <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-base-content/40">
                        Next up
                    </h2>
                    <Link
                        to="/tasks"
                        className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                        View all <LuArrowRight className="text-sm" />
                    </Link>
                </div>

                {upcoming.length > 0 ? (
                    <ul className="space-y-2.5">
                        {upcoming.slice(0, 4).map((task) => (
                            <li
                                key={task.id}
                                className="flex items-start justify-between gap-2"
                            >
                                <span className="line-clamp-1 text-sm font-medium">
                                    {task.title}
                                </span>
                                <span
                                    className={`inline-flex shrink-0 items-center gap-1 text-[11px] ${dueToneClass(task.due)}`}
                                >
                                    <LuCalendarDays />
                                    {task.due.relative}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="flex flex-col items-center gap-2 py-2 text-center">
                        <LuListX className="text-2xl text-base-content/20" />
                        <p className="text-xs text-base-content/40">
                            Nothing scheduled.{" "}
                            <button
                                type="button"
                                onClick={() => openAddTask()}
                                className="font-medium text-primary hover:underline"
                            >
                                Add a task
                            </button>
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default RightPanel;
