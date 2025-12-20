import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { taskSchema } from "../types/task"
import type { TaskFormValues } from "../types/task"
import { useEffect } from "react"

type TaskFormProps = {
  mode: "create" | "edit"
  initialData?: TaskFormValues
  onSubmit: (data: TaskFormValues) => void
}

const TaskForm = ({ mode, initialData, onSubmit }: TaskFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: initialData //edit
  })

  useEffect(() => {
  if (initialData) {
    reset(initialData)
  }
  }, [initialData, reset])

  return (
    <div className="p-6 md:p-12 bg-gray-100 min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-lg space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">{mode === "create" ? "Create Task" : "Edit Task"}</h2>
          <p className="text-sm text-gray-500 mt-1">
            {mode === "create"
              ? "Fill in the details to assign a new task"
              : "Update the task details"}
          </p>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="text-sm text-gray-600">Title</label>
              <input
                type="text"
                placeholder="Enter task title"
                {...register("title")}
                className="mt-1 w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="text-sm text-gray-600">Description</label>
              <textarea
                placeholder="Describe the task"
                {...register("description")}
                className="mt-1 w-full p-2.5 border rounded-lg h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Due Date */}
            <div>
              <label className="text-sm text-gray-600">Due Date</label>
              <input
                type="date"
                {...register("dueDate")}
                className="mt-1 w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.dueDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dueDate.message}
                </p>
              )}
            </div>

            {/* Priority */}
            <div>
              <label className="text-sm text-gray-600">Priority</label>
              <select
                {...register("priority")}
                className="mt-1 w-full p-2.5 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="text-sm text-gray-600">Status</label>
              <select
                {...register("status")}
                className="mt-1 w-full p-2.5 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Review">Review</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Assigned To */}
            <div>
              <label className="text-sm text-gray-600">Assigned To</label>
              <input
                type="text"
                placeholder="User ID"
                {...register("assignedToId")}
                className="mt-1 w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.assignedToId && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.assignedToId.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition"
        >
          {mode === "create" ? "Create Task" : "Update Task"}
        </button>
      </form>
    </div>

  )
}

export default TaskForm
