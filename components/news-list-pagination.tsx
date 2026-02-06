"use client"

import { useRouter } from "next/navigation"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface NewsListPaginationProps {
  total: number
  currentPage: number
  pageSize: number
  contentType?: string
}

export function NewsListPagination({ total, currentPage, pageSize, contentType }: NewsListPaginationProps) {
  const router = useRouter()
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  if (totalPages <= 1) return null

  const buildPageUrl = (page: number) => {
    const params = new URLSearchParams()
    if (contentType) params.set("contentType", contentType)
    if (page > 1) params.set("page", String(page))
    const qs = params.toString()
    return qs ? `/news?${qs}` : "/news"
  }

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    router.push(buildPageUrl(page))
  }

  return (
    <div className="mt-10 flex justify-center">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={buildPageUrl(currentPage - 1)}
              onClick={(e) => {
                e.preventDefault()
                handlePageChange(currentPage - 1)
              }}
              aria-disabled={currentPage <= 1}
              className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <PaginationItem key={p}>
              <PaginationLink
                href={buildPageUrl(p)}
                onClick={(e) => {
                  e.preventDefault()
                  handlePageChange(p)
                }}
                isActive={p === currentPage}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href={buildPageUrl(currentPage + 1)}
              onClick={(e) => {
                e.preventDefault()
                handlePageChange(currentPage + 1)
              }}
              aria-disabled={currentPage >= totalPages}
              className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
