import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { cx } from '../lib/format'

interface SectionHeadingProps {
  title: ReactNode
  subtitle?: ReactNode
  eyebrow?: string
  action?: { label: string; to: string }
  align?: 'left' | 'center'
  as?: 'h1' | 'h2'
  className?: string
}

export function SectionHeading({ title, subtitle, eyebrow, action, align = 'left', as: Tag = 'h2', className }: SectionHeadingProps) {
  return (
    <div
      className={cx(
        'reveal mb-8 flex gap-4 md:mb-10',
        align === 'center' ? 'flex-col items-center text-center' : 'flex-col md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <div>
        {eyebrow && <p className="eyebrow mb-3 text-gold-deep">{eyebrow}</p>}
        <Tag className="text-[2rem] leading-[1.05] md:text-[2.6rem]">{title}</Tag>
        {subtitle && <p className="mt-2.5 max-w-xl text-[0.95rem] text-muted">{subtitle}</p>}
      </div>
      {action && (
        <Link to={action.to} className="link-arrow shrink-0 self-start md:self-auto">
          {action.label} <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
        </Link>
      )}
    </div>
  )
}
