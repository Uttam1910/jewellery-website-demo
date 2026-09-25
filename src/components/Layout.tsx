import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { Footer } from './Footer'
import { MobileBar } from './MobileBar'
import { MobileMenu } from './MobileMenu'
import { Navbar } from './Navbar'
import { QuickView } from './QuickView'
import { SearchOverlay } from './SearchOverlay'
import { ShoppingBag } from './ShoppingBag'
import { Toast } from './Toast'
import { WishlistDrawer } from './WishlistDrawer'
import { useStore } from '../context/store'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  const { closePanel, closeQuickView } = useStore()

  // Close any open overlay when the route changes
  useEffect(() => {
    closePanel()
    closeQuickView()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (hash) {
      const t = window.setTimeout(() => {
        const el = document.getElementById(hash.slice(1))
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 90
          window.scrollTo({ top, behavior: 'smooth' })
        }
      }, 60)
      return () => window.clearTimeout(t)
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

export function Layout() {
  useReveal()
  return (
    <>
      <ScrollManager />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
      <MobileBar />
      <ShoppingBag />
      <WishlistDrawer />
      <SearchOverlay />
      <MobileMenu />
      <QuickView />
      <Toast />
    </>
  )
}
