import { apiGet } from "@/lib/api"
import { ProductsGrid, type ProductListItem } from "@/components/products-grid"

type ProductApi = {
  id: number
  category: string
  unit: string
  image_gallery?: string
  model: string
  weight: number
  unitprice: number
  marketprice: number
  saleprice: number
  description?: string
  productname: string
  display: string
}

type ProductListResponse = {
  list: ProductApi[]
  total: number
}

async function fetchProducts(): Promise<ProductListItem[]> {
  const res = await apiGet<ProductListResponse>("/tbx/product/list", {
    pageNum: 1,
    pageSize: 100,
  })

  return (res.list || []).map((p) => {
    let image = "/placeholder.jpg"
    if (p.image_gallery) {
      try {
        const parsed = JSON.parse(p.image_gallery) as string[] | string
        if (Array.isArray(parsed)) {
          image = parsed[0] || image
        } else if (typeof parsed === "string" && parsed) {
          image = parsed
        }
      } catch {
        // ignore parse error
      }
    }
    return {
      id: p.id,
      name: p.productname,
      category: p.category,
      price: p.saleprice,
      originalPrice: p.marketprice,
      image,
      description: p.description,
    }
  })
}

export default async function ProductsPage() {
  const products = await fetchProducts()
  return <ProductsGrid products={products} />
}
