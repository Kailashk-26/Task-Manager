import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import type { AxiosError } from "axios"

import TaskForm from "../components/TaskForm"
import api from "../configs/api"
import type { TaskFormValues } from "../types/task"


type User = {
  _id: string
  name: string
  email: string
}

type Task = {
  _id: string
  title: string
  description: string
  dueDate: string
  priority: "Low" | "Medium" | "High" | "Urgent"
  status: "To Do" | "In Progress" | "Review" | "Completed"
  assignedToId: User
  creatorId: User
}


const EditTaskPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [task, setTask] = useState<Task | null>(null)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get("/api/users/check")
        setCurrentUser(data)
      } catch {
        toast.error("Authentication failed")
      }
    }

    fetchUser()
  }, [])

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const { data } = await api.get(`/api/tasks/details/${id}`)
        setTask(data)
      } catch (err) {
        const error = err as AxiosError<{ message: string }>
        toast.error(error.response?.data?.message || "Task not found")
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchTask()
  }, [id])

  if (loading) return <div className="p-6 text-center">Loading...</div>
  if (!task || !currentUser)
    return <div className="p-6 text-center">Not authorized</div>

  const isCreator = task.creatorId._id === currentUser._id
  const isAssignee = task.assignedToId._id === currentUser._id

  if (!isCreator && !isAssignee) {
    return <div className="p-6 text-center">Access denied</div>
  }

  if (isCreator) {
    const initialData: TaskFormValues = {
      title: task.title,
      description: task.description,
      dueDate: new Date(task.dueDate),
      priority: task.priority,
      status: task.status,
      assignedToId: task.assignedToId._id,
    }

    const handleUpdate = async (data: TaskFormValues) => {
      try {
        await api.put(
          `/api/tasks/edit/${task._id}`,
          data
        )

        toast.success("Task updated")
        navigate(-1)
      } catch (err) {
        const error = err as AxiosError<{ message: string }>
        toast.error(error.response?.data?.message || "Update failed")
      }
    }

    return (
      <TaskForm
        mode="edit"
        initialData={initialData}
        onSubmit={handleUpdate}
      />
    )
  }

  const handleStatusUpdate = async (status: Task["status"]) => {
    try {
      await api.put(
        `/api/tasks/status/${task._id}`,
        { status }
      )

      toast.success("Status updated")
      navigate(-1)
    } catch (err) {
      const error = err as AxiosError<{ message: string }>
      toast.error(error.response?.data?.message || "Status update failed")
    }
  }

  return (
    <div className="p-6 md:p-12 bg-gray-100 min-h-screen">
      <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Update Task Status</h2>

        <select
          value={task.status}
          onChange={(e) =>
            handleStatusUpdate(e.target.value as Task["status"])
          }
          className="w-full p-2 border rounded"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Review">Review</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </div>
  )
}

export default EditTaskPage
