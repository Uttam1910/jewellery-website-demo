import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { photos } from '../data/images'
import { Img } from './Img'

export function BridalBanner() {
  return (
    <section aria-labelledby="bridal-banner-title" className="relative isolate overflow-hidden bg-espresso text-ivory">
      <div className="relative min-h-[42rem] md:min-h-[36rem] lg:min-h-[40rem]">
        <div className="absolute inset-0 md:left-[30%]">
          <Img photo={photos.bridalBanner} sizes="(min-width: 768px) 70vw, 100vw" className="object-[50%_22%]" />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(31,24,19,0.97)_0%,rgba(31,24,19,0.85)_30%,rgba(31,24,19,0.2)_58%,rgba(31,24,19,0.05))] md:bg-[linear-gradient(to_right,#1f1813_0%,#1f1813_30%,rgba(31,24,19,0.6)_50%,rgba(31,24,19,0)_75%)]"
        />
        <div className="container-lux relative flex min-h-[42rem] items-end pb-14 md:min-h-[36rem] md:items-center md:pb-0 lg:min-h-[40rem]">
          <div className="reveal max-w-md">
            <p className="eyebrow text-gold-soft">The Bridal Atelier</p>
            <h2 id="bridal-banner-title" className="mt-4 text-[2.6rem] leading-[1.02] text-ivory md:text-[3.6rem]">
              The Bridal Collection
            </h2>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-ivory/80 md:text-base">
              For the moments that deserve forever. Polki, kundan and temple gold, composed for every ceremony.
            </p>
            <Link to="/bridal" className="btn btn-outline-light mt-8">
              Explore Bridal <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
