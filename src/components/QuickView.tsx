import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Heart } from 'lucide-react'
import { useStore } from '../context/store'
import { categoryLabels, type Product } from '../data/products'
import { cx, formatPrice } from '../lib/format'
import { DemoBadge } from './DemoBadge'
import { Img } from './Img'
import { Overlay } from './Overlay'
import { QtyStepper } from './QtyStepper'

export function QuickView() {
  const { quickView, closeQuickView } = useStore()
  // Keep the last product rendered while the modal animates out
  const [product, setProduct] = useState<Product | null>(quickView)
  if (quickView && quickView !== product) setProduct(quickView)

  return (
    <Overlay open={!!quickView} onClose={closeQuickView} title={product ? `Quick view: ${product.name}` : 'Quick view'} hideTitle variant="modal">
      {product && <QuickViewBody key={product.slug} product={product} />}
    </Overlay>
  )
}

function QuickViewBody({ product }: { product: Product }) {
  const { addToBag, toggleWishlist, isWishlisted, closeQuickView } = useStore()
  const [qty, setQty] = useState(1)
  const [active, setActive] = useState(0)
  const images = product.images.gallery.slice(0, 3)
  const saved = isWishlisted(product.slug)

  return (
    <div className="grid md:grid-cols-[1.1fr_1fr]">
      <div className="bg-cream">
        <div className="aspect-square overflow-hidden md:aspect-[4/5]">
          <Img key={active} photo={images[active]} sizes="(min-width: 768px) 520px, 100vw" className="animate-fade-in" />
        </div>
        <div className="flex gap-2 p-3">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1} of ${images.length}`}
              aria-current={i === active}
              className={cx('h-14 w-14 overflow-hidden border transition-colors', i === active ? 'border-ink' : 'border-transparent opacity-70 hover:opacity-100')}
            >
              <Img photo={img} sizes="56px" alt="" />
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col p-6 md:p-10">
        <p className="eyebrow text-gold-deep">{categoryLabels[product.category]}</p>
        <h3 className="mt-3 text-[2rem] leading-tight">{product.name}</h3>
        <p className="mt-2 text-lg tabular-nums text-charcoal">{formatPrice(product.price)}</p>
        <p className="mt-5 text-[0.95rem] leading-relaxed text-muted">{product.description}</p>

        <div className="mt-6">
          <p className="mb-2 text-xs tracking-[0.12em] text-muted uppercase">Quantity</p>
          <QtyStepper value={qty} onChange={setQty} label={`Quantity for ${product.name}`} />
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <button type="button" className="btn btn-dark w-full" onClick={() => addToBag(product.slug, qty)}>
            Add to bag
          </button>
          <button type="button" className="btn btn-outline w-full" onClick={() => toggleWishlist(product.slug)} aria-pressed={saved}>
            <Heart size={14} strokeWidth={1.5} className={cx(saved && 'fill-ruby text-ruby')} aria-hidden="true" />
            {saved ? 'Saved to wishlist' : 'Add to wishlist'}
          </button>
        </div>

        <Link to={`/product/${product.slug}`} onClick={closeQuickView} className="link-arrow mt-6 self-start">
          View full details <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
        </Link>
        <div className="mt-auto pt-8">
          <DemoBadge>Demo product · illustrative price</DemoBadge>
        </div>
      </div>
    </div>
  )
}
