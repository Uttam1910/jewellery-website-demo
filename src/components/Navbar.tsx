import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Heart, Menu, Search, ShoppingBag } from 'lucide-react'
import { useStore } from '../context/store'
import { cx } from '../lib/format'
import { Logo } from './Logo'

const mainNav = [
  { to: '/collections', label: 'Collections' },
  { to: '/bridal', label: 'Bridal' },
  { to: '/shop', label: 'Shop' },
  { to: '/our-story', label: 'Our Story' },
  { to: '/appointments', label: 'Appointments' },
]

function CountBadge({ count, light }: { count: number; light: boolean }) {
  if (count === 0) return null
  return (
    <span
      aria-hidden="true"
      className={cx(
        'absolute -right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full px-1 text-[0.6rem] font-medium tabular-nums',
        light ? 'bg-ivory text-ink' : 'bg-ink text-ivory',
      )}
    >
      {count}
    </span>
  )
}

export function Navbar() {
  const { pathname } = useLocation()
  const { openPanel, bagCount, wishlist } = useStore()
  const [scrolled, setScrolled] = useState(false)
  const overlay = pathname === '/' || pathname === '/bridal'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  const transparent = overlay && !scrolled
  const iconBtn = cx(
    'relative grid h-10 w-10 place-items-center transition-colors',
    transparent ? 'text-ivory hover:text-gold-soft' : 'text-ink hover:text-gold-deep',
  )

  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-500',
        transparent
          ? 'border-b border-transparent bg-gradient-to-b from-ink/45 to-transparent'
          : 'border-b border-line bg-ivory/95 backdrop-blur-md',
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-ivory"
      >
        Skip to content
      </a>
      <div className="container-lux flex h-16 items-center justify-between gap-6 md:h-[4.75rem]">
        <Logo light={transparent} />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {mainNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cx(
                      'relative py-2 text-[0.8125rem] tracking-[0.06em] transition-colors',
                      'after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:transition-transform after:duration-500',
                      'hover:after:scale-x-100',
                      transparent ? 'text-ivory/90 hover:text-ivory after:bg-gold-soft' : 'text-charcoal hover:text-ink after:bg-gold',
                      isActive && 'after:scale-x-100',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="-mr-2 flex items-center gap-0.5">
          <button type="button" className={iconBtn} onClick={() => openPanel('search')} aria-label="Search jewellery">
            <Search size={19} strokeWidth={1.25} />
          </button>
          <button
            type="button"
            className={iconBtn}
            onClick={() => openPanel('wishlist')}
            aria-label={`Wishlist, ${wishlist.length} ${wishlist.length === 1 ? 'item' : 'items'}`}
          >
            <Heart size={19} strokeWidth={1.25} />
            <CountBadge count={wishlist.length} light={transparent} />
          </button>
          <button
            type="button"
            className={iconBtn}
            onClick={() => openPanel('bag')}
            aria-label={`Shopping bag, ${bagCount} ${bagCount === 1 ? 'item' : 'items'}`}
          >
            <ShoppingBag size={19} strokeWidth={1.25} />
            <CountBadge count={bagCount} light={transparent} />
          </button>
          <button type="button" className={cx(iconBtn, 'lg:hidden')} onClick={() => openPanel('menu')} aria-label="Open menu">
            <Menu size={21} strokeWidth={1.25} />
          </button>
        </div>
      </div>
    </header>
  )
}
