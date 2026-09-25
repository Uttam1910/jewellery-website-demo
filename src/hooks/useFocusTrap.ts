import { useEffect, type RefObject } from 'react'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

let lockCount = 0

/**
 * Accessible dialog behaviour: moves focus inside, traps Tab, closes on Escape,
 * locks page scroll and restores focus to the trigger when closed.
 */
export function useFocusTrap(ref: RefObject<HTMLElement | null>, active: boolean, onClose: () => void, initialFocus?: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!active) return
    const previous = document.activeElement as HTMLElement | null
    const node = ref.current

    const focusFirst = () => {
      const target = initialFocus?.current ?? node?.querySelector<HTMLElement>(FOCUSABLE) ?? node
      target?.focus({ preventScroll: true })
    }
    const raf = requestAnimationFrame(focusFirst)

    lockCount += 1
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !node) return
      const items = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null)
      if (items.length === 0) {
        e.preventDefault()
        return
      }
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('keydown', onKey)
      lockCount -= 1
      if (lockCount === 0) {
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
      }
      if (previous && document.contains(previous)) previous.focus({ preventScroll: true })
    }
    // onClose is intentionally excluded: callers pass inline functions
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])
}
