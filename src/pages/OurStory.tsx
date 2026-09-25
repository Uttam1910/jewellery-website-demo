import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { AppointmentPanel } from '../components/AppointmentPanel'
import { DemoBadge } from '../components/DemoBadge'
import { Img } from '../components/Img'
import { photos } from '../data/images'
import { useSeo } from '../hooks/useSeo'

const pillars = [
  {
    no: '01',
    title: 'Craftsmanship',
    text: 'Every piece passes through the hands of karigars trained in polki, kundan and temple work — setting, chasing and finishing by hand.',
    photo: photos.craftBench,
  },
  {
    no: '02',
    title: 'Design Philosophy',
    text: 'We design for the woman, not the display case: balanced weight, comfortable fastenings and silhouettes that move with her.',
    photo: photos.brideSunlit,
  },
  {
    no: '03',
    title: 'Heritage',
    text: 'Our motifs come from temple architecture, Mughal gardens and Rajasthani courts — the visual memory of Indian jewellery.',
    photo: photos.palaceArches,
  },
  {
    no: '04',
    title: 'Modern Interpretation',
    text: 'We edit tradition lightly: lighter polki, finer settings and forms that feel as right at a dinner as at a wedding.',
    photo: photos.modelChoker,
  },
]

export default function OurStory() {
  useSeo('Our Story', 'The story behind AURELIA, a fictional Indian fine jewellery house blending heritage craftsmanship with modern design.')
  return (
    <>
      {/* Editorial intro — reference "Our Story" split */}
      <section className="bg-cream pt-16 md:pt-[4.75rem]">
        <div className="grid md:grid-cols-[1fr_1.1fr]">
          <div className="relative aspect-[4/5] overflow-hidden md:aspect-auto md:min-h-[42rem]">
            <Img photo={photos.storyPortrait} sizes="(min-width: 768px) 48vw, 100vw" priority className="absolute inset-0" />
          </div>
          <div className="flex items-center px-6 py-14 md:px-12 lg:px-20">
            <div className="max-w-lg">
              <p className="eyebrow animate-fade-up text-gold-deep">Aurelia</p>
              <h1 className="mt-4 animate-fade-up text-[3rem] leading-none [animation-delay:80ms] md:text-[4.2rem]">Our Story</h1>
              <p className="mt-5 animate-fade-up font-serif text-xl italic text-gold-deep [animation-delay:160ms] md:text-2xl">
                A legacy of artistry, a future of timeless beauty.
              </p>
              <p className="mt-6 animate-fade-up leading-relaxed text-muted [animation-delay:240ms]">
                Aurelia was born from a passion for preserving India’s rich jewellery heritage while creating modern designs for
                today’s woman.
              </p>
              <DemoBadge className="mt-6">Fictional brand story</DemoBadge>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="container-lux py-20 text-center md:py-28">
        <blockquote className="reveal mx-auto max-w-3xl font-serif text-[1.8rem] leading-snug text-ink md:text-[2.6rem]">
          “Jewellery in India has never been decoration alone. It is memory, blessing and inheritance — worn close to the heart.”
        </blockquote>
        <p className="mt-6 text-xs tracking-[0.2em] text-muted uppercase">— The Aurelia atelier</p>
      </section>

      {/* Pillars — alternating editorial rows */}
      <section aria-label="What we believe" className="container-lux space-y-16 pb-20 md:space-y-24 md:pb-28">
        {pillars.map((p, i) => (
          <article key={p.no} className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
            <div className={i % 2 ? 'md:order-2' : ''}>
              <div className="reveal aspect-[4/3] overflow-hidden bg-cream md:aspect-[5/4]">
                <Img photo={p.photo} sizes="(min-width: 768px) 45vw, 100vw" />
              </div>
            </div>
            <div className="reveal max-w-md">
              <p className="font-serif text-5xl text-champagne">{p.no}</p>
              <h2 className="mt-2 text-[2.1rem] md:text-[2.6rem]">{p.title}</h2>
              <p className="mt-4 leading-relaxed text-muted">{p.text}</p>
            </div>
          </article>
        ))}
      </section>

      {/* Numbers */}
      <section className="border-y border-line bg-cream/60">
        <dl className="container-lux grid grid-cols-2 gap-8 py-14 text-center md:grid-cols-4">
          {[
            ['120+', 'hours on a bridal set'],
            ['6', 'signature collections'],
            ['1', 'atelier, many hands'],
            ['∞', 'lifetime care'],
          ].map(([n, l]) => (
            <div key={l}>
              <dt className="sr-only">{l}</dt>
              <dd className="font-serif text-5xl text-ink">{n}</dd>
              <dd className="mt-2 text-xs tracking-[0.14em] text-muted uppercase">{l}</dd>
            </div>
          ))}
        </dl>
        <p className="pb-6 text-center text-[0.65rem] tracking-[0.12em] text-muted uppercase">Illustrative figures · demo content</p>
      </section>

      <section className="container-lux py-16 text-center md:py-20">
        <h2 className="reveal text-[2rem] md:text-[2.6rem]">Discover the collections</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/collections" className="btn btn-dark">
            Explore collections <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
          </Link>
          <Link to="/bridal" className="btn btn-outline">
            The bridal atelier
          </Link>
        </div>
      </section>

      <AppointmentPanel />
    </>
  )
}
