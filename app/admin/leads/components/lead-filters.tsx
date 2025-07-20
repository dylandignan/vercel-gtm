"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { useDeferredValue } from "react"

interface LeadFiltersProps {
  searchTerm: string
  temperatureFilter: string
  statusFilter: string
  onSearchChange: (value: string) => void
  onTemperatureChange: (value: string) => void
  onStatusChange: (value: string) => void
  disabled?: boolean
}

export function LeadFilters({
  searchTerm,
  temperatureFilter,
  statusFilter,
  onSearchChange,
  onTemperatureChange,
  onStatusChange,
  disabled = false,
}: LeadFiltersProps) {
  const deferredSearchTerm = useDeferredValue(searchTerm)

  return (
    <div className="border border-gray-200 rounded-lg p-6 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[300px]">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="Search leads..."
              value={deferredSearchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 border-gray-300 focus:border-black focus:ring-black"
              disabled={disabled}
            />
          </div>
        </div>
        <Select value={temperatureFilter} onValueChange={onTemperatureChange} disabled={disabled}>
          <SelectTrigger className="w-[140px] border-gray-300">
            <SelectValue placeholder="Temperature" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All temps</SelectItem>
            <SelectItem value="hot">Hot</SelectItem>
            <SelectItem value="warm">Warm</SelectItem>
            <SelectItem value="cold">Cold</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={onStatusChange} disabled={disabled}>
          <SelectTrigger className="w-[140px] border-gray-300">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="qualified">Qualified</SelectItem>
            <SelectItem value="demo_scheduled">Demo scheduled</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
