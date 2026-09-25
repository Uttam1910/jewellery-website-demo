import type { ReactNode } from 'react'
import { jewelleryConfig } from '../config/jewellery'
import { useStore } from '../context/store'
import { cx } from '../lib/format'

const icons: Record<'instagram' | 'facebook' | 'pinterest', ReactNode> = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-[18px] w-[18px]" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden="true">
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9Z" />
    </svg>
  ),
  pinterest: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden="true">
      <path d="M12 2.5a9.5 9.5 0 0 0-3.5 18.3c-.1-.8-.1-2 .1-2.8l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.5 1.8-2.5.9 0 1.3.7 1.3 1.5 0 .9-.6 2.2-.9 3.4-.2 1 .5 1.9 1.6 1.9 1.9 0 3.3-2 3.3-4.9 0-2.6-1.8-4.3-4.5-4.3-3 0-4.8 2.3-4.8 4.6 0 .9.4 1.9.8 2.4l.1.4-.3 1.1c0 .2-.2.2-.4.1-1.3-.6-2.1-2.5-2.1-4 0-3.3 2.4-6.3 6.9-6.3 3.6 0 6.4 2.6 6.4 6 0 3.6-2.3 6.5-5.4 6.5-1.1 0-2.1-.6-2.4-1.2l-.7 2.5c-.2.9-.9 2.1-1.3 2.8A9.5 9.5 0 1 0 12 2.5Z" />
    </svg>
  ),
}

const labels = { instagram: 'Instagram', facebook: 'Facebook', pinterest: 'Pinterest' }

/**
 * Social profile links. While demo labels are on, the fictional profiles are not linked out —
 * the button explains that instead, so visitors are never sent to someone else's account.
 */
export function SocialLink({ network, className, children }: { network: keyof typeof icons; className?: string; children?: ReactNode }) {
  const { notify } = useStore()
  const content = children ?? icons[network]
  const label = children ? undefined : `${labels[network]} (demo profile)`
  if (jewelleryConfig.showDemoLabels) {
    return (
      <button
        type="button"
        aria-label={label}
        onClick={() => notify(`Demo profile — ${labels[network]} isn’t live for this fictional brand.`)}
        className={className}
      >
        {content}
      </button>
    )
  }
  return (
    <a href={jewelleryConfig[network]} target="_blank" rel="noopener noreferrer" aria-label={label} className={className}>
      {content}
    </a>
  )
}

export function SocialIcons({ className }: { className?: string }) {
  return (
    <div className={cx('flex items-center gap-1', className)}>
      {(Object.keys(icons) as (keyof typeof icons)[]).map((n) => (
        <SocialLink key={n} network={n} className="grid h-10 w-10 place-items-center text-ivory/75 transition-colors hover:text-gold-soft" />
      ))}
    </div>
  )
}
