import { ExternalLink } from "lucide-react"
import { getStaticUrl } from "@/lib/static"

export interface StoreLinkItem {
  name: string
  url: string
  logo: string
}

interface StoreLinksProps {
  stores: StoreLinkItem[]
}

export function StoreLinks({ stores }: StoreLinksProps) {
  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">店铺链接</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">在各大电商平台都能找到我们</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stores.map((store, index) => (
            <a
              key={index}
              href={store.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card rounded-lg p-6 flex flex-col items-center justify-center gap-4 hover:shadow-lg transition-shadow group"
            >
              <img src={getStaticUrl(store.logo) || "/placeholder.svg"} alt={store.name} className="w-16 h-16 object-contain" />
              <div className="text-center">
                <div className="font-semibold mb-1">{store.name}</div>
                <ExternalLink className="h-4 w-4 mx-auto text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
