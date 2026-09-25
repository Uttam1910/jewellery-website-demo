import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react'
import { Overlay } from '../components/Overlay'
import { PageHeader } from '../components/PageHeader'
import { ProductGrid } from '../components/ProductGrid'
import { DemoBadge } from '../components/DemoBadge'
import { collections } from '../data/collections'
import { isBridal, occasions, priceRanges, products, type Category } from '../data/products'
import { useSeo } from '../hooks/useSeo'
import { cx } from '../lib/format'
import { searchProducts } from '../lib/search'

const categoryTabs: { id: 'all' | Category | 'bridal'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'necklaces', label: 'Necklaces' },
  { id: 'earrings', label: 'Earrings' },
  { id: 'rings', label: 'Rings' },
  { id: 'bracelets', label: 'Bracelets' },
  { id: 'bridal', label: 'Bridal' },
  { id: 'sets', label: 'Sets' },
]

const sorts = [
  { id: 'featured', label: 'Featured' },
  { id: 'newest', label: 'Newest' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
] as const

type FilterKey = 'category' | 'price' | 'collection' | 'occasion'

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)

  const category = categoryTabs.some((c) => c.id === params.get('category')) ? params.get('category')! : 'all'
  const price = priceRanges.find((r) => r.id === params.get('price'))
  const collection = collections.find((c) => c.slug === params.get('collection'))
  const occasion = occasions.find((o) => o.toLowerCase() === params.get('occasion')?.toLowerCase())
  const sort = sorts.find((s) => s.id === params.get('sort'))?.id ?? 'featured'
  const query = params.get('q')?.trim() ?? ''

  const activeCategory = categoryTabs.find((c) => c.id === category)!
  useSeo(
    category === 'all' ? 'Shop Jewellery' : `${activeCategory.label} — Shop`,
    'Shop demo fine jewellery by AURELIA: necklaces, earrings, rings, bangles, bridal sets. Filter by price, collection and occasion.',
  )

  const update = (key: FilterKey | 'sort' | 'q', value: string | null) => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (value === null || value === '' || value === 'all' || (key === 'sort' && value === 'featured')) next.delete(key)
        else next.set(key, value)
        return next
      },
      { replace: true },
    )
  }

  const results = useMemo(() => {
    let list = query ? searchProducts(query) : [...products]
    if (category === 'bridal') list = list.filter(isBridal)
    else if (category !== 'all') list = list.filter((p) => p.category === category)
    if (price) list = list.filter((p) => p.price >= price.min && p.price <= price.max)
    if (collection) list = list.filter((p) => p.collections.includes(collection.slug))
    if (occasion) list = list.filter((p) => p.occasion.includes(occasion))
    const sorted = [...list]
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price)
    else if (sort === 'newest') sorted.sort((a, b) => b.added - a.added)
    else sorted.sort((a, b) => Number(b.featured) - Number(a.featured))
    return sorted
  }, [query, category, price, collection, occasion, sort])

  const chips = [
    query && { key: 'q' as const, label: `“${query}”` },
    category !== 'all' && { key: 'category' as const, label: activeCategory.label },
    price && { key: 'price' as const, label: price.label },
    collection && { key: 'collection' as const, label: collection.name },
    occasion && { key: 'occasion' as const, label: occasion },
  ].filter(Boolean) as { key: FilterKey | 'q'; label: string }[]

  const clearAll = () => setParams(sort === 'featured' ? {} : { sort }, { replace: true })

  const filterPanel = (
    <div className="space-y-8">
      <FilterGroup title="Category">
        {categoryTabs.map((c) => (
          <FilterOption key={c.id} selected={category === c.id} onClick={() => update('category', c.id)}>
            {c.label}
          </FilterOption>
        ))}
      </FilterGroup>
      <FilterGroup title="Price">
        <FilterOption selected={!price} onClick={() => update('price', null)}>
          Any price
        </FilterOption>
        {priceRanges.map((r) => (
          <FilterOption key={r.id} selected={price?.id === r.id} onClick={() => update('price', r.id)}>
            {r.label}
          </FilterOption>
        ))}
      </FilterGroup>
      <FilterGroup title="Collection">
        <FilterOption selected={!collection} onClick={() => update('collection', null)}>
          All collections
        </FilterOption>
        {collections.map((c) => (
          <FilterOption key={c.slug} selected={collection?.slug === c.slug} onClick={() => update('collection', c.slug)}>
            {c.name}
          </FilterOption>
        ))}
      </FilterGroup>
      <FilterGroup title="Occasion">
        <FilterOption selected={!occasion} onClick={() => update('occasion', null)}>
          Any occasion
        </FilterOption>
        {occasions.map((o) => (
          <FilterOption key={o} selected={occasion === o} onClick={() => update('occasion', o.toLowerCase())}>
            {o}
          </FilterOption>
        ))}
      </FilterGroup>
    </div>
  )

  return (
    <>
      <PageHeader eyebrow="The collection" title="Shop Jewellery" subtitle="Discover timeless pieces crafted for every occasion." compact>
        <DemoBadge className="mt-5 animate-fade-up [animation-delay:200ms]">Demo catalogue · illustrative prices</DemoBadge>
      </PageHeader>

      <div className="sticky top-16 z-30 border-y border-line bg-ivory/95 backdrop-blur-md md:top-[4.75rem]">
        <div className="container-lux">
          <nav aria-label="Categories" className="no-scrollbar -mx-5 flex overflow-x-auto px-5 md:mx-0 md:px-0">
            {categoryTabs.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => update('category', c.id)}
                aria-pressed={category === c.id}
                className={cx(
                  'relative shrink-0 px-4 py-4 text-[0.8rem] tracking-[0.08em] transition-colors first:pl-0',
                  'after:absolute after:bottom-0 after:left-4 after:right-4 after:h-px after:bg-ink after:transition-transform first:after:left-0',
                  category === c.id ? 'text-ink after:scale-x-100' : 'text-muted after:scale-x-0 hover:text-ink',
                )}
              >
                {c.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="container-lux pb-20 pt-8 md:pb-28">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => setFiltersOpen(true)} className="btn btn-outline min-h-10 px-4 lg:hidden">
              <SlidersHorizontal size={14} strokeWidth={1.5} aria-hidden="true" /> Filters
              {chips.length > 0 && <span className="text-gold-deep">({chips.length})</span>}
            </button>
            <p className="text-sm text-muted" aria-live="polite">
              {results.length} {results.length === 1 ? 'piece' : 'pieces'}
            </p>
          </div>
          <label className="relative flex items-center gap-2 text-sm text-muted">
            <span className="hidden sm:inline">Sort by</span>
            <select
              value={sort}
              onChange={(e) => update('sort', e.target.value)}
              className="cursor-pointer appearance-none border border-beige bg-transparent py-2 pl-3 pr-9 text-sm text-ink focus:border-gold focus:outline-none"
              aria-label="Sort products"
            >
              {sorts.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
            <ChevronDown size={14} strokeWidth={1.5} className="pointer-events-none absolute right-3 text-ink" aria-hidden="true" />
          </label>
        </div>

        {chips.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {chips.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => update(c.key, null)}
                className="inline-flex items-center gap-2 border border-beige bg-cream px-3 py-1.5 text-xs text-ink transition-colors hover:border-ink"
                aria-label={`Remove filter ${c.label}`}
              >
                {c.label} <X size={12} strokeWidth={1.5} aria-hidden="true" />
              </button>
            ))}
            <button type="button" onClick={clearAll} className="px-2 text-xs text-muted underline underline-offset-4 hover:text-ink">
              Clear all
            </button>
          </div>
        )}

        <div className="mt-8 grid gap-12 lg:grid-cols-[14rem_1fr]">
          <aside aria-label="Filters" className="hidden lg:block">
            <div className="sticky top-40">{filterPanel}</div>
          </aside>
          <div>
            {results.length > 0 ? (
              <ProductGrid products={results} columns={3} className="xl:grid-cols-4" />
            ) : (
              <div className="border border-line px-6 py-20 text-center">
                <p className="font-serif text-3xl text-ink">No pieces found</p>
                <p className="mt-2 text-muted">Try removing a filter or searching for something else.</p>
                <button type="button" onClick={clearAll} className="btn btn-dark mt-7">
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Overlay
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Filters"
        variant="drawer-left"
        footer={
          <div className="flex gap-3 border-t border-line p-5">
            <button type="button" onClick={clearAll} className="btn btn-outline flex-1 px-3">
              Clear
            </button>
            <button type="button" onClick={() => setFiltersOpen(false)} className="btn btn-dark flex-[2] px-3">
              Show {results.length} {results.length === 1 ? 'piece' : 'pieces'}
            </button>
          </div>
        }
      >
        <div className="px-6 py-6">{filterPanel}</div>
      </Overlay>
    </>
  )
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="eyebrow mb-3 text-ink">{title}</legend>
      <ul className="space-y-0.5">{children}</ul>
    </fieldset>
  )
}

function FilterOption({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        aria-pressed={selected}
        className={cx('flex w-full items-center gap-3 py-1.5 text-left text-sm transition-colors', selected ? 'text-ink' : 'text-muted hover:text-ink')}
      >
        <span
          aria-hidden="true"
          className={cx('h-3 w-3 shrink-0 rounded-full border transition-colors', selected ? 'border-ink bg-ink ring-2 ring-inset ring-ivory' : 'border-beige')}
        />
        {children}
      </button>
    </li>
  )
}
