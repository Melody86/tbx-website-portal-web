import { notFound } from "next/navigation"
import { ArrowLeft, ShoppingCart, Heart, Share2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { apiGet } from "@/lib/api"
import { getStaticUrl } from "@/lib/static"
import { RecordVisitView } from "@/components/record-visit-view"

// 与接口 GET /tbx/product/:id 返回字段一致（产品信息实体）
type ProductDetailApi = {
  id: number
  category: string
  image_gallery?: string
  unit: string
  model: string
  weight: number
  unitprice: number
  marketprice: number
  saleprice: number
  description?: string
  productname: string
  display: string
  detail?: string
}

type ProductListApi = {
  id: number
  category: string
  image_gallery?: string
  productname: string
  saleprice: number
}

async function fetchProduct(id: number) {
  const res = await apiGet<ProductDetailApi>(`/tbx/product/${id}`)
  if (!res || (res as any).delFlag === "1") {
    return null
  }
  return res
}

async function fetchRelated(category: string, currentId: number) {
  const res = await apiGet<{ list: ProductListApi[]; total: number }>("/tbx/product/list", {
    pageNum: 1,
    pageSize: 8,
    category,
  })
  return (res.list || []).filter((p) => p.id !== currentId)
}

function parseImages(imageGallery?: string): string[] {
  if (!imageGallery) return []
  try {
    const parsed = JSON.parse(imageGallery) as string[] | string
    if (Array.isArray(parsed)) return parsed
    if (typeof parsed === "string" && parsed) return [parsed]
  } catch {
    // ignore
  }
  return []
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params
  const id = Number.parseInt(idStr)
  if (Number.isNaN(id)) {
    notFound()
  }

  const product = await fetchProduct(id)

  if (!product) {
    notFound()
  }

  const relatedList = await fetchRelated(product.category, product.id)
  const images = parseImages(product.image_gallery)
  const mainImage = getStaticUrl(images[0]) || "/placeholder.jpg"

  const relatedProducts = relatedList.map((p) => {
    const imgs = parseImages(p.image_gallery)
    return {
      id: p.id,
      name: p.productname,
      price: p.saleprice,
      image: getStaticUrl(imgs[0]) || "/placeholder.jpg",
    }
  })

  return (
    <main className="py-12 md:py-16">
      <RecordVisitView type="product" targetId={product.id} targetTitle={product.productname} />
      <div className="container mx-auto px-4">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回产品列表
          </Link>
        </Button>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Product Images */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-lg mb-4 bg-muted">
              <img src={mainImage} alt={product.productname} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4">
                <span className="inline-block bg-primary text-primary-foreground text-sm font-semibold px-4 py-1.5 rounded-full">
                  {product.category}
                </span>
              </div>
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-3 gap-4">
                {images.slice(1).map((img, index) => (
                  <div
                    key={index}
                    className="relative aspect-square overflow-hidden rounded-lg bg-muted cursor-pointer hover:opacity-75 transition-opacity"
                  >
                      <img src={getStaticUrl(img) || "/placeholder.svg"} alt={`${product.productname} ${index + 2}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="text-sm text-primary font-semibold mb-2">{product.category}</div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">{product.productname}</h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-muted" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">4.8</span>
              </div>
              <span className="text-sm text-muted-foreground">0 评价</span>
              <span className="text-sm text-muted-foreground">已售 0</span>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>

            <div className="bg-secondary rounded-lg p-6 mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-primary">¥{product.saleprice}</span>
                <span className="text-xl text-muted-foreground line-through">¥{product.marketprice}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                节省 ¥{(product.marketprice - product.saleprice).toFixed(2)}
              </div>
            </div>

            <div className="flex gap-3 mb-6">
              <Button size="lg" className="flex-1 bg-primary hover:bg-primary/90">
                <ShoppingCart className="mr-2 h-5 w-5" />
                立即购买
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Specifications */}
            <div className="border-t border-border pt-6">
              <h3 className="font-semibold mb-4">产品规格</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">型号</span>
                  <span className="font-medium">{product.model}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">单位</span>
                  <span className="font-medium">{product.unit}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">重量</span>
                  <span className="font-medium">{product.weight}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details - 标题 + 正文，无 Tab、无用户评价模块 */}
        <div className="mb-16 border-t border-border pt-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">产品详情</h2>
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: product.detail ?? "" }}
            style={{
              color: "var(--color-foreground)",
            }}
          />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6">相关产品</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((related) => (
                <Link key={related.id} href={`/products/${related.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      <img
                        src={related.image || "/placeholder.svg"}
                        alt={related.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{related.name}</h3>
                      <div className="text-xl font-bold text-primary">¥{related.price}</div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
