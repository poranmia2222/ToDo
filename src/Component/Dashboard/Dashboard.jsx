import { useContext } from "react";
import { Link } from "react-router";
import {
    LuArrowRight,
    LuCircleCheckBig,
    LuCircleAlert,
    LuListTodo,
    LuPlus,
    LuTimer,
} from "react-icons/lu";
import { AuthContext } from "../../Context/AuthContext";
import { TaskContext } from "../../Context/TaskContext";
import { columnMeta, priorityMeta } from "../../constants/columns";
import { dueToneClass, greetingForHour } from "../../utils/date";

const StatCard = ({ label, value, sub, icon: Icon, accent }) => (
    <div className="rounded-box border border-base-300 bg-base-100 p-5 transition-shadow hover:shadow-md">
        <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-base-content/60">{label}</p>
            <span
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${accent}`}
            >
                <Icon className="text-lg" />
            </span>
        </div>
        <p className="mt-2 text-3xl font-bold">{value}</p>
        <p className="mt-1 text-xs text-base-content/50">{sub}</p>
    </div>
);

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const { stats, upcoming, allTasks, openAddTask } = useContext(TaskContext);

    const firstName = (user?.displayName || "there").split(" ")[0];

    const highPriority = allTasks.filter(
        (task) => task.column !== "done" && task.column !== "completed" && task.priority === "high",
    );

    const summaryLine =
        stats.overdue > 0
            ? `You have ${stats.overdue} overdue task${stats.overdue === 1 ? "" : "s"} and ${stats.dueToday} due today.`
            : stats.dueToday > 0
              ? `You have ${stats.dueToday} task${stats.dueToday === 1 ? "" : "s"} due today.`
              : "Nothing is due today — a great moment to get ahead.";

    return (
        <div className="space-y-6">
            {/* Welcome hero */}
            <section className="relative overflow-hidden rounded-box border border-base-300 bg-base-100 p-6">
                <div
                    className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl"
                    aria-hidden="true"
                />
                <div className="relative flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-base-content/40">
                            {new Date().toLocaleDateString(undefined, {
                                weekday: "long",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                        <h1 className="mt-1 text-3xl font-bold">
                            {greetingForHour()},{" "}
                            <span className="text-primary">{firstName}</span>
                        </h1>
                        <p className="mt-2 text-sm text-base-content/60">
                            {summaryLine}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => openAddTask()}
                            className="btn btn-primary btn-sm sm:btn-md"
                        >
                            <LuPlus /> New Task
                        </button>
                        <Link to="/board" className="btn btn-outline btn-sm sm:btn-md">
                            Open board <LuArrowRight />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stat cards */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    label="Total tasks"
                    value={stats.total}
                    sub={`+${stats.addedThisWeek} added this week`}
                    icon={LuListTodo}
                    accent="bg-primary/10 text-primary"
                />
                <StatCard
                    label="In progress"
                    value={stats.inProgress}
                    sub={`${stats.openCount} open task${stats.openCount === 1 ? "" : "s"} overall`}
                    icon={LuTimer}
                    accent="bg-warning/10 text-warning"
                />
                <StatCard
                    label="Completed"
                    value={stats.completedCount}
                    sub={`${stats.percent}% of everything`}
                    icon={LuCircleCheckBig}
                    accent="bg-success/10 text-success"
                />
                <StatCard
                    label="Overdue"
                    value={stats.overdue}
                    sub={
                        stats.overdue > 0
                            ? "Time to catch up"
                            : "Everything is on track"
                    }
                    icon={LuCircleAlert}
                    accent="bg-error/10 text-error"
                />
            </section>

            {/* Progress */}
            <section className="rounded-box border border-base-300 bg-base-100 p-6">
                <div className="mb-2 flex items-center justify-between">
                    <h2 className="font-semibold">Overall progress</h2>
                    <span className="text-sm font-bold text-primary">
                        {stats.percent}%
                    </span>
                </div>
                <progress
                    className="progress progress-primary w-full"
                    value={stats.percent}
                    max={100}
                    aria-label="Overall completion"
                />
                <p className="mt-2 text-xs text-base-content/50">
                    {stats.completedCount} of {stats.total} tasks finished
                </p>
            </section>

            {/* Two lists */}
            <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {/* Upcoming deadlines */}
                <div className="rounded-box border border-base-300 bg-base-100 p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="font-semibold">Upcoming deadlines</h2>
                        <Link
                            to="/tasks"
                            className="text-xs font-medium text-primary hover:underline"
                        >
                            View all
                        </Link>
                    </div>
                    {upcoming.length > 0 ? (
                        <ul className="space-y-3">
                            {upcoming.slice(0, 5).map((task) => {
                                const priority = priorityMeta(task.priority);
                                const column = columnMeta(task.column);
                                return (
                                    <li
                                        key={task.id}
                                        className="flex items-center justify-between gap-3 border-b border-base-200 pb-3 last:border-0 last:pb-0"
                                    >
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium">
                                                {task.title}
                                            </p>
                                            <span
                                                className={`badge badge-soft badge-xs mt-1 ${column.chip}`}
                                            >
                                                {column.title}
                                            </span>
                                        </div>
                                        <div className="flex shrink-0 items-center gap-2">
                                            <span
                                                className={`badge badge-soft badge-sm ${priority.badge}`}
                                            >
                                                {priority.label}
                                            </span>
                                            <span
                                                className={`w-16 text-right text-xs ${dueToneClass(task.due)}`}
                                            >
                                                {task.due.relative}
                                            </span>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <div className="flex flex-col items-center gap-2 py-8 text-center">
                            <LuCircleCheckBig className="text-3xl text-base-content/20" />
                            <p className="text-sm text-base-content/50">
                                No deadlines ahead — enjoy it!
                            </p>
                        </div>
                    )}
                </div>

                {/* High priority focus */}
                <div className="rounded-box border border-base-300 bg-base-100 p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="font-semibold">High priority focus</h2>
                        <span className="badge badge-error badge-sm">
                            {highPriority.length}
                        </span>
                    </div>
                    {highPriority.length > 0 ? (
                        <ul className="space-y-3">
                            {highPriority.slice(0, 5).map((task) => {
                                const column = columnMeta(task.column);
                                return (
                                    <li
                                        key={task.id}
                                        className="flex items-center gap-3 border-b border-base-200 pb-3 last:border-0 last:pb-0"
                                    >
                                        <span className="h-2 w-2 shrink-0 rounded-full bg-error" />
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium">
                                                {task.title}
                                            </p>
                                            <p className="text-xs text-base-content/40">
                                                {column.title}
                                            </p>
                                        </div>
                                        <Link
                                            to="/board"
                                            className="shrink-0 text-xs font-medium text-primary hover:underline"
                                        >
                                            Open
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <div className="flex flex-col items-center gap-2 py-8 text-center">
                            <LuListTodo className="text-3xl text-base-content/20" />
                            <p className="text-sm text-base-content/50">
                                No high priority tasks. Nice and calm.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
