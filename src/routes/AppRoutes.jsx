import { Navigate, createBrowserRouter } from "react-router";
import AuthPage from "../Component/Pages/AuthPage";
import Dashboard from "../Component/Dashboard/Dashboard";
import TaskList from "../Component/Pages/TaskList";
import DashboardLayouts from "../Component/Layouts/DashboardLayouts";
import KanbanBoard from "../KanbanBoard/KanbanBoard";
import PrivetRouter from "./PrivetRouter";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <DashboardLayouts />,
        children: [
            {
                index: true,
                element: (
                    <PrivetRouter>
                        <Dashboard />
                    </PrivetRouter>
                ),
            },
            {
                path: "board",
                element: (
                    <PrivetRouter>
                        <KanbanBoard />
                    </PrivetRouter>
                ),
            },
            {
                path: "tasks",
                element: (
                    <PrivetRouter>
                        <TaskList />
                    </PrivetRouter>
                ),
            },
        ],
    },
    { path: "auth", element: <AuthPage /> },
    { path: "*", element: <Navigate to="/" replace /> },
]);
