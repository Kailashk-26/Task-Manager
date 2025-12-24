import { z } from "zod"

export const priorityEnum = ["Low", "Medium", "High", "Urgent"] as const
export const statusEnum = [
  "To Do",
  "In Progress",
  "Review",
  "Completed"
] as const

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().min(1, "Description is required"),
  dueDate: z.date(),
  priority: z.enum(priorityEnum),
  status: z.enum(statusEnum),
  assignedToId: z.string().min(1, "User is required"),
})

export type TaskFormValues = z.infer<typeof taskSchema>
