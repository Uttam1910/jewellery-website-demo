import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Star } from 'lucide-react'
import { testimonials } from '../data/testimonials'
import { cx } from '../lib/format'
import { DemoBadge } from './DemoBadge'

export function Testimonials() {
  const track = useRef<HTMLUListElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const [active, setActive] = useState(0)

  const update = useCallback(() => {
    const el = track.current
    if (!el) return
    setAtStart(el.scrollLeft < 8)
    setAtEnd(el.scrollLeft + el.clientWidth > el.scrollWidth - 8)
    const card = el.firstElementChild as HTMLElement | null
    if (card) setActive(Math.round(el.scrollLeft / (card.offsetWidth + 16)))
  }, [])

  useEffect(() => {
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [update])

  const scroll = (dir: 1 | -1) => {
    const el = track.current
    const card = el?.firstElementChild as HTMLElement | null
    if (!el || !card) return
    el.scrollBy({ left: dir * (card.offsetWidth + 16), behavior: 'smooth' })
  }

  const goTo = (i: number) => {
    const el = track.current
    const card = el?.children[i] as HTMLElement | undefined
    if (el && card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: 'smooth' })
  }

  return (
    <section aria-labelledby="testimonials-title" className="py-16 md:py-24">
      <div className="container-lux">
        <div className="reveal mb-10 flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-gold-deep">Kind words</p>
            <h2 id="testimonials-title" className="mt-3 text-[2rem] md:text-[2.6rem]">
              What Our Clients Say
            </h2>
            <DemoBadge className="mt-3">Demo testimonials · fictional clients</DemoBadge>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scroll(-1)}
              disabled={atStart}
              aria-label="Previous testimonials"
              className="grid h-11 w-11 place-items-center rounded-full border border-beige text-ink transition-colors hover:border-ink disabled:opacity-35 disabled:hover:border-beige"
            >
              <ArrowLeft size={16} strokeWidth={1.25} />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              disabled={atEnd}
              aria-label="Next testimonials"
              className="grid h-11 w-11 place-items-center rounded-full border border-beige text-ink transition-colors hover:border-ink disabled:opacity-35 disabled:hover:border-beige"
            >
              <ArrowRight size={16} strokeWidth={1.25} />
            </button>
          </div>
        </div>

        <ul
          ref={track}
          onScroll={update}
          aria-label="Client testimonials"
          className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto scroll-smooth px-5 md:mx-0 md:scroll-px-0 md:px-0"
        >
          {testimonials.map((t) => (
            <li
              key={t.name}
              className="flex w-[86%] shrink-0 snap-start flex-col border border-line bg-cream/60 p-7 sm:w-[calc(50%-0.5rem)] md:p-9 lg:w-[calc((100%-2rem)/3)]"
            >
              <div className="flex gap-0.5 text-gold" role="img" aria-label={`Rated ${t.rating} out of 5`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={13} strokeWidth={1.2} className={cx(i < t.rating && 'fill-gold')} aria-hidden="true" />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 font-serif text-[1.3rem] leading-snug text-ink md:text-[1.4rem]">
                “{t.quote}”
              </blockquote>
              <p className="mt-6 text-sm font-medium text-ink">{t.name}</p>
              <p className="text-xs tracking-[0.08em] text-muted">
                {t.clientType} · {t.city}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex justify-center gap-2" aria-label="Choose testimonial" role="group">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show testimonial ${i + 1}`}
              aria-current={i === active}
              className="grid h-6 w-6 place-items-center"
            >
              <span className={cx('block h-1.5 rounded-full transition-all', i === active ? 'w-5 bg-ink' : 'w-1.5 bg-beige')} />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
