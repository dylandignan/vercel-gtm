import { z } from "zod"

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

export type FormData = z.infer<typeof formDataSchema>

export type FormStep = "initial" | "enriching" | "smart-questions" | "processing" | "self-service" | "qualified"
