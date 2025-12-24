import { Route, Routes, Navigate, Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "./configs/api"

import Home from "./pages/Home"
import Login from "./components/Login"
import Profile from "./pages/Profile"
import Tasks from "./pages/Tasks"
import CreateTaskPage from "./components/CreateTask"
import EditTaskPage from "./components/EditTask"
import TaskDetailsPage from "./components/TaskDetailsPage"
import EditProfilePage from "./components/EditProfile"
import DeleteAccountPage from "./components/AccDel"
import TaskDel from "./components/TaskDel"
import toast, { Toaster } from "react-hot-toast"
import socket from "./configs/socket"


const Protected = () => {
  const [loading, setLoading] = useState(true)
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/api/users/check")
        setIsAuth(true)
      } catch {
        localStorage.removeItem("token")
        setIsAuth(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Checking authentication...
      </div>
    )
  }

  if (!isAuth) {
    return <Navigate to="/reg" replace />
  }

  return <Outlet />
}



function App() {
  useEffect(() => {
    socket.on("task-assigned", (task) => {
      toast.success(`New task: ${task.title}`);
    });
  
    socket.on("task-updated", (task) => {
      toast(`Task updated: ${task.title}`);
    });
  
    socket.on("status-updated", (task) => {
      toast(`${task.title} status changed to ${task.status}`);
    });
  
    return () => {
      socket.off("task-assigned");
      socket.off("task-updated");
      socket.off("status-updated");
    };
  }, []);
  return (
    <div className="min-h-screen bg-neutral-300 text-black">
      <Toaster />

      <Routes>
        <Route
          path="/reg"
          element={
            localStorage.getItem("token")
              ? <Navigate to="/" replace />
              : <Login />
          }
        />

        <Route element={<Protected />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<EditProfilePage />} />
          <Route path="/profile/delete" element={<DeleteAccountPage />} />

          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/create" element={<CreateTaskPage />} />
          <Route path="/tasks/:id" element={<TaskDetailsPage />} />
          <Route path="/tasks/edit/:id" element={<EditTaskPage />} />
          <Route path="/tasks/delete/:id" element={<TaskDel />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
