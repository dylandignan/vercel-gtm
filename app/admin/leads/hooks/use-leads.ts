"use client"

import { useState, useEffect } from "react"
import type { Lead } from "@/lib/db/schema"

interface LeadStats {
  total: number
  hot: number
  warm: number
  cold: number
  new: number
  avgScore: number
}

interface UseLeadsOptions {
  search?: string
  temperature?: string
  status?: string
}

export function useLeads(options: UseLeadsOptions = {}) {
  const [leads, setLeads] = useState<Lead[]>([])
  const [stats, setStats] = useState<LeadStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLeads = async () => {
    try {
      const params = new URLSearchParams()
      if (options.search) params.set("search", options.search)
      if (options.temperature && options.temperature !== "all") params.set("temperature", options.temperature)
      if (options.status && options.status !== "all") params.set("status", options.status)

      const response = await fetch(`/api/leads?${params.toString()}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text()
        console.error("Non-JSON response:", text)
        throw new Error("Server returned non-JSON response")
      }

      const data = await response.json()

      if (data.leads) {
        setLeads(data.leads)
      } else if (data.error) {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error("Failed to fetch leads:", error)
      setError(error instanceof Error ? error.message : "Failed to fetch leads")
      setLeads([])
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/leads/stats")

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON response")
      }

      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error("Failed to fetch stats:", error)
      setStats({
        total: 0,
        hot: 0,
        warm: 0,
        cold: 0,
        new: 0,
        avgScore: 0,
      })
    }
  }

  const refetch = async () => {
    setError(null)
    setLoading(true)
    await Promise.all([fetchLeads(), fetchStats()])
    setLoading(false)
  }

  useEffect(() => {
    refetch()
  }, [options.search, options.temperature, options.status])

  return {
    leads,
    stats,
    loading,
    error,
    refetch,
  }
}
