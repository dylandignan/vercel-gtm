import { LeadQueries } from "@/lib/db/queries"
import type { NewLead } from "@/lib/db/schema"

const SEED_LEADS: NewLead[] = [
  {
    email: "sarah.chen@stripe.com",
    company: "Stripe",
    firstName: "Sarah",
    lastName: "Chen",
    jobTitle: "VP Engineering",
    useCase:
      "We're migrating our documentation site and developer portal to a more performant solution. Currently experiencing slow build times with our Jekyll setup and need better global CDN distribution for our API docs. Looking for a platform that can handle high traffic spikes during product launches and integrate well with our existing GitHub workflow.",
    timeline: "1-3months",
    budgetRange: "10k+",
    enrichmentData: {
      companySize: "1000+",
      industry: "Financial Technology",
      likelyBudget: "50k+",
      urgencyScore: 8,
      recommendedPlan: "enterprise",
    },
    totalScore: 85,
    scoreBreakdown: {
      companySize: 20,
      jobTitle: 20,
      budget: 15,
      timeline: 12,
      useCase: 8,
      engagement: 10,
      buyingSignals: 0,
    },
    leadTemperature: "hot",
    priority: "high",
    recommendedAction: "demo_booking",
    reasoning: "High-value enterprise prospect with clear technical requirements and decision-making authority",
    buyingSignals: ["Specific technical requirements", "Clear timeline", "Budget authority"],
    riskFactors: [],
    nextBestActions: ["Schedule technical demo", "Prepare migration plan", "Connect with solutions engineer"],
  },
  {
    email: "mike.rodriguez@shopify.com",
    company: "Shopify",
    firstName: "Mike",
    lastName: "Rodriguez",
    jobTitle: "Senior Frontend Engineer",
    useCase:
      "Building a new merchant onboarding flow that needs to be lightning fast globally. We're seeing conversion drops due to slow loading times in APAC regions. Need a solution that can handle dynamic content generation and has excellent Edge performance.",
    timeline: "asap",
    budgetRange: "5k-10k",
    enrichmentData: {
      companySize: "1000+",
      industry: "E-commerce Platform",
      likelyBudget: "15k-50k",
      urgencyScore: 9,
      recommendedPlan: "enterprise",
    },
    totalScore: 78,
    scoreBreakdown: {
      companySize: 20,
      jobTitle: 10,
      budget: 12,
      timeline: 15,
      useCase: 9,
      engagement: 10,
      buyingSignals: 2,
    },
    leadTemperature: "hot",
    priority: "high",
    recommendedAction: "immediate_call",
    reasoning: "Urgent timeline with clear performance requirements from major e-commerce platform",
    buyingSignals: ["ASAP timeline", "Performance metrics mentioned", "Global scaling needs"],
    riskFactors: ["Individual contributor may need management approval"],
    nextBestActions: ["Immediate technical call", "Performance audit offer", "Connect with decision maker"],
  },
  {
    email: "jennifer.kim@notion.so",
    company: "Notion",
    firstName: "Jennifer",
    lastName: "Kim",
    jobTitle: "CTO",
    useCase:
      "Exploring options for our public-facing marketing site and blog. Currently on a custom solution but want something that our marketing team can manage independently. Need excellent SEO, fast loading times, and the ability to handle viral traffic spikes when we launch new features.",
    timeline: "3-6months",
    budgetRange: "1k-5k",
    enrichmentData: {
      companySize: "201-1000",
      industry: "Productivity Software",
      likelyBudget: "5k-15k",
      urgencyScore: 6,
      recommendedPlan: "pro",
    },
    totalScore: 72,
    scoreBreakdown: {
      companySize: 15,
      jobTitle: 20,
      budget: 8,
      timeline: 8,
      useCase: 8,
      engagement: 10,
      buyingSignals: 3,
    },
    leadTemperature: "warm",
    priority: "high",
    recommendedAction: "demo_booking",
    reasoning: "C-level contact with clear requirements, though longer timeline suggests evaluation phase",
    buyingSignals: ["CTO involvement", "Specific technical requirements", "Team workflow considerations"],
    riskFactors: ["Longer timeline may indicate lower urgency"],
    nextBestActions: [
      "Schedule demo focused on CMS features",
      "Prepare marketing team workflow examples",
      "Share SEO case studies",
    ],
  },
  {
    email: "alex.thompson@figma.com",
    company: "Figma",
    firstName: "Alex",
    lastName: "Thompson",
    jobTitle: "Director of Engineering",
    useCase:
      "Need to rebuild our developer documentation and API reference. Current setup is hard to maintain and doesn't provide a great developer experience. Looking for something that can auto-generate docs from our OpenAPI specs and has good search functionality.",
    timeline: "1-3months",
    budgetRange: "5k-10k",
    enrichmentData: {
      companySize: "201-1000",
      industry: "Design Software",
      likelyBudget: "15k-50k",
      urgencyScore: 7,
      recommendedPlan: "enterprise",
    },
    totalScore: 75,
    scoreBreakdown: {
      companySize: 15,
      jobTitle: 15,
      budget: 12,
      timeline: 12,
      useCase: 9,
      engagement: 10,
      buyingSignals: 2,
    },
    leadTemperature: "warm",
    priority: "high",
    recommendedAction: "demo_booking",
    reasoning: "Strong technical requirements from engineering leadership at growing company",
    buyingSignals: ["Director-level involvement", "Clear technical pain points", "Specific timeline"],
    riskFactors: [],
    nextBestActions: [
      "Demo API documentation features",
      "Show OpenAPI integration",
      "Provide developer portal examples",
    ],
  },
  {
    email: "priya.patel@discord.com",
    company: "Discord",
    firstName: "Priya",
    lastName: "Patel",
    jobTitle: "Senior Product Manager",
    useCase:
      "Working on a new community resources hub that needs to scale globally. We expect high traffic from our gaming community and need something that can handle real-time updates and has excellent mobile performance. Also need good analytics integration.",
    timeline: "3-6months",
    budgetRange: "10k+",
    enrichmentData: {
      companySize: "1000+",
      industry: "Social Gaming Platform",
      likelyBudget: "15k-50k",
      urgencyScore: 6,
      recommendedPlan: "enterprise",
    },
    totalScore: 68,
    scoreBreakdown: {
      companySize: 20,
      jobTitle: 10,
      budget: 15,
      timeline: 8,
      useCase: 8,
      engagement: 7,
      buyingSignals: 0,
    },
    leadTemperature: "warm",
    priority: "medium",
    recommendedAction: "nurture_sequence",
    reasoning: "Good company fit but longer timeline and product manager role suggests early evaluation",
    buyingSignals: ["High budget range", "Global scaling requirements"],
    riskFactors: ["Product manager may not have technical decision authority", "Longer timeline"],
    nextBestActions: [
      "Share gaming industry case studies",
      "Provide mobile performance benchmarks",
      "Connect with engineering team",
    ],
  },
  {
    email: "david.wilson@airbnb.com",
    company: "Airbnb",
    firstName: "David",
    lastName: "Wilson",
    jobTitle: "Lead Engineer",
    useCase:
      "Building internal tools dashboard for our operations team. Need something fast to prototype and deploy. Currently using a mix of internal tools but want to consolidate on a modern stack that our team can iterate on quickly.",
    timeline: "1-3months",
    budgetRange: "1k-5k",
    enrichmentData: {
      companySize: "1000+",
      industry: "Travel Technology",
      likelyBudget: "5k-15k",
      urgencyScore: 5,
      recommendedPlan: "pro",
    },
    totalScore: 58,
    scoreBreakdown: {
      companySize: 20,
      jobTitle: 10,
      budget: 8,
      timeline: 12,
      useCase: 6,
      engagement: 2,
      buyingSignals: 0,
    },
    leadTemperature: "warm",
    priority: "medium",
    recommendedAction: "nurture_sequence",
    reasoning: "Internal tooling use case with moderate urgency, may need to validate budget authority",
    buyingSignals: ["Clear timeline", "Consolidation project"],
    riskFactors: ["Internal tools may have lower budget priority", "Lead engineer may need approval"],
    nextBestActions: [
      "Share internal tooling examples",
      "Discuss team collaboration features",
      "Provide ROI calculator",
    ],
  },
  {
    email: "lisa.chang@canva.com",
    company: "Canva",
    firstName: "Lisa",
    lastName: "Chang",
    jobTitle: "Engineering Manager",
    useCase:
      "Looking into options for our help center and customer support documentation. Need something that integrates well with our existing support tools and can handle multiple languages. Also important that our support team can update content easily.",
    timeline: "exploring",
    budgetRange: "not-sure",
    enrichmentData: {
      companySize: "1000+",
      industry: "Design Platform",
      likelyBudget: "5k-15k",
      urgencyScore: 3,
      recommendedPlan: "pro",
    },
    totalScore: 45,
    scoreBreakdown: {
      companySize: 20,
      jobTitle: 15,
      budget: 0,
      timeline: 1,
      useCase: 7,
      engagement: 2,
      buyingSignals: 0,
    },
    leadTemperature: "cold",
    priority: "low",
    recommendedAction: "nurture_sequence",
    reasoning: "Early exploration phase with unclear budget and timeline",
    buyingSignals: [],
    riskFactors: ["No clear timeline", "Budget uncertainty", "Early exploration phase"],
    nextBestActions: ["Send help center examples", "Provide multi-language case studies", "Schedule educational demo"],
  },
  {
    email: "carlos.mendez@twitch.tv",
    company: "Twitch",
    firstName: "Carlos",
    lastName: "Mendez",
    jobTitle: "Senior Software Engineer",
    useCase:
      "Creator tools and resources site. High traffic, needs to be super fast for our streamers globally. Looking at different options for rebuilding our creator portal with better performance and user experience.",
    timeline: "6+ months",
    budgetRange: "5k-10k",
    enrichmentData: {
      companySize: "1000+",
      industry: "Live Streaming Platform",
      likelyBudget: "15k-50k",
      urgencyScore: 4,
      recommendedPlan: "enterprise",
    },
    totalScore: 52,
    scoreBreakdown: {
      companySize: 20,
      jobTitle: 10,
      budget: 12,
      timeline: 4,
      useCase: 6,
      engagement: 0,
      buyingSignals: 0,
    },
    leadTemperature: "cold",
    priority: "medium",
    recommendedAction: "nurture_sequence",
    reasoning: "Long timeline suggests early research phase, but good company fit for enterprise solution",
    buyingSignals: ["Performance requirements", "Global scaling needs"],
    riskFactors: ["Very long timeline", "Individual contributor level", "Minimal engagement"],
    nextBestActions: [
      "Share streaming platform case studies",
      "Provide performance benchmarks",
      "Educational content about global CDN",
    ],
  },
  {
    email: "rachel.green@spotify.com",
    company: "Spotify",
    firstName: "Rachel",
    lastName: "Green",
    jobTitle: "Product Designer",
    useCase:
      "Design system documentation site. Need something that can showcase components with live examples and code snippets. Should be easy for designers and developers to contribute to.",
    timeline: "exploring",
    budgetRange: "under-500",
    enrichmentData: {
      companySize: "1000+",
      industry: "Music Streaming",
      likelyBudget: "1k-5k",
      urgencyScore: 2,
      recommendedPlan: "pro",
    },
    totalScore: 35,
    scoreBreakdown: {
      companySize: 20,
      jobTitle: 3,
      budget: 1,
      timeline: 1,
      useCase: 6,
      engagement: 4,
      buyingSignals: 0,
    },
    leadTemperature: "cold",
    priority: "low",
    recommendedAction: "nurture_sequence",
    reasoning: "Design-focused use case with very low budget and no clear timeline",
    buyingSignals: [],
    riskFactors: ["Very low budget", "Designer role may lack budget authority", "No timeline urgency"],
    nextBestActions: [
      "Share design system examples",
      "Provide component documentation templates",
      "Educational content about design-dev collaboration",
    ],
  },
  {
    email: "james.park@uber.com",
    company: "Uber",
    firstName: "James",
    lastName: "Park",
    jobTitle: "Staff Engineer",
    useCase:
      "Microservices documentation and API gateway docs. Need something that can auto-update from our service definitions and provide good search across hundreds of services. Performance and reliability are critical.",
    timeline: "1-3months",
    budgetRange: "10k+",
    enrichmentData: {
      companySize: "1000+",
      industry: "Transportation Technology",
      likelyBudget: "50k+",
      urgencyScore: 7,
      recommendedPlan: "enterprise",
    },
    totalScore: 73,
    scoreBreakdown: {
      companySize: 20,
      jobTitle: 15,
      budget: 15,
      timeline: 12,
      useCase: 9,
      engagement: 2,
      buyingSignals: 0,
    },
    leadTemperature: "warm",
    priority: "high",
    recommendedAction: "demo_booking",
    reasoning: "Strong technical requirements from senior engineer at major tech company",
    buyingSignals: ["High budget range", "Specific technical requirements", "Performance focus"],
    riskFactors: ["Staff engineer may need architecture team approval"],
    nextBestActions: [
      "Demo API documentation features",
      "Show microservices integration examples",
      "Connect with enterprise solutions team",
    ],
  },
]

async function seedLeads() {
  console.log("🌱 Starting to seed leads...")

  try {
    for (const leadData of SEED_LEADS) {
      console.log(`Creating lead for ${leadData.company}...`)

      const lead = await LeadQueries.upsert(leadData)
      console.log(`✅ Created lead: ${lead.email} from ${lead.company}`)
    }

    console.log(`🎉 Successfully seeded ${SEED_LEADS.length} leads!`)

    
    const stats = await LeadQueries.getStats()
    console.log("\n📊 Database Summary:")
    console.log(`Total leads: ${stats.total}`)
    console.log(`Hot leads: ${stats.hot}`)
    console.log(`Warm leads: ${stats.warm}`)
    console.log(`Cold leads: ${stats.cold}`)
    console.log(`Average score: ${stats.avgScore}`)
  } catch (error) {
    console.error("❌ Error seeding leads:", error)
    process.exit(1)
  }
}


seedLeads()
  .then(() => {
    console.log("✨ Seeding completed successfully!")
    process.exit(0)
  })
  .catch((error) => {
    console.error("💥 Seeding failed:", error)
    process.exit(1)
  })
