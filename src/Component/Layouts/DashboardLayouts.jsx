import { useState } from "react";
import { Outlet } from "react-router";
import AddTaskModal from "../../KanbanBoard/AddTaskModal";
import RightPanel from "./RightPanel";
import Navber from "./Navber";
import Sidebar from "./Sidebar";

const DashboardLayouts = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-base-200">
            {/* Mobile backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-base-300 bg-base-100 transition-transform duration-200 lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:translate-x-0 lg:basis-64 ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <Sidebar onNavigate={() => setSidebarOpen(false)} />
            </aside>

            {/* Main area */}
            <div className="flex min-w-0 flex-1 flex-col">
                <Navber onMenuClick={() => setSidebarOpen((open) => !open)} />

                <div className="grid flex-1 grid-cols-1 items-stretch xl:grid-cols-5">
                    <main className="min-w-0 p-4 sm:p-6 xl:col-span-4">
                        <Outlet />
                    </main>
                    <aside className="hidden border-l border-base-300 bg-base-100 p-4 xl:col-span-1 xl:block">
                        <RightPanel />
                    </aside>
                </div>
            </div>

            {/* Global create/edit dialog */}
            <AddTaskModal />
        </div>
    );
};

export default DashboardLayouts;
