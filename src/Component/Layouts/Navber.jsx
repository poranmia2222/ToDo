import { useContext, useState } from "react";
import { LuBell, LuMenu, LuMoon, LuPlus, LuSearch, LuSun, LuX } from "react-icons/lu";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { TaskContext } from "../../Context/TaskContext";

const initialsOf = (user) => {
    const name = user?.displayName || user?.email || "U";
    const parts = name.trim().split(/\s+/);
    return (
        parts
            .slice(0, 2)
            .map((part) => part[0])
            .join("")
            .toUpperCase() || "U"
    );
};

const Navber = ({ onMenuClick }) => {
    const { user, logout } = useContext(AuthContext);
    const { query, setQuery, attention, openAddTask, openEditTask } =
        useContext(TaskContext);
    const navigate = useNavigate();

    const [theme, setTheme] = useState(
        () => document.documentElement.getAttribute("data-theme") || "light",
    );

    const toggleTheme = () => {
        const next = theme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        try {
            localStorage.setItem("taskflow-theme", next);
        } catch {
            /* ignore storage failures */
        }
        setTheme(next);
    };

    const handleLogout = async () => {
        await logout();
        navigate("/auth");
    };

    return (
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-base-300 bg-base-100/95 px-4 py-3 backdrop-blur sm:px-6">
            {/* Mobile menu */}
            <button
                type="button"
                onClick={onMenuClick}
                aria-label="Open menu"
                className="btn btn-ghost btn-circle lg:hidden"
            >
                <LuMenu />
            </button>

            {/* Search */}
            <label className="relative min-w-0 flex-1 sm:max-w-sm lg:max-w-md">
                <LuSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
                <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search tasks, descriptions…"
                    className="input w-full rounded-full border-base-300 bg-base-200 pl-9 pr-9 focus:border-primary"
                />
                {query && (
                    <button
                        type="button"
                        onClick={() => setQuery("")}
                        aria-label="Clear search"
                        className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-ghost btn-xs btn-circle"
                    >
                        <LuX />
                    </button>
                )}
            </label>

            <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
                {/* Attention / notifications */}
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle indicator"
                        aria-label="Notifications"
                    >
                        <LuBell className="text-lg" />
                        {attention.length > 0 && (
                            <span className="badge indicator-item badge-error badge-xs">
                                {attention.length}
                            </span>
                        )}
                    </div>
                    <div
                        tabIndex={0}
                        className="dropdown-content menu z-50 mt-2 w-72 rounded-box border border-base-300 bg-base-100 p-2 shadow-xl"
                    >
                        <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-base-content/40">
                            Needs attention
                        </p>
                        {attention.length > 0 ? (
                            attention.slice(0, 6).map((task) => (
                                <li key={task.id}>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            openEditTask(task, task.column)
                                        }
                                        className="flex items-center justify-between gap-2"
                                    >
                                        <span className="truncate">
                                            {task.title}
                                        </span>
                                        <span
                                            className={`badge badge-xs shrink-0 ${
                                                task.due.isOverdue
                                                    ? "badge-error"
                                                    : "badge-warning"
                                            }`}
                                        >
                                            {task.due.isOverdue
                                                ? "Overdue"
                                                : "Today"}
                                        </span>
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li className="px-3 py-3 text-sm text-base-content/50">
                                You’re all caught up 🎉
                            </li>
                        )}
                    </div>
                </div>

                {/* Theme toggle */}
                <button
                    type="button"
                    onClick={toggleTheme}
                    aria-label={
                        theme === "dark"
                            ? "Switch to light theme"
                            : "Switch to dark theme"
                    }
                    className="btn btn-ghost btn-circle"
                >
                    {theme === "dark" ? <LuSun className="text-lg" /> : <LuMoon className="text-lg" />}
                </button>

                {/* Account */}
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle p-1"
                        aria-label="Account menu"
                    >
                        <div className="avatar placeholder">
                            <div className="flex w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-content">
                                {user?.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt={user.displayName ?? "User"}
                                        className="rounded-full"
                                    />
                                ) : (
                                    <span>{initialsOf(user)}</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <ul className="dropdown-content menu z-50 mt-2 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow-xl">
                        <li className="menu-title px-3 py-2">
                            <span className="block truncate font-semibold text-base-content">
                                {user?.displayName || "User"}
                            </span>
                            <span className="block truncate text-xs font-normal text-base-content/50">
                                {user?.email}
                            </span>
                        </li>
                        <li>
                            <button type="button" onClick={handleLogout}>
                                Sign out
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Add task */}
                <button
                    type="button"
                    onClick={() => openAddTask()}
                    className="btn btn-primary btn-sm sm:btn-md"
                >
                    <LuPlus /> <span className="hidden sm:inline">New Task</span>
                </button>
            </div>
        </header>
    );
};

export default Navber;
