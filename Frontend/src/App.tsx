import { Route, Routes, Navigate, Outlet } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./components/Login"
import Profile from "./pages/Profile"
import Tasks from "./pages/Tasks"
import CreateTaskPage from "./components/CreateTask"
import EditTaskPage from "./components/EditTask"
import TaskDetailsPage from "./components/TaskDetailsPage"
import EditProfilePage from "./components/EditProfile"
import DeleteAccountPage from "./components/AccDel"
import { Toaster } from "react-hot-toast"


const Protected = () => {
  const token = localStorage.getItem("token")
  if (!token) {
    return <Navigate to="/reg" replace />
  }
  return <Outlet />
}

function App() {

  return (
    <div className="min-h-screen bg-neutral-300 text-black">
      <Toaster />
      <Routes>
        <Route path="/reg"
        element={
          localStorage.getItem("token")
            ? <Navigate to="/" replace />
            : <Login />
        }/>

        <Route element={<Protected />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<EditProfilePage />} />
          <Route path="/profile/delete" element={<DeleteAccountPage />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/:id" element={<TaskDetailsPage />} />
          <Route path="/tasks/create" element={<CreateTaskPage />} />
          <Route path="/tasks/edit/:id" element={<EditTaskPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
