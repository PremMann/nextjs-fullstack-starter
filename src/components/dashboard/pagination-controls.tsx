"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"

export function PaginationControls({
  page,
  totalPages,
  limit,
  total,
}: {
  page: number
  totalPages: number
  limit?: number
  total?: number
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const goToPage = (nextPage: number) => {
    const next = new URLSearchParams(searchParams.toString())
    next.set("page", String(nextPage))
    router.replace(`${pathname}?${next.toString()}`)
  }

  const normalizedLimit = typeof limit === "number" && limit > 0 ? limit : undefined
  const normalizedTotal = typeof total === "number" && total >= 0 ? total : undefined

  const start =
    normalizedTotal === 0
      ? 0
      : normalizedLimit
        ? (page - 1) * normalizedLimit + 1
        : undefined
  const end =
    normalizedTotal === 0
      ? 0
      : normalizedLimit && typeof normalizedTotal === "number"
        ? Math.min(page * normalizedLimit, normalizedTotal)
        : undefined

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="text-sm text-muted-foreground">
        {typeof start === "number" && typeof end === "number" && typeof normalizedTotal === "number" ? (
          <>
            Showing{" "}
            <span className="font-medium text-foreground">{start}</span>
            {"–"}
            <span className="font-medium text-foreground">{end}</span>
            {" "}of <span className="font-medium text-foreground">{normalizedTotal}</span>
          </>
        ) : (
          <>
            Page <span className="font-medium text-foreground">{page}</span> of{" "}
            <span className="font-medium text-foreground">{totalPages}</span>
          </>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          disabled={page <= 1 || totalPages <= 1}
          onClick={() => goToPage(page - 1)}
        >
          Previous
        </Button>

        <Button
          variant="outline"
          size="sm"
          disabled={page >= totalPages || totalPages <= 1}
          onClick={() => goToPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
