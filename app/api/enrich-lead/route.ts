import { generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import { leadEnrichmentSchema, type LeadEnrichment } from "@/lib/schemas/leads"
import { formDataSchema } from "@/lib/schemas/forms"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, company, jobTitle, useCase } = formDataSchema.parse(body)

    const domain = email.split("@")[1]

    const { object } = await generateObject({
      model: openai("gpt-4o"),
      schema: leadEnrichmentSchema,
      prompt: `
        Analyze this lead and provide intelligent insights:
        
        Company: ${company}
        Domain: ${domain}
        Job Title: ${jobTitle || "Not provided"}
        Use Case: ${useCase}
        
        Based on this information, infer:
        1. Likely company size (research the company if it's well-known)
        2. Industry sector
        3. Probable monthly budget range for deployment/hosting
        4. Urgency score (1-10) based on job title and use case
        5. Recommended Vercel plan
        6. Key pain points they likely face
        7. One specific follow-up question that would be most valuable to ask
        
        Be intelligent about company recognition - if it's a well-known company, use that knowledge.
        Consider that enterprise titles (CTO, VP Eng) typically have higher budgets and urgency.
        E-commerce and high-traffic use cases typically need enterprise solutions.
      `,
    })

    return Response.json(object satisfies LeadEnrichment)
  } catch (error) {
    console.error("Lead enrichment error:", error)
    return Response.json({ error: "Failed to enrich lead data" }, { status: 500 })
  }
}
