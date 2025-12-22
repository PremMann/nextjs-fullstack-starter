"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function setParams(
  current: URLSearchParams,
  patch: Record<string, string | number | undefined | null>
) {
  const next = new URLSearchParams(current.toString())
  for (const [key, value] of Object.entries(patch)) {
    if (value === undefined || value === null || value === "") {
      next.delete(key)
    } else {
      next.set(key, String(value))
    }
  }
  return next
}

export function UsersToolbar({
  initialSearch,
  initialRole,
  initialLimit,
}: {
  initialSearch: string
  initialRole: string
  initialLimit: number
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [search, setSearch] = React.useState(initialSearch)

  React.useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const next = setParams(searchParams, { search, page: 1 })
      router.replace(`${pathname}?${next.toString()}`)
    }, 300)

    return () => window.clearTimeout(timeoutId)
  }, [search, router, pathname, searchParams])

  const role = searchParams.get("role") ?? initialRole
  const limit = Number(searchParams.get("limit") ?? initialLimit)

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex w-full flex-col gap-2 sm:max-w-sm">
        <Label htmlFor="user-search">Search</Label>
        <Input
          id="user-search"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex flex-col gap-2">
          <Label htmlFor="user-role">Role</Label>
          <select
            id="user-role"
            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={role}
            onChange={(e) => {
              const next = setParams(searchParams, { role: e.target.value, page: 1 })
              router.replace(`${pathname}?${next.toString()}`)
            }}
          >
            <option value="">All</option>
            <option value="ADMIN">ADMIN</option>
            <option value="MODERATOR">MODERATOR</option>
            <option value="USER">USER</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="user-limit">Per page</Label>
          <select
            id="user-limit"
            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={String(limit)}
            onChange={(e) => {
              const next = setParams(searchParams, { limit: e.target.value, page: 1 })
              router.replace(`${pathname}?${next.toString()}`)
            }}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>

        <Button
          variant="outline"
          onClick={() => {
            const next = setParams(searchParams, { search: "", role: "", page: 1 })
            router.replace(`${pathname}?${next.toString()}`)
            setSearch("")
          }}
        >
          Clear
        </Button>
      </div>
    </div>
  )
}
