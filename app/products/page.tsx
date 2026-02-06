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

type DictData = {
  dictLabel: string
  dictValue: string
  dictSort?: number
}

/** 产品分类选项：id=字典值(dictValue)，name=中文(dictLabel) */
async function fetchProductCategoryOptions(): Promise<{ id: string; name: string }[]> {
  try {
    const res = await apiGet<DictData[]>("/system/dict/data/type/tbx_product_category")
    if (!Array.isArray(res)) return []
    return res
      .filter((item) => item.dictValue != null && item.dictValue !== "")
      .sort((a, b) => (a.dictSort ?? 0) - (b.dictSort ?? 0))
      .map((item) => ({
        id: item.dictValue,
        name: item.dictLabel || item.dictValue,
      }))
  } catch {
    return []
  }
}

async function fetchProductCategoryLabelMap(): Promise<Record<string, string>> {
  const list = await fetchProductCategoryOptions()
  const map: Record<string, string> = {}
  list.forEach((c) => {
    map[c.id] = c.name
  })
  return map
}

const PRODUCT_PAGE_SIZE = 12

async function fetchProducts(
  categoryMap: Record<string, string>,
  category: string | undefined,
  pageNum: number
): Promise<{ list: ProductListItem[]; total: number }> {
  const productRes = await apiGet<ProductListResponse>("/tbx/product/list", {
    pageNum,
    pageSize: PRODUCT_PAGE_SIZE,
    ...(category ? { category } : {}),
  })

  const list = (productRes.list || []).map((p) => {
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
      categoryLabel: categoryMap[p.category] ?? p.category,
      price: p.saleprice,
      originalPrice: p.marketprice,
      image,
      description: p.description,
    }
  })
  return { list, total: productRes.total ?? 0 }
}

type ProductsPageProps = {
  searchParams: Promise<{ category?: string; page?: string }>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams
  const category = params.category ?? undefined
  const pageNum = Math.max(1, parseInt(params.page ?? "1", 10) || 1)

  const [categoryOptions, categoryMap] = await Promise.all([
    fetchProductCategoryOptions(),
    fetchProductCategoryLabelMap(),
  ])
  const { list: products, total } = await fetchProducts(categoryMap, category, pageNum)

  return (
    <ProductsGrid
      products={products}
      categories={categoryOptions}
      selectedCategory={category || "all"}
      total={total}
      currentPage={pageNum}
      pageSize={PRODUCT_PAGE_SIZE}
    />
  )
}
