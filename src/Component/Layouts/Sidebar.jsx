import { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import {
    LuChartColumn,
    LuCalendarDays,
    LuKanban,
    LuLayoutDashboard,
    LuListChecks,
    LuLogOut,
    LuSettings,
    LuTimer,
} from "react-icons/lu";
import { AuthContext } from "../../Context/AuthContext";

const NavItem = ({ to, icon: Icon, label, end = false, onNavigate }) => (
    <li>
        <NavLink
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                        ? "bg-primary/10 text-primary"
                        : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
                }`
            }
        >
            <Icon className="text-lg" />
            {label}
        </NavLink>
    </li>
);

const SoonItem = ({ icon: Icon, label }) => (
    <li>
        <span className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-base-content/35">
            <Icon className="text-lg" />
            <span className="flex-1">{label}</span>
            <span className="badge badge-ghost badge-xs">Soon</span>
        </span>
    </li>
);

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

const Sidebar = ({ onNavigate }) => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/auth");
    };

    return (
        <div className="flex h-full flex-col p-4">
            {/* Brand */}
            <div className="px-2 pb-1 pt-2">
                <h1 className="text-2xl font-extrabold tracking-tight">
                    Task<span className="text-primary">Flow</span>
                </h1>
            </div>
            <div className="divider my-2"></div>

            {/* Nav */}
            <nav className="flex-1 space-y-6 overflow-y-auto">
                <div>
                    <p className="px-5 pb-1 text-[11px] font-semibold uppercase tracking-wider text-base-content/40">
                        Workspace
                    </p>
                    <ul className="space-y-0.5 px-2">
                        <NavItem to="/" end icon={LuLayoutDashboard} label="Dashboard" onNavigate={onNavigate} />
                        <NavItem to="/board" icon={LuKanban} label="Kanban Board" onNavigate={onNavigate} />
                        <NavItem to="/tasks" icon={LuListChecks} label="My Tasks" onNavigate={onNavigate} />
                    </ul>
                </div>

                <div>
                    <p className="px-5 pb-1 text-[11px] font-semibold uppercase tracking-wider text-base-content/40">
                        Insights
                    </p>
                    <ul className="space-y-0.5 px-2">
                        <SoonItem icon={LuCalendarDays} label="Calendar" />
                        <SoonItem icon={LuChartColumn} label="Analytics" />
                    </ul>
                </div>

                <div>
                    <p className="px-5 pb-1 text-[11px] font-semibold uppercase tracking-wider text-base-content/40">
                        Tools
                    </p>
                    <ul className="space-y-0.5 px-2">
                        <SoonItem icon={LuTimer} label="Pomodoro" />
                        <SoonItem icon={LuSettings} label="Settings" />
                    </ul>
                </div>
            </nav>

            {/* User card */}
            <div className="mt-4 border-t border-base-300 pt-4">
                <div className="flex items-center gap-3 px-2">
                    <div className="avatar placeholder">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-content">
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
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">
                            {user?.displayName || "User"}
                        </p>
                        <p className="truncate text-xs text-base-content/50">
                            {user?.email}
                        </p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={handleLogout}
                    className="btn btn-ghost mt-2 w-full justify-start gap-3 text-sm text-base-content/70 hover:bg-base-200 hover:text-error"
                >
                    <LuLogOut className="text-lg" /> Sign out
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
