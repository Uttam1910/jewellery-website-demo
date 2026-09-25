import type { ReactNode } from 'react'
import type { Photo } from '../data/images'
import { cx } from '../lib/format'
import { Img } from './Img'

interface PageHeaderProps {
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  photo?: Photo
  children?: ReactNode
  compact?: boolean
}

/** Inner-page banner: an editorial image band with serif title (reference: "Collections" header), or a plain ivory header. */
export function PageHeader({ eyebrow, title, subtitle, photo, children, compact }: PageHeaderProps) {
  if (!photo) {
    return (
      <header className={cx('container-lux pt-28 md:pt-36', compact ? 'pb-8' : 'pb-10 md:pb-14')}>
        {eyebrow && <p className="eyebrow animate-fade-up text-gold-deep">{eyebrow}</p>}
        <h1 className="mt-3 animate-fade-up text-[2.6rem] leading-[1.02] [animation-delay:80ms] md:text-[3.6rem]">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl animate-fade-up text-muted [animation-delay:160ms] md:text-lg">{subtitle}</p>}
        {children}
      </header>
    )
  }
  return (
    <header className="relative isolate overflow-hidden bg-espresso pt-16 text-ivory md:pt-[4.75rem]">
      <div className="absolute inset-0 -z-10 md:left-[35%]">
        <Img photo={photo} sizes="(min-width: 768px) 65vw, 100vw" priority />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(31,24,19,0.92),rgba(31,24,19,0.45))] md:bg-[linear-gradient(to_right,#1f1813_0%,#1f1813_33%,rgba(31,24,19,0.55)_55%,rgba(31,24,19,0.1)_85%)]"
      />
      <div className="container-lux flex min-h-[18rem] flex-col justify-end py-12 md:min-h-[22rem] md:justify-center md:py-16">
        {eyebrow && <p className="eyebrow animate-fade-up text-gold-soft">{eyebrow}</p>}
        <h1 className="mt-3 max-w-xl animate-fade-up text-[2.8rem] leading-[1.02] text-ivory [animation-delay:80ms] md:text-[4rem]">{title}</h1>
        {subtitle && <p className="mt-4 max-w-md animate-fade-up text-ivory/80 [animation-delay:160ms] md:text-lg">{subtitle}</p>}
        {children}
      </div>
    </header>
  )
}
