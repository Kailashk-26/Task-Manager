import { useParams } from "react-router-dom"
import TaskForm from "../components/TaskForm"
import { tasks } from "../constant"
import type { TaskFormValues } from "../types/task"
import type { Task } from "../constant"

const EditTaskPage = () => {
  const { id } = useParams<{ id: string }>()

  const task = tasks.find(t => t.id === id)

  if (!task) {
    return <div>Task not found</div>
  }

  const initialData: TaskFormValues = {
    title: task.title,
    description: task.description,
    dueDate: task.dueDate.split("T")[0],
    priority: task.priority,
    status: task.status,
    creatorId: task.creatorId,
    assignedToId: task.assignedToId
  }

  const handleUpdate = (data: TaskFormValues) => {
    const updatedTask: Task = {
      ...task,
      ...data
    }
    console.log("Updated task:", updatedTask)
    // PUT /tasks/:id
  }

  return (
    <TaskForm
      mode="edit"
      initialData={initialData}
      onSubmit={handleUpdate}
    />
  )
}

export default EditTaskPage
