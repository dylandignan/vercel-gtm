import { generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import { leadScoringSchema, leadEnrichmentSchema, type LeadScoring } from "@/lib/schemas/leads"
import { formDataSchema } from "@/lib/schemas/forms"
import { LeadQueries } from "@/lib/db/queries"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const leadData = formDataSchema.parse(body.leadData)
    const enrichmentData = body.enrichmentData ? leadEnrichmentSchema.parse(body.enrichmentData) : undefined

    
    const savedLead = await LeadQueries.upsert({
      email: leadData.email,
      company: leadData.company,
      firstName: leadData.firstName,
      lastName: leadData.lastName,
      jobTitle: leadData.jobTitle,
      useCase: leadData.useCase,
      timeline: leadData.timeline,
      budgetRange: leadData.budgetRange,
      enrichmentData,
      
      totalScore: 0,
      leadTemperature: "cold",
      priority: "medium",
    })

    
    try {
      const { object } = await generateObject({
        model: openai("gpt-4o"),
        schema: leadScoringSchema,
      prompt: `
        Analyze this lead and provide a comprehensive scoring assessment based on the actual data provided:
        
        LEAD DATA:
        - Email: ${leadData.email}
        - Company: ${leadData.company}
        - Job Title: ${leadData.jobTitle || "Not provided"}
        - Use Case Description: "${leadData.useCase || "Not provided"}"
        - Timeline: ${leadData.timeline || "Not provided"}
        - Budget Range: ${leadData.budgetRange || "Not provided"}
        
        ENRICHMENT DATA:
        ${enrichmentData ? JSON.stringify(enrichmentData, null, 2) : "No enrichment data available"}
        
        SCORING CRITERIA - Score based on ACTUAL data provided:
        
        Company Size (0-20 points):
        - Use enrichment data if available
        - 1000+ employees: 20 points
        - 201-1000: 15 points  
        - 51-200: 10 points
        - 11-50: 5 points
        - 1-10: 2 points
        - Unknown: 0 points
        
        Job Title (0-20 points):
        - C-level (CTO, CEO, CPO, CRO): 20 points
        - VP/Director level: 15 points
        - Senior/Lead Engineer/Manager: 10 points
        - Engineer/Developer: 5 points
        - Other technical roles: 3 points
        - Unknown/Not provided: 0 points
        
        Budget (0-15 points):
        - Based on budgetRange if provided:
        - $10k+/month: 15 points
        - $5k-10k: 12 points
        - $1k-5k: 8 points
        - $500-1k: 4 points
        - Under $500: 1 point
        - Unknown: 0 points
        
        Timeline (0-15 points):
        - ASAP/This month: 15 points
        - 1-3 months: 12 points
        - 3-6 months: 8 points
        - 6+ months: 4 points
        - Just exploring: 1 point
        - Unknown: 0 points
        
        Use Case (0-10 points):
        - Analyze the use case description for complexity and enterprise needs:
        - Enterprise/complex applications with scale requirements: 10 points
        - E-commerce with high traffic needs: 8 points
        - Production web applications: 6 points
        - API/Backend services: 6 points
        - Marketing/simple sites: 4 points
        - Personal/learning projects: 2 points
        - Vague or minimal description: 1 point
        
        Engagement (0-10 points):
        - Analyze the use case description for engagement quality:
        - Detailed, specific description (50+ words): 10 points
        - Good detail with specific requirements (30-50 words): 7 points
        - Some detail provided (15-30 words): 5 points
        - Basic description (5-15 words): 3 points
        - Very minimal response (under 5 words): 1 point
        - No description: 0 points
        
        Buying Signals (0-10 points):
        Look for indicators in the use case description and other data:
        - Mentions current pain points/problems: +2 points
        - Mentions scale/performance requirements: +2 points
        - Mentions team/collaboration needs: +1 point
        - Mentions specific technologies/integrations: +1 point
        - Mentions deadlines/urgency: +2 points
        - Mentions budget/cost concerns: +1 point
        - Mentions evaluation/comparison: +1 point
        
        Calculate the total score and determine:
        - Hot (75-100): Ready to buy, high urgency, qualified
        - Warm (45-74): Interested, some qualification needed  
        - Cold (0-44): Early stage, needs nurturing
        
        SELF-SERVICE QUALIFICATION:
        If enrichment data shows recommendedPlan as "pro", consider if this lead should self-serve:
        - Low-complexity use cases (marketing sites, simple applications)
        - Small team/company size
        - Lower budget ranges (under $5k/month)
        - Industries that typically don't need enterprise features (lawn care, small local businesses, personal projects)
        
        For these cases, set recommendedAction to "self_service" instead of other actions.
        
        IMPORTANT: 
        - Analyze the use case description carefully for engagement and buying signals
        - Look for specific pain points, requirements, and urgency indicators
        - Score engagement based on the depth and specificity of their response
        - Consider if this lead would be better served by self-signup for Vercel Pro
      `,
    })

      
      await LeadQueries.update(savedLead.id, {
        totalScore: object.totalScore,
        scoreBreakdown: object.scoreBreakdown,
        leadTemperature: object.leadTemperature,
        priority: object.priority,
        recommendedAction: object.recommendedAction,
        reasoning: object.reasoning,
        buyingSignals: object.buyingSignals,
        riskFactors: object.riskFactors,
        nextBestActions: object.nextBestActions,
      })

      return Response.json(object satisfies LeadScoring)
    } catch (aiError) {
      console.error("AI scoring failed, but lead was saved:", aiError)
      
      return Response.json({
        totalScore: 0,
        leadTemperature: "cold",
        priority: "medium",
        scoreBreakdown: { companySize: 0, jobTitle: 0, budget: 0, timeline: 0, useCase: 0, engagement: 0, buyingSignals: 0 },
        recommendedAction: "nurture_sequence",
        reasoning: "AI scoring unavailable",
        buyingSignals: [],
        riskFactors: [],
        nextBestActions: ["Follow up when AI is available"],
      } satisfies LeadScoring)
    }
  } catch (error) {
    console.error("Lead scoring error:", error)
    return Response.json({ error: "Failed to score lead" }, { status: 500 })
  }
}
