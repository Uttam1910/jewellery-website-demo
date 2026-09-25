import { Link } from 'react-router-dom'
import { ArrowRight, Heart, ShoppingBag, X } from 'lucide-react'
import { useStore } from '../context/store'
import { formatPrice } from '../lib/format'
import { Img } from './Img'
import { Overlay } from './Overlay'

export function WishlistDrawer() {
  const { panel, closePanel, wishlist, removeFromWishlist, moveToBag, openPanel } = useStore()

  return (
    <Overlay open={panel === 'wishlist'} onClose={closePanel} title="Wishlist" variant="drawer-right">
      {wishlist.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center px-8 py-16 text-center">
          <Heart size={34} strokeWidth={1} className="text-gold" aria-hidden="true" />
          <p className="mt-5 font-serif text-2xl text-ink">Your wishlist is empty</p>
          <p className="mt-2 text-sm text-muted">Tap the heart on any piece to save it here.</p>
          <Link to="/shop" onClick={closePanel} className="btn btn-dark mt-7">
            Discover jewellery <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>
      ) : (
        <div className="flex min-h-full flex-col">
          <p className="px-6 pt-4 text-xs tracking-[0.12em] text-muted uppercase" aria-live="polite">
            {wishlist.length} saved {wishlist.length === 1 ? 'piece' : 'pieces'}
          </p>
          <ul className="flex-1 divide-y divide-line px-6">
            {wishlist.map((product) => (
              <li key={product.slug} className="flex gap-4 py-5">
                <Link to={`/product/${product.slug}`} onClick={closePanel} className="h-24 w-20 shrink-0 overflow-hidden bg-cream">
                  <Img photo={product.images.main} sizes="80px" alt={product.name} />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <Link to={`/product/${product.slug}`} onClick={closePanel} className="font-serif text-lg leading-tight text-ink hover:text-gold-deep">
                      {product.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeFromWishlist(product.slug)}
                      className="-mr-1 -mt-1 grid h-8 w-8 shrink-0 place-items-center text-muted transition-colors hover:text-ruby"
                      aria-label={`Remove ${product.name} from wishlist`}
                    >
                      <X size={16} strokeWidth={1.3} />
                    </button>
                  </div>
                  <p className="mt-1 text-sm tabular-nums text-muted">{formatPrice(product.price)}</p>
                  <button
                    type="button"
                    onClick={() => moveToBag(product.slug)}
                    className="mt-auto inline-flex items-center gap-2 self-start pt-3 text-[0.7rem] font-medium tracking-[0.16em] text-ink uppercase underline-offset-4 hover:underline"
                  >
                    <ShoppingBag size={13} strokeWidth={1.5} aria-hidden="true" /> Move to bag
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t border-line p-6">
            <button type="button" onClick={() => openPanel('bag')} className="btn btn-outline w-full">
              View shopping bag
            </button>
            <p className="mt-3 text-center text-xs text-muted">Saved in this browser only.</p>
          </div>
        </div>
      )}
    </Overlay>
  )
}
