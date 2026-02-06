"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export type NewsTypeOption = { id: string; name: string }

interface NewsTypeTabsProps {
  categories: NewsTypeOption[]
  selectedType: string
}

export function NewsTypeTabs({ categories, selectedType }: NewsTypeTabsProps) {
  const router = useRouter()

  const handleTypeClick = (typeId: string) => {
    if (typeId === "all") {
      router.push("/news")
    } else {
      router.push(`/news?contentType=${encodeURIComponent(typeId)}`)
    }
  }

  return (
    <div className="mb-8 flex flex-wrap gap-3">
      {categories.map((cat) => (
        <Button
          key={cat.id}
          type="button"
          variant={selectedType === cat.id ? "default" : "outline"}
          onClick={() => handleTypeClick(cat.id)}
          className={selectedType === cat.id ? "bg-primary text-primary-foreground" : ""}
        >
          {cat.name}
        </Button>
      ))}
    </div>
  )
}
