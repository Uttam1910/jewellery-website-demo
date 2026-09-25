import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { AppointmentPanel } from '../components/AppointmentPanel'
import { Img } from '../components/Img'
import { PageHeader } from '../components/PageHeader'
import { collections } from '../data/collections'
import { photos } from '../data/images'
import { products } from '../data/products'
import { useSeo } from '../hooks/useSeo'

export default function Collections() {
  useSeo('Collections', 'Explore AURELIA collections (demo): Bridal, Heritage, Contemporary, Polki, Emerald and Everyday Luxury.')
  return (
    <>
      <PageHeader eyebrow="Aurelia" title="Collections" subtitle="Timeless elegance for every chapter." photo={photos.heroContemporary} />
      <section aria-label="All collections" className="container-lux py-14 md:py-20">
        <ul className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((c, i) => {
            const count = products.filter((p) => p.collections.includes(c.slug)).length
            return (
              <li key={c.slug} className="reveal" style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
                <Link to={`/collections/${c.slug}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-cream">
                    <Img photo={c.image} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw" className="img-zoom" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" aria-hidden="true" />
                    <span className="absolute bottom-5 left-5 text-[0.65rem] tracking-[0.2em] text-ivory/90 uppercase">{count} pieces</span>
                  </div>
                  <h2 className="mt-4 text-[1.7rem]">{c.name}</h2>
                  <p className="mt-1 text-sm text-muted">{c.summary}</p>
                  <span className="link-arrow mt-3">
                    Discover <ArrowRight size={13} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
      <AppointmentPanel />
    </>
  )
}
