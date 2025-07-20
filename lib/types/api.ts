import type { Lead } from "@/lib/db/schema"

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface ApiError {
  error: string
  details?: unknown
  status?: number
}

export interface LeadsResponse {
  leads: Lead[]
  total: number
  page?: number
  limit?: number
}

export interface LeadStatsResponse {
  total: number
  hot: number
  warm: number
  cold: number
  new: number
  avgScore: number
}

// Utility types used across the app
export type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (...args: any) => Promise<infer R>
  ? R
  : any

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
