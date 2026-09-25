import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import Home from './pages/Home'
const Shop = lazy(() => import('./pages/Shop'))
const ProductPage = lazy(() => import('./pages/Product'))
const Bridal = lazy(() => import('./pages/Bridal'))
const Collections = lazy(() => import('./pages/Collections'))
const CollectionDetail = lazy(() => import('./pages/CollectionDetail'))
const OurStory = lazy(() => import('./pages/OurStory'))
const Appointments = lazy(() => import('./pages/Appointments'))
const Contact = lazy(() => import('./pages/Contact'))
const InfoPage = lazy(() => import('./pages/InfoPage'))
const FAQ = lazy(() => import('./pages/FAQ'))
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen" aria-busy="true" />}>
      <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="collections" element={<Collections />} />
        <Route path="collections/:collection" element={<CollectionDetail />} />
        <Route path="bridal" element={<Bridal />} />
        <Route path="shop" element={<Shop />} />
        <Route path="product/:slug" element={<ProductPage />} />
        <Route path="our-story" element={<OurStory />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<InfoPage page="privacy" />} />
        <Route path="terms" element={<InfoPage page="terms" />} />
        <Route path="shipping" element={<InfoPage page="shipping" />} />
        <Route path="returns" element={<InfoPage page="returns" />} />
        <Route path="care" element={<InfoPage page="care" />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="404" element={<NotFound />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      </Routes>
    </Suspense>
  )
}
