import { useId, useRef, type ReactNode, type RefObject } from 'react'
import { X } from 'lucide-react'
import { usePresence } from '../hooks/usePresence'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { cx } from '../lib/format'

interface OverlayProps {
  open: boolean
  onClose: () => void
  title: ReactNode
  /** Visually hide the title (still announced to screen readers) */
  hideTitle?: boolean
  variant?: 'drawer-right' | 'drawer-left' | 'modal' | 'top'
  children: ReactNode
  footer?: ReactNode
  className?: string
  initialFocus?: RefObject<HTMLElement | null>
  headerExtra?: ReactNode
}

/** Accessible dialog used for drawers (bag, wishlist, menu), search and modals. */
export function Overlay({
  open,
  onClose,
  title,
  hideTitle,
  variant = 'drawer-right',
  children,
  footer,
  className,
  initialFocus,
  headerExtra,
}: OverlayProps) {
  const [mounted, visible] = usePresence(open)
  const panelRef = useRef<HTMLDivElement>(null)
  const titleId = useId()
  useFocusTrap(panelRef, open, onClose, initialFocus)

  if (!mounted) return null

  const panelPosition = {
    'drawer-right': 'right-0 top-0 h-full w-full max-w-[26rem]',
    'drawer-left': 'left-0 top-0 h-full w-[88%] max-w-[22rem]',
    modal: 'left-1/2 top-1/2 w-[calc(100%-2rem)] max-w-5xl max-h-[calc(100dvh-2rem)] -translate-x-1/2 -translate-y-1/2',
    top: 'left-0 top-0 w-full max-h-[100dvh]',
  }[variant]

  const hidden = {
    'drawer-right': 'translate-x-full',
    'drawer-left': '-translate-x-full',
    modal: 'opacity-0 scale-[0.98]',
    top: '-translate-y-6 opacity-0',
  }[variant]

  const shown = variant === 'modal' ? 'opacity-100 scale-100' : 'translate-x-0 translate-y-0 opacity-100'

  return (
    <div className="fixed inset-0 z-[70]" role="presentation">
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cx(
          'absolute inset-0 bg-ink/45 backdrop-blur-[2px] transition-opacity duration-300',
          visible ? 'opacity-100' : 'opacity-0',
        )}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={cx(
          'absolute flex flex-col bg-ivory shadow-[0_20px_60px_-20px_rgba(23,19,15,0.45)] outline-none transition-all duration-[400ms] ease-[var(--ease-lux)]',
          panelPosition,
          visible ? shown : hidden,
          className,
        )}
      >
        <div
          className={cx(
            'flex items-center justify-between gap-4 px-6 pt-5',
            hideTitle ? 'absolute right-0 top-0 z-10' : 'border-b border-line pb-4',
          )}
        >
          <h2 id={titleId} className={cx('font-serif text-2xl', hideTitle && 'sr-only')}>
            {title}
          </h2>
          <div className="flex items-center gap-2">
            {headerExtra}
            <button
              type="button"
              onClick={onClose}
              className="-mr-2 grid h-10 w-10 place-items-center text-ink transition-colors hover:text-gold-deep"
              aria-label="Close"
            >
              <X size={20} strokeWidth={1.25} />
            </button>
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>
        {footer}
      </div>
    </div>
  )
}
