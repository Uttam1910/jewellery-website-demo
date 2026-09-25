import { useRef, useState, type KeyboardEvent, type MouseEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight, BadgeCheck, CalendarDays, ChevronRight, Heart, Infinity as InfinityIcon, Truck } from 'lucide-react'
import { DemoBadge } from '../components/DemoBadge'
import { Img } from '../components/Img'
import { ProductGrid } from '../components/ProductGrid'
import { QtyStepper } from '../components/QtyStepper'
import { SectionHeading } from '../components/SectionHeading'
import { useStore } from '../context/store'
import { collections } from '../data/collections'
import { categoryLabels, getProduct, relatedProducts, type Product } from '../data/products'
import { infoPages } from '../data/pages'
import { useSeo } from '../hooks/useSeo'
import { cx, formatPrice } from '../lib/format'
import NotFound from './NotFound'

export default function ProductPage() {
  const { slug } = useParams()
  const product = getProduct(slug)
  if (!product) return <NotFound />
  return <ProductView key={product.slug} product={product} />
}

const tabs = ['Details', 'Materials', 'Shipping', 'Care'] as const

function ProductView({ product }: { product: Product }) {
  useSeo(product.name, `${product.name} — ${product.description} Demo product by AURELIA Fine Jewellery.`)
  const { addToBag, toggleWishlist, isWishlisted } = useStore()
  const [active, setActive] = useState(0)
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState<(typeof tabs)[number]>('Details')
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const saved = isWishlisted(product.slug)
  const gallery = product.images.gallery
  const collectionNames = product.collections.map((c) => collections.find((x) => x.slug === c)!)

  const onZoomMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
  }

  const onTabKey = (e: KeyboardEvent, i: number) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!dir && e.key !== 'Home' && e.key !== 'End') return
    e.preventDefault()
    const next = e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : (i + dir + tabs.length) % tabs.length
    setTab(tabs[next])
    tabRefs.current[next]?.focus()
  }

  return (
    <>
      <div className="container-lux pt-20 md:pt-28">
        <nav aria-label="Breadcrumb" className="py-4 text-xs text-muted">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link to="/" className="hover:text-ink">
                Home
              </Link>
            </li>
            <li aria-hidden="true"><ChevronRight size={12} /></li>
            <li>
              <Link to="/shop" className="hover:text-ink">
                Shop
              </Link>
            </li>
            <li aria-hidden="true"><ChevronRight size={12} /></li>
            <li>
              <Link to={`/shop?category=${product.category}`} className="hover:text-ink">
                {categoryLabels[product.category]}
              </Link>
            </li>
            <li aria-hidden="true"><ChevronRight size={12} /></li>
            <li aria-current="page" className="text-ink">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="grid gap-10 pb-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16 xl:gap-24">
          {/* Gallery */}
          <div className="flex flex-col-reverse gap-3 md:flex-row md:gap-4">
            <div className="no-scrollbar flex gap-2.5 overflow-x-auto md:w-20 md:shrink-0 md:flex-col md:overflow-visible" role="group" aria-label="Product images">
              {gallery.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`View image ${i + 1} of ${gallery.length}`}
                  aria-current={i === active}
                  className={cx(
                    'aspect-square w-16 shrink-0 overflow-hidden border bg-cream transition-all md:w-full',
                    i === active ? 'border-ink' : 'border-transparent opacity-65 hover:opacity-100',
                  )}
                >
                  <Img photo={img} sizes="80px" alt="" />
                </button>
              ))}
            </div>
            <div className="flex-1">
              <div
                className="relative aspect-square cursor-zoom-in overflow-hidden bg-cream md:aspect-[5/6]"
                onMouseMove={onZoomMove}
                onMouseLeave={() => setZoom(null)}
              >
                <div
                  key={active}
                  className="h-full w-full animate-fade-in transition-transform duration-300 ease-out"
                  style={zoom ? { transform: 'scale(1.8)', transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
                >
                  <Img photo={gallery[active]} sizes="(min-width: 1024px) 50vw, 100vw" priority={active === 0} />
                </div>
              </div>
              <p className="mt-2 text-xs text-muted">{gallery[active].alt}</p>
            </div>
          </div>

          {/* Details */}
          <div className="lg:pt-4">
            <p className="eyebrow text-gold-deep">
              {collectionNames
                .slice(0, 2)
                .map((c) => c.name)
                .join(' · ')}
            </p>
            <h1 className="mt-3 text-[2.4rem] leading-[1.05] md:text-[3rem]">{product.name}</h1>
            <p className="mt-3 text-xl tabular-nums text-charcoal">{formatPrice(product.price)}</p>
            <p className="mt-1 text-xs text-muted">Inclusive of all taxes · Demo price</p>
            <p className="mt-6 max-w-md leading-relaxed text-muted">{product.description}</p>

            <dl className="mt-6 grid max-w-md grid-cols-2 gap-y-2 text-sm">
              <dt className="text-muted">Metal</dt>
              <dd className="text-ink">{product.metal}</dd>
              <dt className="text-muted">Weight</dt>
              <dd className="text-ink">{product.weight}</dd>
              <dt className="text-muted">Reference</dt>
              <dd className="text-ink">{product.id}</dd>
            </dl>

            <div className="mt-8">
              <p className="mb-2 text-xs tracking-[0.12em] text-muted uppercase">
                Quantity
              </p>
              <QtyStepper value={qty} onChange={setQty} label={`Quantity for ${product.name}`} />
            </div>

            <div className="mt-6 flex max-w-md flex-col gap-3">
              <button type="button" onClick={() => addToBag(product.slug, qty)} className="btn btn-dark w-full">
                Add to bag
              </button>
              <button type="button" onClick={() => toggleWishlist(product.slug)} aria-pressed={saved} className="btn btn-outline w-full">
                <Heart size={14} strokeWidth={1.5} className={cx(saved && 'fill-ruby text-ruby')} aria-hidden="true" />
                {saved ? 'Saved to wishlist' : 'Add to wishlist'}
              </button>
            </div>

            <ul className="mt-8 grid max-w-md grid-cols-3 gap-2 border-y border-line py-5 text-center">
              {[
                { icon: BadgeCheck, label: 'Certified Jewellery' },
                { icon: Truck, label: 'Free Insured Shipping' },
                { icon: InfinityIcon, label: 'Lifetime Care' },
              ].map(({ icon: Icon, label }) => (
                <li key={label} className="flex flex-col items-center gap-2">
                  <Icon size={20} strokeWidth={1.1} className="text-gold-deep" aria-hidden="true" />
                  <span className="text-[0.68rem] leading-tight text-muted">{label}</span>
                </li>
              ))}
            </ul>
            <DemoBadge className="mt-3">Demo product — illustrative services and claims</DemoBadge>

            <Link
              to="/appointments?type=in-store#book"
              className="group mt-8 flex max-w-md items-center gap-4 bg-cream p-4 transition-colors hover:bg-champagne/60"
            >
              <CalendarDays size={20} strokeWidth={1.1} className="shrink-0 text-gold-deep" aria-hidden="true" />
              <span className="flex-1 text-sm">
                <span className="block text-ink">See it in person</span>
                <span className="text-muted">Book a private viewing at our boutique</span>
              </span>
              <ArrowRight size={14} strokeWidth={1.5} className="text-ink transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <section aria-label="Product information" className="border-t border-line pb-16 pt-2 md:pb-24">
          <div role="tablist" aria-label="Product information" className="no-scrollbar -mx-5 flex gap-8 overflow-x-auto px-5 md:mx-0 md:px-0">
            {tabs.map((t, i) => (
              <button
                key={t}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                id={`tab-${t}`}
                role="tab"
                type="button"
                aria-selected={tab === t}
                aria-controls={`panel-${t}`}
                tabIndex={tab === t ? 0 : -1}
                onClick={() => setTab(t)}
                onKeyDown={(e) => onTabKey(e, i)}
                className={cx(
                  'relative shrink-0 py-4 text-sm tracking-wide transition-colors',
                  'after:absolute after:inset-x-0 after:top-0 after:h-px after:bg-ink after:transition-transform',
                  tab === t ? 'text-ink after:scale-x-100' : 'text-muted after:scale-x-0 hover:text-ink',
                )}
              >
                {t}
              </button>
            ))}
          </div>
          <div id={`panel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`} tabIndex={0} className="max-w-3xl pt-4 leading-relaxed text-muted outline-none">
            <TabContent tab={tab} product={product} />
          </div>
        </section>
      </div>

      <section aria-labelledby="related-title" className="border-t border-line bg-cream/50 py-16 md:py-24">
        <div className="container-lux">
          <SectionHeading title={<span id="related-title">You May Also Love</span>} action={{ label: 'View All', to: `/shop?category=${product.category}` }} />
          <ProductGrid products={relatedProducts(product)} />
        </div>
      </section>
    </>
  )
}

function TabContent({ tab, product }: { tab: (typeof tabs)[number]; product: Product }) {
  switch (tab) {
    case 'Details':
      return (
        <div className="prose-lux animate-fade-in">
          <p>{product.details}</p>
          <p>
            Suited to: <span className="text-ink">{product.occasion.join(', ')}</span>. Reference {product.id}.
          </p>
        </div>
      )
    case 'Materials':
      return (
        <ul className="animate-fade-in space-y-2">
          {product.materials.map((m) => (
            <li key={m} className="flex items-center gap-3">
              <span className="h-1 w-1 rounded-full bg-gold" aria-hidden="true" />
              <span className="text-ink">{m}</span>
            </li>
          ))}
          <li className="pt-2 text-sm">Materials are described for this demo and are not a certification.</li>
        </ul>
      )
    case 'Shipping':
      return (
        <div className="prose-lux animate-fade-in">
          {infoPages.shipping.sections[0].body.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p>
            <Link to="/shipping" className="text-ink underline underline-offset-4">
              Read the shipping page
            </Link>
          </p>
        </div>
      )
    case 'Care':
      return (
        <div className="prose-lux animate-fade-in">
          {infoPages.care.sections[0].body.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p>
            <Link to="/care" className="text-ink underline underline-offset-4">
              Jewellery care guide
            </Link>
          </p>
        </div>
      )
  }
}
