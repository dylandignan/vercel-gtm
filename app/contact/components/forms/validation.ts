import { z } from "zod"

// Form-specific validation schemas
const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address")
  .max(254, "Email is too long")

const companySchema = z
  .string()
  .min(1, "Company name is required")
  .max(100, "Company name is too long")
  .regex(/^[a-zA-Z0-9\s\-&.,()]+$/, "Company name contains invalid characters")

const nameSchema = z
  .string()
  .min(1, "Name is required")
  .max(50, "Name is too long")
  .regex(/^[a-zA-Z\s\-']+$/, "Name contains invalid characters")

const useCaseSchema = z
  .string()
  .min(10, "Please provide more details about your use case (at least 10 characters)")
  .max(2000, "Use case description is too long")

// Form validation schemas
export const initialFormSchema = z.object({
  firstName: nameSchema.optional(),
  lastName: nameSchema.optional(),
  email: emailSchema,
  company: companySchema,
  useCase: useCaseSchema,
})

export const smartQuestionSchema = z.object({
  jobTitle: z.enum(["cto", "ceo", "vp-engineering", "senior-engineer", "engineer", "other"]).optional(),
  timeline: z.enum(["asap", "1-3months", "3-6months", "exploring"]).optional(),
  budgetRange: z.enum(["10k+", "5k-10k", "1k-5k", "500-1k", "under-500", "not-sure"]).optional(),
})

export const completeFormSchema = initialFormSchema.merge(smartQuestionSchema)

export type InitialFormData = z.infer<typeof initialFormSchema>
export type SmartQuestionData = z.infer<typeof smartQuestionSchema>
export type CompleteFormData = z.infer<typeof completeFormSchema>

// Validation helper functions
export function validateFormField<T>(
  schema: z.ZodSchema<T>,
  value: unknown,
): {
  success: boolean
  data?: T
  error?: string
} {
  try {
    const result = schema.parse(value)
    return { success: true, data: result }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0]?.message || "Validation failed" }
    }
    return { success: false, error: "Unknown validation error" }
  }
}
