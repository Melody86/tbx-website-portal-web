import { HeroCarousel, type Slide } from "@/components/hero-carousel"
import { StatsSection } from "@/components/stats-section"
import { HotProducts, type HotProductItem } from "@/components/hot-products"
import { StoreLinks, type StoreLinkItem } from "@/components/store-links"
import { LazyVideo } from "@/components/lazy-video"
import { apiGet } from "@/lib/api"

/** 首页依赖后端 API，构建时后端可能不可用，改为请求时渲染 */
export const dynamic = "force-dynamic"

type HomeBanner = {
  id: number
  type: "image" | "video"
  title: string
  description: string
  imageUrl?: string
  videoUrl?: string
  linkUrl?: string
}

type HomeStat = {
  icon: string
  value: string
  label: string
  description: string
}

type HomeHotProductApi = {
  id: number
  productId: number
  productname: string
  category: string
  saleprice: number
  marketprice: number
  description: string
  image_gallery?: string
  sortOrder: number
}

type StoreLinkApi = {
  id: number
  name: string
  platform: string
  url: string
  logoUrl: string
}

function ensureArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[]
  if (value && typeof value === "object" && "list" in value && Array.isArray((value as { list: unknown }).list)) {
    return (value as { list: T[] }).list
  }
  return []
}

async function fetchHomeData() {
  const [bannersRes, statsRes, hotProductsRes, storesRes] = await Promise.all([
    apiGet<HomeBanner[] | unknown>("/tbx/home-banner/active"),
    apiGet<HomeStat[] | unknown>("/tbx/home-stat/active"),
    apiGet<HomeHotProductApi[] | unknown>("/tbx/home-hot-product/active"),
    apiGet<StoreLinkApi[] | unknown>("/tbx/store-link/active"),
  ])

  const banners = ensureArray<HomeBanner>(bannersRes)
  const stats = ensureArray<HomeStat>(statsRes)
  const hotProducts = ensureArray<HomeHotProductApi>(hotProductsRes)
  const stores = ensureArray<StoreLinkApi>(storesRes)

  const slides: Slide[] = banners.map((b) =>
    b.type === "video"
      ? {
          type: "video",
          title: b.title,
          description: b.description,
          videoUrl: b.videoUrl || "",
        }
      : {
          type: "image",
          image: b.imageUrl || "/placeholder.jpg",
          title: b.title,
          description: b.description,
          link: b.linkUrl,
        }
  )

  const hot: HotProductItem[] = hotProducts.map((p) => {
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
        // ignore parse error and use default
      }
    }
    return {
      id: p.productId,
      name: p.productname,
      category: p.category,
      price: `¥${p.saleprice}`,
      image,
      tag: "热销",
    }
  })

  const storeLinks: StoreLinkItem[] = stores.map((s) => ({
    name: s.name,
    url: s.url,
    logo: s.logoUrl || "/placeholder.svg",
  }))

  return { slides, stats, hot, storeLinks }
}

export default async function HomePage() {
  const { slides, stats, hot, storeLinks } = await fetchHomeData()

  return (
    <main>
      <HeroCarousel slides={slides} />

      

      {/* About Section */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">关于土八鲜</h2>
            <p className="text-muted-foreground mb-8 text-base">土八鲜，为您而土</p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              瑞金市土八鲜电子商务有限公司于2016年6月成立，土八鲜以服务三农为初心，专注于整合本地农产品，进行生产、加工及线上销售，公司主营产品有赣南脐橙、脐橙米酒、赣南白莲、手工笋干、山茶油等特色农产品。
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              公司始终秉持着"土八鲜，为您而土"的原生态服务理念，致力于向顾客输送健康、新鲜、美味的原生态农特产品。公司采用"公司+合作社+农户+电商"的合作模式，累计带动困难群众800余户，销售相关农副产品3000多万元。
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              自入驻832平台以来，服务单位超7000家，得到了客户满意的评价。
            </p>
          </div>
        </div>
      </section>

      <LazyVideo
        src="/info.mp4"
        className="w-full h-full object-cover"
      />

      <StatsSection statsFromApi={stats} />
      <HotProducts products={hot} />
      <StoreLinks stores={storeLinks} />
    </main>
  )
}
