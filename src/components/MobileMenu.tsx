import { NavLink } from 'react-router-dom'
import { ArrowRight, Heart, Search, ShoppingBag } from 'lucide-react'
import { useStore } from '../context/store'
import { photos } from '../data/images'
import { cx } from '../lib/format'
import { Img } from './Img'
import { Logo } from './Logo'
import { Overlay } from './Overlay'

const links = [
  { to: '/', label: 'Home' },
  { to: '/collections', label: 'Collections' },
  { to: '/bridal', label: 'Bridal' },
  { to: '/shop', label: 'Shop' },
  { to: '/our-story', label: 'Our Story' },
  { to: '/appointments', label: 'Appointments' },
  { to: '/contact', label: 'Contact' },
]

export function MobileMenu() {
  const { panel, closePanel, openPanel, wishlist, bagCount } = useStore()
  return (
    <Overlay open={panel === 'menu'} onClose={closePanel} title={<Logo onClick={closePanel} />} variant="drawer-right">
      <nav aria-label="Mobile" className="px-6 pt-2">
        <ul>
          {links.map((l) => (
            <li key={l.to} className="border-b border-line">
              <NavLink
                to={l.to}
                end={l.to === '/'}
                onClick={closePanel}
                className={({ isActive }) =>
                  cx('flex items-center justify-between py-3.5 text-[0.95rem] tracking-wide', isActive ? 'text-gold-deep' : 'text-ink')
                }
              >
                {l.label}
                <ArrowRight size={14} strokeWidth={1.25} className="text-beige" aria-hidden="true" />
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className="mt-6 space-y-1 text-sm text-charcoal">
          <li>
            <button type="button" onClick={() => openPanel('search')} className="flex items-center gap-3 py-2">
              <Search size={16} strokeWidth={1.25} aria-hidden="true" /> Search
            </button>
          </li>
          <li>
            <button type="button" onClick={() => openPanel('wishlist')} className="flex items-center gap-3 py-2">
              <Heart size={16} strokeWidth={1.25} aria-hidden="true" /> Wishlist ({wishlist.length})
            </button>
          </li>
          <li>
            <button type="button" onClick={() => openPanel('bag')} className="flex items-center gap-3 py-2">
              <ShoppingBag size={16} strokeWidth={1.25} aria-hidden="true" /> Shopping Bag ({bagCount})
            </button>
          </li>
        </ul>
      </nav>
      <div className="relative mx-6 mb-6 mt-8 overflow-hidden bg-espresso text-ivory">
        <div className="absolute inset-0 opacity-45">
          <Img photo={photos.palaceArches} sizes="22rem" />
        </div>
        <div className="relative p-6">
          <p className="font-serif text-2xl leading-tight text-ivory">Book a Private Appointment</p>
          <p className="mt-2 text-sm text-ivory/80">Experience our collection in a luxurious setting.</p>
          <NavLink to="/appointments" onClick={closePanel} className="btn btn-outline-light mt-5 min-h-10 px-5">
            Book now <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
          </NavLink>
        </div>
      </div>
    </Overlay>
  )
}
