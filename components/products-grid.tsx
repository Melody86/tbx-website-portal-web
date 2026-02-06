"use client"

import { useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { getStaticUrl } from "@/lib/static"

export interface ProductListItem {
  id: number
  name: string
  /** 分类编码，例如 snacks/mushrooms/grains/fruits/other */
  category: string
  /** 分类中文名称（可由接口或映射生成，用于展示） */
  categoryLabel?: string
  price: number
  originalPrice?: number
  image: string
  tag?: string
  description?: string
}

export type ProductCategoryOption = { id: string; name: string }

interface ProductsGridProps {
  products: ProductListItem[]
  categories?: ProductCategoryOption[]
  selectedCategory?: string
  /** 分页：总条数、当前页、每页条数 */
  total?: number
  currentPage?: number
  pageSize?: number
}

export function ProductsGrid({
  products,
  categories: categoriesProp,
  selectedCategory = "all",
  total = 0,
  currentPage = 1,
  pageSize = 12,
}: ProductsGridProps) {
  const router = useRouter()
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const hasPagination = totalPages > 1

  // 优先使用服务端传入的完整分类（字典），保证展示全部中文分类；否则从产品列表去重
  const categories = useMemo(() => {
    const all: ProductCategoryOption[] = [{ id: "all", name: "全部产品" }]
    if (categoriesProp && categoriesProp.length > 0) {
      return all.concat(categoriesProp)
    }
    const seen = new Set<string>()
    for (const p of products) {
      if (!p.category || seen.has(p.category)) continue
      seen.add(p.category)
      all.push({ id: p.category, name: p.categoryLabel || p.category })
    }
    return all
  }, [products, categoriesProp])

  // 服务端已按 selectedCategory 返回对应列表，这里直接展示；若未传 selectedCategory 则前端兜底筛选
  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((product) => product.category === selectedCategory)

  const handleCategoryClick = (categoryId: string) => {
    const base = categoryId === "all" ? "/products" : `/products?category=${encodeURIComponent(categoryId)}`
    router.push(base)
  }

  const buildPageUrl = (page: number) => {
    const params = new URLSearchParams()
    if (selectedCategory && selectedCategory !== "all") params.set("category", selectedCategory)
    if (page > 1) params.set("page", String(page))
    const q = params.toString()
    return q ? `/products?${q}` : "/products"
  }

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    router.push(buildPageUrl(page))
  }

  return (
    <main className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">产品中心</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">精选优质农副产品，新鲜直达您的餐桌</p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <Button
              key={category.id}
              type="button"
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => handleCategoryClick(category.id)}
              className={selectedCategory === category.id ? "bg-primary text-primary-foreground" : ""}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow group h-full">
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <img
                    src={getStaticUrl(product.image) || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.tag && (
                    <div className="absolute top-3 left-3">
                      <span className="inline-block bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                        {product.tag}
                      </span>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  {product.description && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                  )}
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-primary">¥{product.price}</span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-sm text-muted-foreground line-through">¥{product.originalPrice}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">暂无相关产品</p>
          </div>
        )}

        {hasPagination && (
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
        )}
      </div>
    </main>
  )
}

