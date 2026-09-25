import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { getProduct, products } from '../data/products'
import { MAX_QTY, StoreContext, type BagLine, type Panel, type StoreValue } from './store'

const BAG_KEY = 'aurelia.bag.v1'
const WISH_KEY = 'aurelia.wishlist.v1'

function load<T>(key: string, fallback: T, valid: (v: unknown) => v is T): T {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    const parsed: unknown = JSON.parse(raw)
    return valid(parsed) ? parsed : fallback
  } catch {
    return fallback
  }
}

function save(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable (private mode) — state still works in memory */
  }
}

const known = new Set(products.map((p) => p.slug))
const isBag = (v: unknown): v is BagLine[] =>
  Array.isArray(v) && v.every((l) => l && typeof l.slug === 'string' && known.has(l.slug) && Number.isInteger(l.qty) && l.qty > 0)
const isSlugList = (v: unknown): v is string[] => Array.isArray(v) && v.every((s) => typeof s === 'string' && known.has(s))

const clamp = (n: number) => Math.max(1, Math.min(MAX_QTY, n))

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<BagLine[]>(() => load(BAG_KEY, [], isBag))
  const [wish, setWish] = useState<string[]>(() => load(WISH_KEY, [], isSlugList))
  const [panel, setPanel] = useState<Panel>(null)
  const [quickSlug, setQuickSlug] = useState<string | null>(null)
  const [toast, setToast] = useState<StoreValue['toast']>(null)
  const toastTimer = useRef<number | undefined>(undefined)

  useEffect(() => save(BAG_KEY, lines), [lines])
  useEffect(() => save(WISH_KEY, wish), [wish])

  const notify = useCallback((message: string) => {
    window.clearTimeout(toastTimer.current)
    setToast({ id: Date.now(), message })
    toastTimer.current = window.setTimeout(() => setToast(null), 2800)
  }, [])

  const addToBag = useCallback<StoreValue['addToBag']>(
    (slug, qty = 1, opts) => {
      const product = getProduct(slug)
      if (!product) return
      setLines((prev) => {
        const found = prev.find((l) => l.slug === slug)
        if (found) return prev.map((l) => (l.slug === slug ? { ...l, qty: clamp(l.qty + qty) } : l))
        return [...prev, { slug, qty: clamp(qty) }]
      })
      if (opts?.open === false) notify(`${product.name} added to your bag`)
      else {
        setQuickSlug(null)
        setPanel('bag')
      }
    },
    [notify],
  )

  const setQty = useCallback((slug: string, qty: number) => {
    setLines((prev) => prev.map((l) => (l.slug === slug ? { ...l, qty: clamp(qty) } : l)))
  }, [])

  const removeFromBag = useCallback((slug: string) => setLines((prev) => prev.filter((l) => l.slug !== slug)), [])
  const clearBag = useCallback(() => setLines([]), [])

  const toggleWishlist = useCallback(
    (slug: string) => {
      const product = getProduct(slug)
      if (!product) return
      const has = wish.includes(slug)
      setWish((prev) => (has ? prev.filter((s) => s !== slug) : [...prev.filter((s) => s !== slug), slug]))
      notify(has ? `Removed ${product.name} from your wishlist` : `Saved ${product.name} to your wishlist`)
    },
    [wish, notify],
  )

  const removeFromWishlist = useCallback((slug: string) => setWish((prev) => prev.filter((s) => s !== slug)), [])

  const moveToBag = useCallback(
    (slug: string) => {
      setWish((prev) => prev.filter((s) => s !== slug))
      addToBag(slug, 1, { open: false })
    },
    [addToBag],
  )

  const value = useMemo<StoreValue>(() => {
    const bag = lines.flatMap((l) => {
      const product = getProduct(l.slug)
      return product ? [{ product, qty: l.qty, lineTotal: product.price * l.qty }] : []
    })
    return {
      bag,
      bagCount: bag.reduce((n, i) => n + i.qty, 0),
      subtotal: bag.reduce((n, i) => n + i.lineTotal, 0),
      addToBag,
      setQty,
      removeFromBag,
      clearBag,
      wishlist: wish.flatMap((s) => getProduct(s) ?? []),
      isWishlisted: (slug) => wish.includes(slug),
      toggleWishlist,
      removeFromWishlist,
      moveToBag,
      panel,
      openPanel: (p) => {
        setQuickSlug(null)
        setPanel(p)
      },
      closePanel: () => setPanel(null),
      quickView: quickSlug ? (getProduct(quickSlug) ?? null) : null,
      openQuickView: (slug) => setQuickSlug(slug),
      closeQuickView: () => setQuickSlug(null),
      toast,
      notify,
    }
  }, [lines, wish, panel, quickSlug, toast, addToBag, setQty, removeFromBag, clearBag, toggleWishlist, removeFromWishlist, moveToBag, notify])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
