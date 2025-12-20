import { z } from "zod"

export const priorityEnum = ["Low", "Medium", "High", "Urgent"] as const
export const statusEnum = [
  "To Do",
  "In Progress",
  "Review",
  "Completed"
] as const

export const taskSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1),
  dueDate: z.string().min(1),
  priority: z.enum(priorityEnum),
  status: z.enum(statusEnum),
  creatorId: z.string().min(1),
  assignedToId: z.string().min(1)
})

export type TaskFormValues = z.infer<typeof taskSchema>
