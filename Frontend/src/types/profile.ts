import { z } from "zod"

export const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid Email"),
  jobPosition: z.string().min(1, "Job position is required")
})

export type ProfileFormValues = z.infer<typeof profileSchema>
