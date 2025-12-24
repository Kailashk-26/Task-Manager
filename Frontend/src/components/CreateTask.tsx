import toast from "react-hot-toast"
import TaskForm from "../components/TaskForm"
import api from "../configs/api"
import type { TaskFormValues } from "../types/task"
import type { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"

const CreateTaskPage = () => {
  const navigate=useNavigate()
  const handleCreate = async(data: TaskFormValues) => {
    try{
      const {data:resData}=await api.post('/api/tasks/create',data)
      toast.success(resData.message)
      navigate('/tasks')
    }catch (err) {
        const error = err as AxiosError<{ message: string }>
        toast.error(error.response?.data?.message || error.message)
    }
  }

  return (
    <TaskForm
      mode="create"
      onSubmit={handleCreate}
    />
  )
}

export default CreateTaskPage
