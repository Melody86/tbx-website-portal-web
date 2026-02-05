import { notFound } from "next/navigation"
import { Calendar, ArrowLeft, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { RecordVisitView } from "@/components/record-visit-view"
import { apiGet } from "@/lib/api"
import { getStaticUrl } from "@/lib/static"

// 与接口 GET /tbx/content/:id 返回字段一致（新闻资讯-文章实体）
type NewsDetailApi = {
  id: number
  contentTitle: string
  contentDetails: string
  contentDatetime: string
  contentType: string
  contentImg?: string
  contentKeyword?: string
  contentDescription?: string
  contentSource?: string
  contentAuthor?: string
  contentHit?: number
  contentUrl?: string
  contentDisplay?: string
  contentSort?: number
  updateDate?: string
  createDate?: string
}

type NewsListApi = {
  id: number
  contentTitle: string
  contentDatetime: string
  contentType: string
  contentImg?: string
}

async function fetchArticle(id: number) {
  const article = await apiGet<NewsDetailApi>(`/tbx/content/${id}`)
  if (!article || (article as any).delFlag === "1") {
    return null
  }
  return article
}

async function fetchRelated(category: string, currentId: number) {
  const res = await apiGet<{ list: NewsListApi[]; total: number }>("/tbx/content/list", {
    pageNum: 1,
    pageSize: 4,
    contentType: category,
    contentDisplay: "1",
  })
  return (res.list || []).filter((n) => n.id !== currentId)
}

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params
  const id = Number.parseInt(idStr)
  if (Number.isNaN(id)) {
    notFound()
  }

  const article = await fetchArticle(id)

  if (!article) {
    notFound()
  }

  const relatedList = await fetchRelated(article.contentType, article.id)
  const html =
    typeof article.contentDetails === "string" ? article.contentDetails : String(article.contentDetails ?? "")
  const tags = (article.contentKeyword || "")
    .split(/[，,]/)
    .map((t) => t.trim())
    .filter(Boolean)

  return (
    <main className="py-12 md:py-16">
      <RecordVisitView type="content" targetId={article.id} targetTitle={article.contentTitle} />
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/news">
              <ArrowLeft className="mr-2 h-4 w-4" />
              返回列表
            </Link>
          </Button>

          <article>
            <div className="mb-6">
              <div className="text-sm text-primary font-semibold mb-3">{article.contentType}</div>
              <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 text-balance">{article.contentTitle}</h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {article.contentDatetime ? String(article.contentDatetime).slice(0, 10) : ""}
                </span>
                {article.contentSource && (
                  <span>来源：{article.contentSource}</span>
                )}
                {article.contentAuthor && (
                  <span>作者：{article.contentAuthor}</span>
                )}
                {article.contentHit != null && (
                  <span>阅读 {article.contentHit}</span>
                )}
              </div>
              {article.contentDescription && (
                <p className="mt-3 text-muted-foreground leading-relaxed">{article.contentDescription}</p>
              )}
            </div>

            <div className="relative aspect-video overflow-hidden rounded-lg mb-8 bg-muted">
              <img
                src={getStaticUrl(article.contentImg) || "/placeholder.svg"}
                alt={article.contentTitle}
                className="w-full h-full object-cover"
              />
            </div>

            <div
              className="prose prose-lg max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: html }}
              style={{
                color: "var(--color-foreground)",
              }}
            />

            {tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap pt-6 border-t border-border">
                <Tag className="h-4 w-4 text-muted-foreground" />
                {tags.map((tag, index) => (
                  <span key={index} className="text-sm bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </article>

          {relatedList.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-serif font-bold mb-6">相关文章</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedList.map((related) => (
                  <Link key={related.id} href={`/news/${related.id}`}>
                    <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow group">
                      <div className="relative aspect-video overflow-hidden bg-muted">
                        <img
                          src={getStaticUrl(related.contentImg) || "/placeholder.svg"}
                          alt={related.contentTitle}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2 line-clamp-2 text-balance">{related.contentTitle}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          {related.contentDatetime ? related.contentDatetime.slice(0, 10) : ""}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
