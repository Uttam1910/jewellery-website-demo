import { Link, useLocation } from 'react-router-dom'
import { CalendarDays, Gem, Heart, ShoppingBag } from 'lucide-react'
import { useStore } from '../context/store'
import { cx } from '../lib/format'

/** Sticky bottom action bar on small screens: Shop | Wishlist | Bag | Appointment */
export function MobileBar() {
  const { openPanel, wishlist, bagCount, panel } = useStore()
  const { pathname } = useLocation()
  const item = 'flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[0.625rem] tracking-[0.14em] uppercase'

  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ivory/97 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
    >
      <div className="flex h-14 items-stretch">
        <Link to="/shop" className={cx(item, pathname.startsWith('/shop') ? 'text-gold-deep' : 'text-charcoal')}>
          <Gem size={18} strokeWidth={1.25} aria-hidden="true" />
          Shop
        </Link>
        <button type="button" onClick={() => openPanel('wishlist')} className={cx(item, panel === 'wishlist' ? 'text-gold-deep' : 'text-charcoal')}>
          <span className="relative">
            <Heart size={18} strokeWidth={1.25} aria-hidden="true" />
            {wishlist.length > 0 && (
              <span className="absolute -right-2.5 -top-1.5 grid h-3.5 min-w-3.5 place-items-center rounded-full bg-ink px-0.5 text-[0.55rem] text-ivory">
                {wishlist.length}
              </span>
            )}
          </span>
          Wishlist
        </button>
        <button type="button" onClick={() => openPanel('bag')} className={cx(item, panel === 'bag' ? 'text-gold-deep' : 'text-charcoal')}>
          <span className="relative">
            <ShoppingBag size={18} strokeWidth={1.25} aria-hidden="true" />
            {bagCount > 0 && (
              <span className="absolute -right-2.5 -top-1.5 grid h-3.5 min-w-3.5 place-items-center rounded-full bg-ink px-0.5 text-[0.55rem] text-ivory">
                {bagCount}
              </span>
            )}
          </span>
          Bag
        </button>
        <Link to="/appointments" className={cx(item, 'bg-ink text-ivory')}>
          <CalendarDays size={18} strokeWidth={1.25} aria-hidden="true" />
          Appointment
        </Link>
      </div>
    </nav>
  )
}
