import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, ArrowRight } from "lucide-react"
import { apiGet } from "@/lib/api"
import { getStaticUrl } from "@/lib/static"
import { NewsListPagination } from "@/components/news-list-pagination"
import { NewsTypeTabs, type NewsTypeOption } from "@/components/news-type-tabs"

/** 依赖后端 API，构建时可能不可用，改为请求时渲染 */
export const dynamic = "force-dynamic"

type NewsItem = {
  id: number
  title: string
  excerpt: string
  date: string
  category: string
  image?: string
}

type NewsContentApi = {
  id: number
  contentTitle: string
  contentDescription: string
  contentDatetime: string
  contentType: string
  contentImg?: string
}

const NEWS_PAGE_SIZE = 12

type DictData = { dictLabel: string; dictValue: string; dictSort?: number }

async function fetchNewsTypeOptions(): Promise<NewsTypeOption[]> {
  try {
    const res = await apiGet<DictData[]>("/system/dict/data/type/tbx_news_type")
    if (!Array.isArray(res)) return []
    return res
      .filter((item) => item.dictValue != null && item.dictValue !== "")
      .sort((a, b) => (a.dictSort ?? 0) - (b.dictSort ?? 0))
      .map((item) => ({ id: item.dictValue, name: item.dictLabel || item.dictValue }))
  } catch {
    return []
  }
}

async function fetchNews(
  pageNum: number,
  contentType?: string
): Promise<{ featured?: NewsItem; regular: NewsItem[]; total: number }> {
  const res = await apiGet<{ list: NewsContentApi[]; total: number }>("/tbx/content/list", {
    pageNum,
    pageSize: NEWS_PAGE_SIZE,
    contentDisplay: "1",
    ...(contentType ? { contentType } : {}),
  })

  const items: NewsItem[] = (res.list || []).map((n) => ({
    id: n.id,
    title: n.contentTitle,
    excerpt: n.contentDescription,
    date: n.contentDatetime ? n.contentDatetime.slice(0, 10) : "",
    category: n.contentType || "",
    image: n.contentImg || "/placeholder.svg",
  }))

  const total = res.total ?? 0
  if (!items.length) {
    return { featured: undefined, regular: [], total }
  }

  if (pageNum === 1 && items.length > 0) {
    const [featured, ...rest] = items
    return { featured, regular: rest, total }
  }
  return { featured: undefined, regular: items, total }
}

type NewsPageProps = {
  searchParams: Promise<{ page?: string; contentType?: string }>
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const params = await searchParams
  const pageNum = Math.max(1, parseInt(params.page ?? "1", 10) || 1)
  const contentType = params.contentType ?? undefined

  const [typeOptions, { featured, regular, total }] = await Promise.all([
    fetchNewsTypeOptions(),
    fetchNews(pageNum, contentType),
  ])

  const categories: NewsTypeOption[] = [{ id: "all", name: "全部" }, ...typeOptions]
  const selectedType = contentType || "all"
  const typeLabelMap: Record<string, string> = Object.fromEntries(typeOptions.map((t) => [t.id, t.name]))

  const featuredWithLabel = featured
    ? { ...featured, category: typeLabelMap[featured.category] ?? featured.category }
    : undefined
  const regularWithLabel = regular.map((a) => ({
    ...a,
    category: typeLabelMap[a.category] ?? a.category,
  }))

  return (
    <main className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">新闻资讯</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">了解土八鲜最新动态和行业资讯</p>
        </div>

        <NewsTypeTabs categories={categories} selectedType={selectedType} />

        {/* Featured Article */}
        {featuredWithLabel && (
          <Link href={`/news/${featuredWithLabel.id}`} className="block mb-12">
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative aspect-video md:aspect-auto overflow-hidden bg-muted">
                  <img
                    src={getStaticUrl(featuredWithLabel.image) || "/placeholder.svg"}
                    alt={featuredWithLabel.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-primary text-primary-foreground text-sm font-semibold px-4 py-1.5 rounded-full">
                      精选
                    </span>
                  </div>
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <div className="text-sm text-primary font-semibold mb-2">{featuredWithLabel.category}</div>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4 text-balance">
                    {featuredWithLabel.title}
                  </h2>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{featuredWithLabel.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      {featuredWithLabel.date}
                    </div>
                    <div className="flex items-center text-primary font-semibold">
                      阅读更多
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </Link>
        )}

        {/* Regular Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularWithLabel.map((article) => (
            <Link key={article.id} href={`/news/${article.id}`}>
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow group">
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <img
                    src={getStaticUrl(article.image) || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="text-sm text-primary font-semibold mb-2">{article.category}</div>
                  <h3 className="text-xl font-serif font-bold mb-3 text-balance line-clamp-2">{article.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    {article.date}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <NewsListPagination
          total={total}
          currentPage={pageNum}
          pageSize={NEWS_PAGE_SIZE}
          contentType={contentType}
        />
      </div>
    </main>
  )
}
