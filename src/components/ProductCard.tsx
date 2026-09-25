import { Link } from 'react-router-dom'
import { Eye } from 'lucide-react'
import type { Product } from '../data/products'
import { useStore } from '../context/store'
import { formatPrice } from '../lib/format'
import { Img } from './Img'
import { WishlistButton } from './WishlistButton'

interface ProductCardProps {
  product: Product
  sizes?: string
  showCategory?: boolean
}

export function ProductCard({ product, sizes = '(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw', showCategory }: ProductCardProps) {
  const { openQuickView } = useStore()
  const { main, hover } = product.images

  return (
    <article className="group relative">
      <Link to={`/product/${product.slug}`} className="block focus-visible:outline-offset-4">
        <div className="relative aspect-square overflow-hidden bg-cream">
          <Img photo={main} sizes={sizes} className="img-zoom" />
          <div className="absolute inset-0 opacity-0 transition-opacity duration-700 ease-[var(--ease-lux)] [@media(hover:hover)]:group-hover:opacity-100">
            <Img photo={hover} sizes={sizes} alt="" />
          </div>
          {product.newArrival && (
            <span className="absolute left-3 top-3 bg-ivory/90 px-2 py-1 text-[0.6rem] font-medium tracking-[0.18em] text-ink uppercase">
              New
            </span>
          )}
        </div>
        <div className="mt-3.5 flex flex-col gap-1 pr-2">
          {showCategory && <span className="eyebrow text-[0.6rem] text-muted">{product.metal}</span>}
          <h3 className="font-serif text-[1.15rem] leading-snug text-ink md:text-[1.2rem]">{product.name}</h3>
          <p className="text-[0.8125rem] tabular-nums text-charcoal">{formatPrice(product.price)}</p>
        </div>
      </Link>

      <WishlistButton slug={product.slug} name={product.name} className="absolute right-3 top-3" />

      <QuickViewTrigger onClick={() => openQuickView(product.slug)} name={product.name} />
    </article>
  )
}

/** Quick view: a bar that slides up on hover/focus (desktop), a compact icon button on touch screens. */
function QuickViewTrigger({ onClick, name }: { onClick: () => void; name: string }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 aspect-square">
      <button
        type="button"
        onClick={onClick}
        aria-label={`Quick view ${name}`}
        className="pointer-events-auto absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-ivory/85 text-ink backdrop-blur-sm transition-colors hover:bg-ivory [@media(hover:hover)]:hidden"
      >
        <Eye size={16} strokeWidth={1.4} />
      </button>
      <button
        type="button"
        onClick={onClick}
        aria-label={`Quick view ${name}`}
        className="pointer-events-auto absolute inset-x-3 bottom-3 hidden translate-y-2 bg-ivory/92 py-2.5 text-[0.65rem] font-medium tracking-[0.2em] text-ink uppercase opacity-0 backdrop-blur-sm transition-all duration-500 ease-[var(--ease-lux)] hover:bg-ink hover:text-ivory group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 [@media(hover:hover)]:block"
      >
        Quick view
      </button>
    </div>
  )
}
