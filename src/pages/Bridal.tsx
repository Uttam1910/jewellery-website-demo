import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { AppointmentPanel } from '../components/AppointmentPanel'
import { Img } from '../components/Img'
import { ProductGrid } from '../components/ProductGrid'
import { SectionHeading } from '../components/SectionHeading'
import { photos, type Photo } from '../data/images'
import { isBridal, products, type Category } from '../data/products'
import { useSeo } from '../hooks/useSeo'

const bridal = products.filter(isBridal)

const groups: { id: string; title: string; subtitle: string; category: Category }[] = [
  { id: 'necklaces', title: 'Necklaces', subtitle: 'Chokers, rani haars and layered polki for the pheras.', category: 'necklaces' },
  { id: 'earrings', title: 'Earrings', subtitle: 'Chandbalis and temple jhumkas that frame the face.', category: 'earrings' },
  { id: 'bangles', title: 'Bangles', subtitle: 'Kundan and ruby bangles to stack with the chooda.', category: 'bracelets' },
  { id: 'sets', title: 'Bridal Sets', subtitle: 'Complete, balanced sets composed by our bridal atelier.', category: 'sets' },
]

const looks: { photo: Photo; ceremony: string; note: string }[] = [
  { photo: photos.brideGoldWall, ceremony: 'The Pheras', note: 'A long rani haar layered over a choker, with stacked gold bangles.' },
  { photo: photos.brideVelvet, ceremony: 'The Reception', note: 'Kundan choker and a statement nath against dark velvet.' },
  { photo: photos.brideNath, ceremony: 'The Vidaai', note: 'Emerald and kundan, a jewelled headpiece and a classic nath.' },
  { photo: photos.brideKundan, ceremony: 'The Sangeet', note: 'One statement kundan necklace, oversized earrings, nothing else.' },
  { photo: photos.bridePink, ceremony: 'The Engagement', note: 'A light gold choker with jhumkas and a delicate maang tikka.' },
  { photo: photos.brideChokerMehndi, ceremony: 'The Details', note: 'Layered gold and rubies, with mehendi as the final ornament.' },
]

export default function Bridal() {
  useSeo('Bridal Jewellery', 'The AURELIA bridal collection (demo): polki, kundan and temple jewellery composed for every Indian wedding ceremony.')

  return (
    <>
      {/* Bridal hero */}
      <section className="relative isolate overflow-hidden bg-espresso text-ivory">
        <div className="absolute inset-0 -z-10 md:left-[36%]">
          <Img photo={photos.bridalHero} sizes="(min-width: 768px) 64vw, 100vw" priority />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(31,24,19,0.95),rgba(31,24,19,0.35)_55%,rgba(31,24,19,0.3))] md:bg-[linear-gradient(to_right,#1f1813_0%,#1f1813_35%,rgba(31,24,19,0.6)_52%,rgba(31,24,19,0)_78%)]"
        />
        <div className="container-lux flex min-h-[40rem] items-end pb-16 pt-28 md:min-h-[46rem] md:items-center md:pb-0">
          <div className="max-w-lg">
            <p className="eyebrow animate-fade-up text-gold-soft">The Bridal Atelier</p>
            <h1 className="mt-4 animate-fade-up text-[3rem] leading-[1] text-ivory [animation-delay:100ms] md:text-[4.6rem]">
              The Bridal Collection
            </h1>
            <p className="mt-5 max-w-sm animate-fade-up text-ivory/80 [animation-delay:200ms] md:text-lg">
              For the moments that deserve forever.
            </p>
            <div className="mt-8 flex animate-fade-up flex-wrap gap-3 [animation-delay:300ms]">
              <Link to="/appointments?type=bridal-styling#book" className="btn btn-gold">
                Book a Private Appointment <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </Link>
              <Link to="/shop?category=bridal" className="btn btn-outline-light">
                Shop Bridal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="container-lux py-16 text-center md:py-24">
        <div className="reveal mx-auto max-w-3xl">
          <p className="eyebrow text-gold-deep">Heirlooms from the first day</p>
          <p className="mt-6 font-serif text-[1.7rem] leading-snug text-ink md:text-[2.3rem]">
            Every bride carries generations with her. Our bridal pieces are composed to be worn across every ceremony — and
            passed on long after.
          </p>
        </div>
        <nav aria-label="Bridal categories" className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {groups.map((g) => (
            <a key={g.id} href={`#bridal-${g.id}`} className="link-arrow text-sm">
              {g.title}
            </a>
          ))}
          <a href="#styling" className="link-arrow text-sm">
            Styling inspiration
          </a>
        </nav>
      </section>

      {/* Bridal collections */}
      {groups.map((g, i) => {
        const items = bridal.filter((p) => p.category === g.category).slice(0, 4)
        return (
          <section key={g.id} id={`bridal-${g.id}`} aria-labelledby={`bridal-${g.id}-title`} className={i % 2 ? 'bg-cream/60 py-14 md:py-20' : 'py-14 md:py-20'}>
            <div className="container-lux">
              <SectionHeading
                eyebrow="Bridal collection"
                title={<span id={`bridal-${g.id}-title`}>{g.title}</span>}
                subtitle={g.subtitle}
                action={{ label: `View all bridal ${g.title.toLowerCase()}`, to: `/shop?category=${g.category}&collection=bridal` }}
              />
              <ProductGrid products={items} />
            </div>
          </section>
        )
      })}

      {/* Styling inspiration */}
      <section id="styling" aria-labelledby="styling-title" className="py-16 md:py-24">
        <div className="container-lux">
          <SectionHeading
            eyebrow="Styling inspiration"
            title={<span id="styling-title">A Look for Every Ceremony</span>}
            subtitle="Notes from our bridal stylists on pairing jewellery with each moment of the wedding."
          />
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
            {looks.map((l) => (
              <li key={l.ceremony} className="reveal">
                <figure className="group h-full">
                  <div className="aspect-[4/5] overflow-hidden bg-cream">
                    <Img photo={l.photo} sizes="(min-width: 768px) 33vw, 50vw" className="img-zoom" />
                  </div>
                  <figcaption className="mt-3">
                    <span className="font-serif text-lg text-ink">{l.ceremony}</span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-muted md:text-sm">{l.note}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <AppointmentPanel title="Book a Private Appointment" />
    </>
  )
}
