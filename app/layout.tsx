import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { Noto_Serif_SC } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { HeaderServer } from "@/components/header-server"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

const notoSerifSC = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "土八鲜 - 新鲜水果电商平台",
  description:
    '土八鲜采用"公司+合作社+农户+电商"的合作模式，为您提供优质的特产零食、菌菇干货、米面粮油、生鲜水果等农副产品',
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className={`font-sans ${GeistSans.variable} ${notoSerifSC.variable} antialiased`}>
        {/* 导航通过服务端组件从后端动态获取 */}
        <HeaderServer />
        {children}
        <Footer />
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
