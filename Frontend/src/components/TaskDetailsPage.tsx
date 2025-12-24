import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import type { AxiosError } from "axios"
import api from "../configs/api"

const TaskDetailsPage = () => {
  type UserRef = {
    _id: string
    name: string
    email: string
  }

  type Task = {
    _id: string
    title: string
    description: string
    dueDate: string
    priority: string
    status: string
    assignedToId: UserRef
    creatorId: UserRef
  }

  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [task, setTask] = useState<Task | null>(null)
    useEffect(()=>{
        const getTask=async()=>{
            try{
                const {data}=await api.get(`/api/tasks/details/${id}`)
                setTask(data)
            }catch(err){
                const error = err as AxiosError<{ message: string }>
                toast.error(error.response?.data?.message || error.message)
            }
        }
        getTask()
    },[id])
  

  if (!task) {
    return <div className="p-6 text-center">Task not found</div>
  }

  return (
    <div className="p-6 md:p-12 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-lg space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Task Details
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            View task information
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Info label="Title" value={task.title} />
          <Info label="Due Date" value={task.dueDate.split("T")[0]} />
          <Info label="Priority" value={task.priority} />
          <Info label="Status" value={task.status} />
          <Info label="Assigned To" value={`${task.assignedToId.name} (#${task.assignedToId._id.slice(-4)})`}/>
          <Info label="Created By" value={`${task.creatorId.name} (#${task.creatorId._id.slice(-4)})`}/>
        </div>

        {/* Description */}
        <div>
          <label className="text-sm text-gray-600">Description</label>
          <div className="mt-1 p-3 bg-gray-50 rounded-lg text-gray-800">
            {task.description}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            onClick={() => navigate(`/tasks/edit/${task._id}`)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Edit
          </button>

          <button
            onClick={() => navigate(`/tasks/delete/${task._id}`)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

const Info = ({ label, value }: { label: string; value: string }) => (
  <div>
    <label className="text-sm text-gray-600">{label}</label>
    <div className="mt-1 p-2.5 bg-gray-50 rounded-lg text-gray-800">
      {value}
    </div>
  </div>
)

export default TaskDetailsPage
