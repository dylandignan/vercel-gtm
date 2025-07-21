"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, ChevronDown, X } from "lucide-react"
import { useCallback, useTransition } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"

interface LeadFiltersProps {
  disabled?: boolean
}

export function LeadFilters({
  disabled = false,
}: LeadFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (term) {
      params.set("search", term)
    } else {
      params.delete("search")
    }
    
    const queryString = params.toString()
    const url = queryString ? `${pathname}?${queryString}` : pathname
    
    router.replace(url, { scroll: false })
  }, 300)

  const filterConfigs = [
    { 
      key: "temperature", 
      label: "Temperature",
      options: [
        { value: "hot", label: "Hot" },
        { value: "warm", label: "Warm" },
        { value: "cold", label: "Cold" }
      ]
    },
    { 
      key: "status", 
      label: "Status",
      options: [
        { value: "new", label: "New" },
        { value: "contacted", label: "Contacted" },
        { value: "qualified", label: "Qualified" },
        { value: "demo_scheduled", label: "Demo Scheduled" }
      ]
    }
  ]

  const updateFilters = useCallback(
    (key: string, values: string[]) => {
      const params = new URLSearchParams(searchParams.toString())

      if (values.length === 0) {
        params.delete(key)
      } else {
        params.set(key, values.join(","))
      }

      const queryString = params.toString()
      const url = queryString ? `${pathname}?${queryString}` : pathname

      startTransition(() => {
        router.replace(url, { scroll: false })
      })
    },
    [router, pathname, searchParams],
  )

  const getActiveFilters = useCallback(
    (key: string): string[] => {
      const param = searchParams.get(key)
      return param ? param.split(",") : []
    },
    [searchParams],
  )

  const handleFilterChange = useCallback(
    (key: string, value: string, checked: boolean) => {
      const currentFilters = getActiveFilters(key)
      const newFilters = checked ? [...currentFilters, value] : currentFilters.filter((f) => f !== value)

      updateFilters(key, newFilters)
    },
    [getActiveFilters, updateFilters],
  )

  const clearAllFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    
    // Only remove filter-related params
    const filterKeys = ["search", ...filterConfigs.map(config => config.key)]
    filterKeys.forEach(key => params.delete(key))
    
    const queryString = params.toString()
    const url = queryString ? `${pathname}?${queryString}` : pathname
    
    router.replace(url, { scroll: false })
  }, [router, pathname, searchParams, filterConfigs])

  const hasActiveFilters = useCallback(() => {
    const filterKeys = ["search", ...filterConfigs.map(config => config.key)]
    return filterKeys.some(key => searchParams.get(key))
  }, [searchParams, filterConfigs])


  return (
    <div className="border border-gray-200 rounded-lg p-6 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[300px]">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="Search leads..."
              defaultValue={searchParams.get("search")?.toString()}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 border-gray-300 focus:border-black focus:ring-black"
              disabled={disabled || isPending}
            />
          </div>
        </div>
        {filterConfigs.map((config) => {
          const activeFilters = getActiveFilters(config.key)
          return (
            <DropdownMenu key={config.key}>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-[140px] border-gray-300 justify-between" 
                  disabled={disabled || isPending}
                >
                  {activeFilters.length === 0 ? config.label : `${activeFilters.length} selected`}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[180px]">
                <DropdownMenuLabel>{config.label}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {config.options.map((option) => (
                  <DropdownMenuCheckboxItem
                    key={option.value}
                    checked={activeFilters.includes(option.value)}
                    onCheckedChange={(checked) => {
                      handleFilterChange(config.key, option.value, checked)
                    }}
                  >
                    {option.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )
        })}
        {hasActiveFilters() && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearAllFilters}
            className="border-gray-300 text-gray-600 hover:bg-gray-50"
            disabled={disabled || isPending}
          >
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>
    </div>
  )
}
