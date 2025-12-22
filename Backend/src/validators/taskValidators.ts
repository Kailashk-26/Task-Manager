import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1),
  dueDate: z.string().datetime(),
  priority: z.enum(["Low", "Medium", "High", "Urgent"]),
  status: z.enum(["To Do", "In Progress", "Review", "Completed"]).optional(),
  assignedToId: z.string().min(1),
});

export const editTaskSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().min(1).optional(),
  dueDate: z.string().datetime().optional(),
  priority: z.enum(["Low", "Medium", "High", "Urgent"]).optional(),
  status: z.enum(["To Do", "In Progress", "Review", "Completed"]).optional(),
  assignedToId: z.string().min(1).optional(),
});

export const updateStatusSchema = z.object({
  status: z.enum(["To Do", "In Progress", "Review", "Completed"]),
});
