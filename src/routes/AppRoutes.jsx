import { createBrowserRouter } from "react-router";
import DashboardLayouts from "../Component/Layouts/DashboardLayouts";
import Dashboard from "../Component/Dashboard/Dashboard";
import AuthPage from "../Component/Pages/AuthPage";
import PrivetRouter from "./PrivetRouter";

export const router = createBrowserRouter([

    {
        path: '/',
        element:<DashboardLayouts />,
        children: [
            {
                index: true, element:
                    <PrivetRouter>
                        <Dashboard></Dashboard>
                    </PrivetRouter>
            },
            
        ]
    },
    { path: 'auth', element: <AuthPage /> }
])