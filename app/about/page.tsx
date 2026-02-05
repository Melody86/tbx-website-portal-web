import Image from "next/image"
import { Building2, History, Heart, Users, Mail, Phone, MapPin, Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ContactForm } from "@/components/contact-form"

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">关于土八鲜</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              土八鲜，为您而土 - 致力于向顾客输送健康、新鲜、美味的原生态农特产品
            </p>
          </div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Building2 className="h-8 w-8 text-primary" />
                <h2 className="text-3xl font-serif font-bold text-foreground">公司简介</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  瑞金市土八鲜电子商务有限公司于2016年6月成立，土八鲜以服务三农为初心，专注于整合本地农产品，进行生产、加工及线上销售。
                </p>
                <p>
                  公司主营产品有赣南脐橙、脐橙米酒、赣南白莲、手工笋干、山茶油等特色农产品，所有产品均来自原产地，确保品质和新鲜度。
                </p>
                <p>
                  公司始终秉持着"土八鲜，为您而土"的原生态服务理念，致力于向顾客输送健康、新鲜、美味的原生态农特产品。
                </p>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <video
                src="/info.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Company History */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-12 justify-center">
            <History className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-serif font-bold text-foreground">发展历程</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">2016</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">公司成立</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        瑞金市土八鲜电子商务有限公司正式成立，开始专注于本地农产品的整合与销售，以服务三农为初心。
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">2018</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">模式创新</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        确立"公司+合作社+农户+电商"的创新合作模式，开始系统性地帮助困难群众增收致富。
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">2020</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">入驻832平台</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        成功入驻832平台，开启消费扶贫新篇章，业务范围进一步扩大，服务更多单位和客户。
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">至今</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">持续发展</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        累计带动困难群众800余户，销售相关农副产品3000多万元，服务单位超7000家，得到了客户满意的评价。
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Honors & Awards Timeline Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-12 justify-center">
            <Award className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-serif font-bold text-foreground">荣誉资质</h2>
          </div>

          {/* Awards Wall Image */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg">
              <Image src="/awards-wall.png" alt="土八鲜荣誉墙" fill className="object-cover" />
            </div>
          </div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[39px] top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block" />

              <div className="space-y-8">
                <div className="flex gap-6 relative">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border-4 border-background relative z-10">
                      <span className="text-xl font-bold text-primary">2017</span>
                    </div>
                  </div>
                  <Card className="flex-1">
                    <CardContent className="p-6">
                      <p className="text-muted-foreground leading-relaxed">
                        共享社交电商平台消营者满意品牌榜十大满意品牌
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex gap-6 relative">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border-4 border-background relative z-10">
                      <span className="text-xl font-bold text-primary">2018</span>
                    </div>
                  </div>
                  <Card className="flex-1">
                    <CardContent className="p-6">
                      <p className="text-muted-foreground leading-relaxed">十佳新电商品牌</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex gap-6 relative">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border-4 border-background relative z-10">
                      <span className="text-xl font-bold text-primary">2019</span>
                    </div>
                  </div>
                  <Card className="flex-1">
                    <CardContent className="p-6">
                      <p className="text-muted-foreground leading-relaxed">赣州市电子商务示范企业</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex gap-6 relative">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border-4 border-background relative z-10">
                      <span className="text-xl font-bold text-primary">2020</span>
                    </div>
                  </div>
                  <Card className="flex-1">
                    <CardContent className="p-6">
                      <p className="text-muted-foreground leading-relaxed">赣州市电商扶贫示范基地</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex gap-6 relative">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border-4 border-background relative z-10">
                      <span className="text-xl font-bold text-primary">2022</span>
                    </div>
                  </div>
                  <Card className="flex-1">
                    <CardContent className="p-6">
                      <ul className="space-y-3 text-muted-foreground leading-relaxed">
                        <li>• 赣州市农业产业化经营市级龙头企业</li>
                        <li>• 江西省电子商务示范企业</li>
                        <li>• 京东平台"最佳产业带奖"</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex gap-6 relative">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border-4 border-background relative z-10">
                      <span className="text-xl font-bold text-primary">2023</span>
                    </div>
                  </div>
                  <Card className="flex-1">
                    <CardContent className="p-6">
                      <ul className="space-y-3 text-muted-foreground leading-relaxed">
                        <li>• 受欢迎的江西十大网货品牌</li>
                        <li>• 第五届江西生态鄱阳湖绿色农产品博览会产品金奖</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          {/* Award Certificates Gallery */}
          <div className="max-w-5xl mx-auto mt-16">
            <h3 className="text-2xl font-serif font-bold text-center mb-8">部分荣誉证书</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/award-jiangxi-ecommerce.png"
                  alt="江西省电子商务示范企业"
                  fill
                  className="object-contain bg-muted/30 p-4"
                />
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/award-top10-brand.png"
                  alt="江西十大网货品牌"
                  fill
                  className="object-contain bg-muted/30 p-4"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-12 justify-center">
            <Heart className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-serif font-bold text-foreground">企业文化</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">使命</h3>
                <p className="text-muted-foreground leading-relaxed">
                  服务三农，助力乡村振兴，为顾客提供健康、新鲜、美味的原生态农特产品
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">愿景</h3>
                <p className="text-muted-foreground leading-relaxed">
                  成为中国领先的农特产品电商平台，让更多人享受到优质的农产品
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">价值观</h3>
                <p className="text-muted-foreground leading-relaxed">品质第一、服务至上、诚信经营、共同发展</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Careers */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-12 justify-center">
            <Users className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-serif font-bold text-foreground">加入我们</h2>
          </div>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              土八鲜正在快速发展，我们欢迎有志于服务三农、助力乡村振兴的优秀人才加入我们的团队。
              我们提供具有竞争力的薪酬待遇、良好的职业发展空间和温馨的工作环境。
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">电商运营专员</h3>
                  <p className="text-sm text-muted-foreground mb-4">负责线上店铺运营、产品推广、客户维护等工作</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    了解详情
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">产品采购专员</h3>
                  <p className="text-sm text-muted-foreground mb-4">负责农产品采购、质量把控、供应商管理等工作</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    了解详情
                  </Button>
                </CardContent>
              </Card>
            </div>
            <p className="text-muted-foreground">
              如有意向，请将简历发送至：
              <a href="mailto:hr@tubaxian.com" className="text-primary hover:underline">
                hr@tubaxian.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-12 justify-center">
            <Mail className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-serif font-bold text-foreground">联系我们</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-6">联系方式</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium mb-1">公司地址</p>
                        <p className="text-muted-foreground">江西省赣州市瑞金市</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Phone className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium mb-1">联系电话</p>
                        <p className="text-muted-foreground">400-XXX-XXXX</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium mb-1">电子邮箱</p>
                        <p className="text-muted-foreground">contact@tubaxian.com</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-6">工作时间</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium mb-2">客服时间</p>
                      <p className="text-muted-foreground">周一至周日 8:00 - 20:00</p>
                    </div>
                    <div>
                      <p className="font-medium mb-2">发货时间</p>
                      <p className="text-muted-foreground">周一至周六 9:00 - 18:00</p>
                    </div>
                    <div>
                      <p className="font-medium mb-2">售后服务</p>
                      <p className="text-muted-foreground">7×24小时在线支持</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-8">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6 text-center">在线留言</h3>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
