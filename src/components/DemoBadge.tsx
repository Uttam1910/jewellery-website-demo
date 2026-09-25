import { jewelleryConfig } from '../config/jewellery'
import { cx } from '../lib/format'

/** Small inline note marking fictional content. Hidden when demo labels are turned off in config. */
export function DemoBadge({ children = 'Demo content', light, className }: { children?: string; light?: boolean; className?: string }) {
  if (!jewelleryConfig.showDemoLabels) return null
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 border px-2 py-0.5 text-[0.625rem] font-medium tracking-[0.16em] uppercase',
        light ? 'border-ivory/30 text-ivory/75' : 'border-beige text-muted',
        className,
      )}
    >
      <span aria-hidden="true" className={cx('h-1 w-1 rounded-full', light ? 'bg-gold-soft' : 'bg-gold')} />
      {children}
    </span>
  )
}
