import { Link } from 'react-router-dom'
import { jewelleryConfig } from '../config/jewellery'
import { cx } from '../lib/format'

export function Logo({ light, className, onClick }: { light?: boolean; className?: string; onClick?: () => void }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label={`${jewelleryConfig.brand} ${jewelleryConfig.descriptor} — home`}
      className={cx('inline-flex flex-col items-center leading-none', className)}
    >
      <span className={cx('font-serif text-[1.65rem] tracking-[0.14em]', light ? 'text-ivory' : 'text-ink')}>
        {jewelleryConfig.brand}
      </span>
      <span className={cx('mt-1 text-[0.5rem] tracking-[0.42em]', light ? 'text-ivory/80' : 'text-muted')}>
        {jewelleryConfig.descriptor}
      </span>
    </Link>
  )
}
