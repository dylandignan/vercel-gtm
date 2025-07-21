import { z } from "zod"

// Form data schema - used in public contact form and admin
export const formDataSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email(),
  company: z.string().min(1),
  jobTitle: z.string().optional(),
  useCase: z.string().min(1),
  timeline: z.string().optional(),
  budgetRange: z.string().optional(),
})

// Form types
export type FormData = z.infer<typeof formDataSchema>