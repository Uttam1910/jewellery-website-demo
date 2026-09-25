import { useDeferredValue, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Search as SearchIcon } from 'lucide-react'
import { useStore } from '../context/store'
import { categoryLabels } from '../data/products'
import { searchProducts } from '../lib/search'
import { formatPrice } from '../lib/format'
import { Img } from './Img'
import { Overlay } from './Overlay'

const suggestions = ['Polki', 'Emerald', 'Jhumkas', 'Bridal', 'Rings', 'Bangles']

export function SearchOverlay() {
  const { panel, closePanel } = useStore()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const deferred = useDeferredValue(query)
  const results = useMemo(() => searchProducts(deferred), [deferred])
  const hasQuery = deferred.trim().length > 0

  return (
    <Overlay open={panel === 'search'} onClose={closePanel} title="Search" variant="top" initialFocus={inputRef}>
      <div className="container-lux pb-10 pt-6">
        <form role="search" onSubmit={(e) => e.preventDefault()} className="relative">
          <label htmlFor="site-search" className="sr-only">
            Search by name, category or collection
          </label>
          <SearchIcon size={20} strokeWidth={1.25} className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            ref={inputRef}
            id="site-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search necklaces, polki, emerald…"
            autoComplete="off"
            className="w-full border-b border-beige bg-transparent py-4 pl-9 pr-2 font-serif text-2xl text-ink placeholder:text-beige focus:border-ink focus:outline-none md:text-3xl"
          />
        </form>

        {!hasQuery && (
          <div className="mt-6">
            <p className="eyebrow text-muted">Popular searches</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setQuery(s)}
                  className="border border-beige px-4 py-2 text-sm text-charcoal transition-colors hover:border-ink hover:text-ink"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {hasQuery && (
          <div className="mt-6" aria-live="polite">
            {results.length === 0 ? (
              <div className="py-10 text-center">
                <p className="font-serif text-2xl text-ink">No results found</p>
                <p className="mt-2 text-sm text-muted">
                  We couldn’t find anything for “{deferred}”. Try “polki”, “earrings” or “bridal”.
                </p>
              </div>
            ) : (
              <>
                <p className="text-xs tracking-[0.12em] text-muted uppercase">
                  {results.length} {results.length === 1 ? 'result' : 'results'}
                </p>
                <ul className="mt-4 grid max-h-[55vh] grid-cols-1 gap-x-8 gap-y-1 overflow-y-auto sm:grid-cols-2 lg:grid-cols-3">
                  {results.map((p) => (
                    <li key={p.slug}>
                      <Link to={`/product/${p.slug}`} onClick={closePanel} className="group flex items-center gap-4 py-2.5">
                        <span className="h-16 w-16 shrink-0 overflow-hidden bg-cream">
                          <Img photo={p.images.main} sizes="64px" alt="" />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate font-serif text-lg text-ink group-hover:text-gold-deep">{p.name}</span>
                          <span className="block text-xs text-muted">
                            {categoryLabels[p.category]} · {formatPrice(p.price)}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link to={`/shop?q=${encodeURIComponent(deferred.trim())}`} onClick={closePanel} className="link-arrow mt-6">
                  See all results in the shop <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </Overlay>
  )
}
