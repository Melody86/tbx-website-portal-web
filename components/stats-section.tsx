"use client"
import { useEffect, useRef, useState } from "react"
import { TrendingUp, Users, Package, Heart } from "lucide-react"

function useIsVisible<T extends HTMLElement>(): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return [ref, isVisible]
}

function parseValue(value: string): { target: number; suffix: string } {
  const match = value.match(/\d+/)
  if (!match) return { target: 0, suffix: value }
  const num = parseInt(match[0], 10)
  const suffix = value.slice(match.index! + match[0].length)
  return { target: num, suffix }
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function CountUp({ value, duration = 1500, className }: { value: string; duration?: number; className?: string }) {
  const { target, suffix } = parseValue(value)
  const [display, setDisplay] = useState(0)
  const [ref, isVisible] = useIsVisible<HTMLDivElement>()
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    if (!isVisible || hasAnimatedRef.current) return

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mediaQuery.matches) {
      setDisplay(target)
      hasAnimatedRef.current = true
      return
    }

    let raf = 0
    const start = performance.now()
    const step = (now: number) => {
      const elapsed = now - start
      const t = Math.min(1, elapsed / duration)
      const eased = easeOutCubic(t)
      setDisplay(Math.round(eased * target))
      if (t < 1) {
        raf = requestAnimationFrame(step)
      } else {
        hasAnimatedRef.current = true
      }
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [isVisible, target, duration])

  return (
    <div ref={ref} className={className}>
      {`${display}${suffix}`}
    </div>
  )
}

type StatItem = {
  icon: string
  value: string
  label: string
  description: string
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp,
  Users,
  Package,
  Heart,
}

interface StatsSectionProps {
  statsFromApi?: StatItem[]
}

export function StatsSection({ statsFromApi }: StatsSectionProps) {
  const stats = statsFromApi && statsFromApi.length > 0 ? statsFromApi : []

  if (stats.length === 0) return null

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">核心数据</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            采用"公司+合作社+农户+电商"的合作模式，致力于消费扶贫和慈善公益
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = ICON_MAP[stat.icon] || TrendingUp
            return (
              <div key={index} className="bg-card rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <CountUp className="text-3xl md:text-4xl font-bold text-primary mb-2" value={stat.value} />
                <div className="text-lg font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
