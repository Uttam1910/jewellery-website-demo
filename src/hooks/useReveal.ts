import { useEffect } from 'react'

/** Fades in any `.reveal` element as it enters the viewport (once). */
export function useReveal() {
  useEffect(() => {
    const root = document.documentElement
    if (!('IntersectionObserver' in window)) return
    root.classList.add('reveal-ready')

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    const scan = () => document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => io.observe(el))
    scan()
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])
}
