import { createContext, useContext } from 'react'
import type { Product } from '../data/products'

export interface BagLine {
  slug: string
  qty: number
}

export interface BagItem {
  product: Product
  qty: number
  lineTotal: number
}

export type Panel = 'bag' | 'wishlist' | 'search' | 'menu' | null

export interface StoreValue {
  bag: BagItem[]
  bagCount: number
  subtotal: number
  addToBag: (slug: string, qty?: number, opts?: { open?: boolean }) => void
  setQty: (slug: string, qty: number) => void
  removeFromBag: (slug: string) => void
  clearBag: () => void

  wishlist: Product[]
  isWishlisted: (slug: string) => boolean
  toggleWishlist: (slug: string) => void
  removeFromWishlist: (slug: string) => void
  moveToBag: (slug: string) => void

  panel: Panel
  openPanel: (panel: Exclude<Panel, null>) => void
  closePanel: () => void

  quickView: Product | null
  openQuickView: (slug: string) => void
  closeQuickView: () => void

  toast: { id: number; message: string } | null
  notify: (message: string) => void
}

export const StoreContext = createContext<StoreValue | null>(null)

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>')
  return ctx
}

export const MAX_QTY = 5
