import { useEffect, useState } from 'react'

/**
 * Keeps an overlay mounted long enough to play its exit transition.
 * Returns [mounted, visible].
 */
export function usePresence(open: boolean, duration = 320): [boolean, boolean] {
  const [mounted, setMounted] = useState(open)
  const [visible, setVisible] = useState(false)

  // Mount immediately when opened (adjusting state during render, not in an effect)
  if (open && !mounted) setMounted(true)

  useEffect(() => {
    if (open) {
      // Two frames so the hidden state paints before transitioning in
      let inner = 0
      const outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(() => setVisible(true))
      })
      return () => {
        cancelAnimationFrame(outer)
        cancelAnimationFrame(inner)
      }
    }
    const hide = requestAnimationFrame(() => setVisible(false))
    const unmount = window.setTimeout(() => setMounted(false), duration)
    return () => {
      cancelAnimationFrame(hide)
      window.clearTimeout(unmount)
    }
  }, [open, duration])

  return [mounted, visible]
}
