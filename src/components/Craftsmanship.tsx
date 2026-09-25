import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { photos } from '../data/images'
import { Img } from './Img'

export function Craftsmanship() {
  return (
    <section aria-labelledby="craft-title" className="bg-cream">
      <div className="grid md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[34rem]">
          <Img photo={photos.craftHands} sizes="(min-width: 768px) 50vw, 100vw" className="absolute inset-0" />
        </div>
        <div className="flex items-center px-6 py-14 md:px-12 lg:px-20">
          <div className="reveal max-w-md">
            <p className="eyebrow text-gold-deep">The Atelier</p>
            <h2 id="craft-title" className="mt-4 text-[2.4rem] leading-[1.05] md:text-[3.1rem]">
              Crafted by Tradition
              <span className="block italic text-gold-deep">Designed for Today</span>
            </h2>
            <p className="mt-6 leading-relaxed text-muted">
              At Aurelia, we blend timeless artistry with contemporary design, creating jewellery that celebrates your unique
              story.
            </p>
            <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-beige py-5 text-center">
              {[
                ['Hand', 'finished'],
                ['22kt', 'gold'],
                ['Uncut', 'polki'],
              ].map(([a, b]) => (
                <div key={a}>
                  <dt className="font-serif text-2xl text-ink">{a}</dt>
                  <dd className="text-[0.7rem] tracking-[0.14em] text-muted uppercase">{b}</dd>
                </div>
              ))}
            </dl>
            <Link to="/our-story" className="btn btn-outline mt-8">
              Our Story <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
