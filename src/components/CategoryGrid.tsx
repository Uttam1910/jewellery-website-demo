import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { photos, type Photo } from '../data/images'
import { getProduct } from '../data/products'
import { Img } from './Img'
import { SectionHeading } from './SectionHeading'

const productPhoto = (slug: string) => getProduct(slug)!.images.main

const categories: { label: string; to: string; photo: Photo }[] = [
  { label: 'Necklaces', to: '/shop?category=necklaces', photo: productPhoto('royal-emerald-polki-necklace') },
  { label: 'Earrings', to: '/shop?category=earrings', photo: productPhoto('meenakshi-temple-jhumkas') },
  { label: 'Rings', to: '/shop?category=rings', photo: productPhoto('navratna-heritage-ring') },
  { label: 'Bracelets', to: '/shop?category=bracelets', photo: productPhoto('sindoor-ruby-bangles') },
  { label: 'Bridal', to: '/shop?category=bridal', photo: photos.brideVeil },
]

export function CategoryGrid() {
  return (
    <section className="py-16 md:py-24" aria-labelledby="shop-by-category">
      <div className="container-lux">
        <SectionHeading
          title={<span id="shop-by-category">Shop by Category</span>}
          subtitle="Discover pieces for every occasion."
          action={{ label: 'View All', to: '/shop' }}
        />
      </div>
      <div className="container-lux">
        <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 md:-mx-10 md:scroll-px-10 md:gap-4 md:px-10 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:px-0">
          {categories.map((c, i) => (
            <li key={c.label} className="reveal w-[62%] shrink-0 snap-start sm:w-[38%] lg:w-auto" style={{ transitionDelay: `${i * 70}ms` }}>
              <Link to={c.to} className="group block">
                <div className="aspect-[5/6] overflow-hidden bg-cream">
                  <Img photo={c.photo} sizes="(min-width: 1024px) 20vw, 62vw" className="img-zoom" alt="" />
                </div>
                <div className="mt-3 flex flex-col gap-1">
                  <span className="font-serif text-[1.3rem] text-ink">{c.label}</span>
                  <span className="link-arrow">
                    Explore <ArrowRight size={13} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
