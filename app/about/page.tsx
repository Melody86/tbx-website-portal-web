import Image from "next/image"
import { Building2, History, Heart, Users, Mail, Phone, MapPin, Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ContactForm } from "@/components/contact-form"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-primary/3 to-background" aria-hidden />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--primary)/0.12),transparent]" aria-hidden />
        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-primary/80 mb-4">About Us</p>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-5 tracking-tight">
              关于土八鲜
            </h1>
            <div className="w-16 h-1 rounded-full bg-primary mx-auto mb-8" />
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              土八鲜，为您而土 — 致力于向顾客输送健康、新鲜、美味的原生态农特产品
            </p>
          </div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-16 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-3 mb-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Building2 className="h-6 w-6" />
                </span>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">公司简介</h2>
              </div>
              <div className="space-y-5 text-muted-foreground leading-relaxed text-[15px] md:text-base">
                <p>
                  瑞金市土八鲜电子商务有限公司于2016年6月成立，土八鲜以服务三农为初心，专注于整合本地农产品，进行生产、加工及线上销售。
                </p>
                <p>
                  公司主营产品有赣南脐橙、脐橙米酒、赣南白莲、手工笋干、山茶油等特色农产品，所有产品均来自原产地，确保品质和新鲜度。
                </p>
                <p>
                  公司始终秉持着「土八鲜，为您而土」的原生态服务理念，致力于向顾客输送健康、新鲜、美味的原生态农特产品。
                </p>
              </div>
            </div>
            <div className="relative aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5">
              <video
                src="/info.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                aria-label="土八鲜公司介绍视频"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Company History - Timeline */}
      <section className="py-16 md:py-28 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-14 justify-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <History className="h-6 w-6" />
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">发展历程</h2>
          </div>

          <div className="max-w-3xl mx-auto relative">
            {/* 时间线竖线 */}
            <div
              className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/25 rounded-full hidden sm:block"
              aria-hidden
            />

            {[
              { year: "2016", title: "公司成立", desc: "瑞金市土八鲜电子商务有限公司正式成立，开始专注于本地农产品的整合与销售，以服务三农为初心。" },
              { year: "2018", title: "模式创新", desc: "确立「公司+合作社+农户+电商」的创新合作模式，开始系统性地帮助困难群众增收致富。" },
              { year: "2020", title: "入驻832平台", desc: "成功入驻832平台，开启消费扶贫新篇章，业务范围进一步扩大，服务更多单位和客户。" },
              { year: "至今", title: "持续发展", desc: "累计带动困难群众800余户，销售相关农副产品3000多万元，服务单位超7000家，得到了客户满意的评价。" },
            ].map((item) => (
              <div key={item.year} className="relative flex gap-6 sm:gap-8 pb-10 last:pb-0">
                {/* 时间线节点（圆点落在竖线上） */}
                <div className="flex-shrink-0 w-12 flex justify-center">
                  <div
                    className="relative z-10 w-4 h-4 rounded-full bg-primary ring-4 ring-background sm:ring-4 sm:ring-muted/40"
                    aria-hidden
                  />
                </div>

                {/* 内容区：年份 + 卡片 */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="mb-3">
                    <span className="inline-flex items-center justify-center rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-bold text-primary">
                      {item.year}
                    </span>
                  </div>
                  <Card className="border-border/80 transition-shadow duration-200 hover:shadow-lg hover:shadow-primary/5">
                    <CardContent className="p-5 md:p-6">
                      <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{item.desc}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Honors & Awards Timeline Section */}
      <section className="py-16 md:py-28">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-14 justify-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Award className="h-6 w-6" />
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">荣誉资质</h2>
          </div>

          <div className="max-w-5xl mx-auto mb-16 flex justify-center">
            <div className="relative w-full aspect-[21/9] md:h-[320px] rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5">
              <Image
                src="/awards-wall.png"
                alt="土八鲜荣誉墙"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 1024px"
              />
            </div>
          </div>

          {/* 历年荣誉时间线 */}
          <div className="max-w-3xl mx-auto relative">
            <div
              className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/25 rounded-full hidden sm:block"
              aria-hidden
            />
            {[
              { year: "2017", text: "共享社交电商平台消营者满意品牌榜十大满意品牌" },
              { year: "2018", text: "十佳新电商品牌" },
              { year: "2019", text: "赣州市电子商务示范企业" },
              { year: "2020", text: "赣州市电商扶贫示范基地" },
              {
                year: "2022",
                text: "赣州市农业产业化经营市级龙头企业；江西省电子商务示范企业；京东平台「最佳产业带奖」",
              },
              {
                year: "2023",
                text: "受欢迎的江西十大网货品牌；第五届江西生态鄱阳湖绿色农产品博览会产品金奖",
              },
            ].map((item) => (
              <div key={item.year} className="relative flex gap-6 sm:gap-8 pb-10 last:pb-0">
                <div className="flex-shrink-0 w-12 flex justify-center">
                  <div
                    className="relative z-10 w-4 h-4 rounded-full bg-primary ring-4 ring-background sm:ring-4 sm:ring-muted/40"
                    aria-hidden
                  />
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="mb-3">
                    <span className="inline-flex items-center justify-center rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-bold text-primary">
                      {item.year}
                    </span>
                  </div>
                  <Card className="border-border/80 transition-shadow duration-200 hover:shadow-lg hover:shadow-primary/5">
                    <CardContent className="p-5 md:p-6">
                      <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{item.text}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-5xl mx-auto mt-16">
            <h3 className="text-xl font-serif font-bold text-center text-foreground mb-8">部分荣誉证书</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative h-[260px] md:h-[300px] rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5 transition-transform duration-200 hover:scale-[1.02]">
                <Image
                  src="/award-jiangxi-ecommerce.png"
                  alt="江西省电子商务示范企业"
                  fill
                  className="object-contain bg-muted/30 p-6"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="relative h-[260px] md:h-[300px] rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5 transition-transform duration-200 hover:scale-[1.02]">
                <Image
                  src="/award-top10-brand.png"
                  alt="江西十大网货品牌"
                  fill
                  className="object-contain bg-muted/30 p-6"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-16 md:py-28 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-14 justify-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Heart className="h-6 w-6" />
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">企业文化</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {[
              { icon: Heart, title: "使命", desc: "服务三农，助力乡村振兴，为顾客提供健康、新鲜、美味的原生态农特产品" },
              { icon: Building2, title: "愿景", desc: "成为中国领先的农特产品电商平台，让更多人享受到优质的农产品" },
              { icon: Users, title: "价值观", desc: "品质第一、服务至上、诚信经营、共同发展" },
            ].map(({ icon: Icon, title, desc }) => (
              <Card
                key={title}
                className="border-border/80 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
              >
                <CardContent className="p-6 md:p-8 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">{title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Careers */}
      <section className="py-16 md:py-28">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-14 justify-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Users className="h-6 w-6" />
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">加入我们</h2>
          </div>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
              土八鲜正在快速发展，我们欢迎有志于服务三农、助力乡村振兴的优秀人才加入。我们提供具有竞争力的薪酬待遇、良好的职业发展空间和温馨的工作环境。
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <Card className="border-border/80 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20">
                <CardContent className="p-6 text-left">
                  <h3 className="text-lg font-bold text-foreground mb-2">电商运营专员</h3>
                  <p className="text-sm text-muted-foreground mb-5">负责线上店铺运营、产品推广、客户维护等工作</p>
                  <Button variant="outline" className="w-full border-primary/30 text-primary hover:bg-primary/10 hover:border-primary">
                    了解详情
                  </Button>
                </CardContent>
              </Card>
              <Card className="border-border/80 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20">
                <CardContent className="p-6 text-left">
                  <h3 className="text-lg font-bold text-foreground mb-2">产品采购专员</h3>
                  <p className="text-sm text-muted-foreground mb-5">负责农产品采购、质量把控、供应商管理等工作</p>
                  <Button variant="outline" className="w-full border-primary/30 text-primary hover:bg-primary/10 hover:border-primary">
                    了解详情
                  </Button>
                </CardContent>
              </Card>
            </div>
            <p className="text-muted-foreground text-sm md:text-base">
              如有意向，请将简历发送至：
              <a href="mailto:hr@tubaxian.com" className="text-primary font-medium hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
                hr@tubaxian.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 md:py-28 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-14 justify-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Mail className="h-6 w-6" />
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">联系我们</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              <Card className="border-border/80 transition-shadow duration-200 hover:shadow-lg hover:shadow-primary/5">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-lg font-bold text-foreground mb-6">联系方式</h3>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <MapPin className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="font-medium text-foreground mb-0.5">公司地址</p>
                        <p className="text-muted-foreground text-sm">江西省赣州市瑞金市</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Phone className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="font-medium text-foreground mb-0.5">联系电话</p>
                        <p className="text-muted-foreground text-sm">400-XXX-XXXX</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Mail className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="font-medium text-foreground mb-0.5">电子邮箱</p>
                        <p className="text-muted-foreground text-sm">contact@tubaxian.com</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/80 transition-shadow duration-200 hover:shadow-lg hover:shadow-primary/5">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-lg font-bold text-foreground mb-6">工作时间</h3>
                  <div className="space-y-5">
                    <div>
                      <p className="font-medium text-foreground mb-1">客服时间</p>
                      <p className="text-muted-foreground text-sm">周一至周日 8:00 - 20:00</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">发货时间</p>
                      <p className="text-muted-foreground text-sm">周一至周六 9:00 - 18:00</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">售后服务</p>
                      <p className="text-muted-foreground text-sm">7×24小时在线支持</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-8 border-primary/20 bg-card shadow-lg">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-lg font-bold text-foreground mb-6 text-center">在线留言</h3>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
