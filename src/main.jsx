import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './routes/AppRoutes'
import AuthProvider from './Context/AuthProvider'
import { TaskProvider } from './Context/TaskProvider'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TaskProvider>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </TaskProvider>
  </StrictMode>
)
