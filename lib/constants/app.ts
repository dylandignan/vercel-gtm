// Application constants
export const APP_CONFIG = {
  name: "Vercel Sales Form",
  description: "AI-powered lead qualification and sales form",
  version: "1.0.0",
  author: "Vercel",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
} as const

// API constants
export const API_ROUTES = {
  LEADS: "/api/leads",
  LEAD_STATS: "/api/leads/stats",
  ENRICH_LEAD: "/api/enrich-lead",
  SCORE_LEAD: "/api/score-lead",
  CHAT: "/api/chat",
  SALES_ASSISTANT: "/api/sales-assistant",
} as const

// UI constants
export const UI_CONFIG = {
  TOAST_DURATION: 5000,
  DEBOUNCE_DELAY: 300,
  ANIMATION_DURATION: 200,
  MOBILE_BREAKPOINT: 768,
} as const
