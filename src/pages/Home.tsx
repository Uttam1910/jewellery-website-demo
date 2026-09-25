import { AppointmentPanel } from '../components/AppointmentPanel'
import { Boutique } from '../components/Boutique'
import { BridalBanner } from '../components/BridalBanner'
import { CategoryGrid } from '../components/CategoryGrid'
import { Craftsmanship } from '../components/Craftsmanship'
import { Hero } from '../components/Hero'
import { InstagramGrid } from '../components/InstagramGrid'
import { ProductGrid } from '../components/ProductGrid'
import { SectionHeading } from '../components/SectionHeading'
import { Testimonials } from '../components/Testimonials'
import { TrustStrip } from '../components/TrustStrip'
import { getProduct, newArrivalSlugs } from '../data/products'
import { useSeo } from '../hooks/useSeo'

const newArrivals = newArrivalSlugs.map((s) => getProduct(s)!)

export default function Home() {
  useSeo(
    '',
    'AURELIA Fine Jewellery (demo): luxury Indian bridal, polki, kundan and emerald jewellery. Timeless pieces for life’s most beautiful moments.',
  )
  return (
    <>
      <Hero />
      <TrustStrip />
      <CategoryGrid />
      <BridalBanner />
      <section aria-labelledby="new-arrivals" className="py-16 md:py-24">
        <div className="container-lux">
          <SectionHeading title={<span id="new-arrivals">New Arrivals</span>} action={{ label: 'View All', to: '/shop?sort=newest' }} />
          <ProductGrid products={newArrivals} />
        </div>
      </section>
      <Craftsmanship />
      <Testimonials />
      <AppointmentPanel />
      <div className="pt-16 md:pt-24">
        <InstagramGrid />
      </div>
      <Boutique />
    </>
  )
}
