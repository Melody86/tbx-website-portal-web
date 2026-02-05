import { Header } from "@/components/header"
import { apiGet } from "@/lib/api"

type NavigationApi = {
  id: number
  position: string
  name: string
  href: string
  sortOrder: number
}

export async function HeaderServer() {
  let navigation: { name: string; href: string }[] = [
    { name: "首页", href: "/" },
    { name: "新闻资讯", href: "/news" },
    { name: "产品中心", href: "/products" },
    { name: "关于我们", href: "/about" },
  ]

  try {
    const navList = await apiGet<NavigationApi[]>("/tbx/navigation", {
      position: "header",
    })
    if (Array.isArray(navList) && navList.length > 0) {
      navigation = navList.map((n) => ({
        name: n.name,
        href: n.href,
      }))
    }
  } catch {
    // 如果导航接口失败则继续使用默认导航
  }

  return <Header navigation={navigation} />
}

