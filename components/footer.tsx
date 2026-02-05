import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">土八鲜</h3>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              采用"公司+合作社+农户+电商"的合作模式，为您提供优质农副产品
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">快速链接</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  首页
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  新闻资讯
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  产品中心
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  关于我们
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">产品分类</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/products?category=new"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  上新产品
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=snacks"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  特产零食
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=mushrooms"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  菌菇干货
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=grains"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  米面粮油
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=fruits"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  生鲜水果
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">联系我们</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>电话: 400-123-4567</li>
              <li>邮箱: info@tubaxian.com</li>
              <li>地址: 中国农业产业园区</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; 2025 土八鲜. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  )
}
