import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { photos, type Photo } from '../data/images'
import { cx } from '../lib/format'
import { Img } from './Img'

interface Slide {
  eyebrow: string
  title: string[]
  copy: string
  cta: { label: string; to: string }
  photo: Photo
}

const slides: Slide[] = [
  {
    eyebrow: 'The Bridal Edit',
    title: ['Jewellery', 'That Tells', 'Your Story'],
    copy: 'Timeless pieces for life’s most beautiful moments.',
    cta: { label: 'Explore Collections', to: '/collections' },
    photo: photos.heroBridal,
  },
  {
    eyebrow: 'Fine Jewellery',
    title: ['Radiance,', 'Set by Hand'],
    copy: 'Polki and emerald pieces finished by master karigars, the way they always have been.',
    cta: { label: 'Explore Polki', to: '/collections/polki' },
    photo: photos.heroFine,
  },
  {
    eyebrow: 'Contemporary',
    title: ['Heritage,', 'Worn Lightly'],
    copy: 'Contemporary Indian jewellery for every day between the celebrations.',
    cta: { label: 'Shop Contemporary', to: '/collections/contemporary' },
    photo: photos.heroContemporary,
  },
]

const INTERVAL = 7000

export function Hero() {
  const [index, setIndex] = useState(0)
  const [hoverPaused, setHoverPaused] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const touchX = useRef<number | null>(null)
  const paused = hoverPaused || userPaused

  const go = useCallback((i: number) => setIndex((i + slides.length) % slides.length), [])
  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), [])
  const prev = useCallback(() => setIndex((i) => (i - 1 + slides.length) % slides.length), [])

  // Autoplay that resumes with the remaining time after a pause, in step with the progress bar
  const remaining = useRef(INTERVAL)
  useEffect(() => {
    remaining.current = INTERVAL
  }, [index])
  useEffect(() => {
    if (paused) return
    const started = Date.now()
    const t = window.setTimeout(next, remaining.current)
    return () => {
      window.clearTimeout(t)
      remaining.current = Math.max(0, remaining.current - (Date.now() - started))
    }
  }, [index, paused, next])

  const onBlur = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHoverPaused(false)
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured collections"
      className="relative isolate overflow-hidden bg-espresso text-ivory"
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocus={() => setHoverPaused(true)}
      onBlur={onBlur}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 50) (dx < 0 ? next : prev)()
        touchX.current = null
      }}
    >
      <div className="relative h-[calc(100svh-3.5rem)] max-h-[56rem] min-h-[36rem] md:h-[min(100svh,54rem)] md:min-h-[40rem]">
        {slides.map((s, i) => (
          <div
            key={s.eyebrow}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
            aria-hidden={i !== index}
            inert={i !== index}
            className={cx(
              'absolute inset-0 transition-opacity duration-[1400ms] ease-[var(--ease-lux)]',
              i === index ? 'z-10 opacity-100' : 'z-0 opacity-0',
            )}
          >
            {/* Photograph: full-bleed on mobile, right-hand editorial panel on desktop */}
            <div className="absolute inset-0 md:left-[34%]">
              <div className={cx('h-full w-full transition-transform duration-[8000ms] ease-out', i === index ? 'scale-100' : 'scale-[1.04]')}>
                <Img photo={s.photo} sizes="(min-width: 768px) 66vw, 100vw" priority={i === 0} />
              </div>
            </div>
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_top,rgba(31,24,19,0.97)_0%,rgba(31,24,19,0.8)_34%,rgba(31,24,19,0.25)_62%,rgba(31,24,19,0.4)_100%)] md:bg-[linear-gradient(to_right,#1f1813_0%,#1f1813_32%,rgba(31,24,19,0.7)_46%,rgba(31,24,19,0)_68%)]"
            />

            <div className="container-lux relative flex h-full flex-col justify-end pb-28 md:justify-center md:pb-0">
              {i === index && (
                <div key={index} className="max-w-[34rem]">
                  <p className="eyebrow animate-fade-up text-gold-soft">{s.eyebrow}</p>
                  {(() => {
                    const Heading = i === 0 ? 'h1' : 'h2'
                    return (
                      <Heading className="mt-4 animate-fade-up font-serif text-[3.1rem] leading-[0.98] text-ivory [animation-delay:120ms] sm:text-[4rem] lg:text-[5.1rem]">
                        {s.title.map((line) => (
                          <span key={line} className="block">
                            {line}{' '}
                          </span>
                        ))}
                      </Heading>
                    )
                  })()}
                  <p className="mt-5 max-w-sm animate-fade-up text-[0.95rem] leading-relaxed text-ivory/85 [animation-delay:240ms] md:text-base">
                    {s.copy}
                  </p>
                  <Link to={s.cta.to} className="btn btn-gold mt-8 animate-fade-up [animation-delay:360ms]">
                    {s.cta.label} <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Controls */}
        <div className="container-lux absolute inset-x-0 bottom-8 z-20 flex items-center justify-between md:bottom-12">
          <div className="flex items-center gap-1" role="tablist" aria-label="Choose slide">
            {slides.map((s, i) => (
              <button
                key={s.eyebrow}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Slide ${i + 1}: ${s.eyebrow}`}
                onClick={() => go(i)}
                className="group flex h-10 items-center gap-3 pr-2 text-xs tracking-[0.2em] tabular-nums"
              >
                <span className={cx('transition-colors', i === index ? 'text-ivory' : 'text-ivory/55 group-hover:text-ivory')}>
                  0{i + 1}
                </span>
                <span className={cx('relative h-px overflow-hidden bg-ivory/25 transition-all duration-500', i === index ? 'w-12 md:w-16' : 'w-4')}>
                  {i === index && (
                    <span
                      key={index}
                      className="absolute inset-y-0 left-0 bg-gold-soft"
                      style={{
                        animation: `hero-progress ${INTERVAL}ms linear forwards`,
                        animationPlayState: paused ? 'paused' : 'running',
                      }}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setUserPaused((p) => !p)}
              aria-label={userPaused ? 'Play slideshow' : 'Pause slideshow'}
              className="grid h-10 w-10 place-items-center text-ivory/75 transition-colors hover:text-ivory"
            >
              {userPaused ? <Play size={14} strokeWidth={1.5} /> : <Pause size={14} strokeWidth={1.5} />}
            </button>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className="grid h-10 w-10 place-items-center rounded-full border border-ivory/40 text-ivory transition-colors hover:bg-ivory hover:text-ink"
            >
              <ChevronLeft size={16} strokeWidth={1.25} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="grid h-10 w-10 place-items-center rounded-full border border-ivory/40 text-ivory transition-colors hover:bg-ivory hover:text-ink"
            >
              <ChevronRight size={16} strokeWidth={1.25} />
            </button>
          </div>
        </div>
      </div>
      <style>{`@keyframes hero-progress { from { width: 0 } to { width: 100% } }`}</style>
    </section>
  )
}
