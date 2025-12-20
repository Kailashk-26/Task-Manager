import TaskForm from "../components/TaskForm"
import type { TaskFormValues } from "../types/task"

const CreateTaskPage = () => {
  const handleCreate = (data: TaskFormValues) => {
    console.log("Create task:", data)
    // POST /tasks
  }

  return (
    <TaskForm
      mode="create"
      onSubmit={handleCreate}
    />
  )
}

export default CreateTaskPage
