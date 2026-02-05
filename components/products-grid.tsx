"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getStaticUrl } from "@/lib/static"

export interface ProductListItem {
  id: number
  name: string
  category: string
  price: number
  originalPrice?: number
  image: string
  tag?: string
  description?: string
}

const categories = [
  { id: "all", name: "全部产品" },
  { id: "snacks", name: "特产零食" },
  { id: "mushrooms", name: "菌菇干货" },
  { id: "grains", name: "米面粮油" },
  { id: "fruits", name: "生鲜水果" },
]

interface ProductsGridProps {
  products: ProductListItem[]
}

export function ProductsGrid({ products }: ProductsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((product) => product.category === selectedCategory)

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
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
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
      </div>
    </main>
  )
}

