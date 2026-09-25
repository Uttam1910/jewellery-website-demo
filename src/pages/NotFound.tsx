import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ProductGrid } from '../components/ProductGrid'
import { products } from '../data/products'
import { useSeo } from '../hooks/useSeo'

const picks = products.filter((p) => p.featured).slice(0, 4)

export default function NotFound() {
  useSeo('Page Not Found', 'The page you were looking for could not be found.')
  return (
    <>
      <section className="container-lux pb-16 pt-36 text-center md:pt-44">
        <p className="font-serif text-[6rem] leading-none text-champagne md:text-[9rem]">404</p>
        <h1 className="mt-2 text-[2.2rem] md:text-[3rem]">This page has gone missing</h1>
        <p className="mx-auto mt-4 max-w-md text-muted">Like a lost earring, it may turn up again. Meanwhile, here are a few pieces we love.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn btn-dark">
            Return home <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
          </Link>
          <Link to="/shop" className="btn btn-outline">
            Shop jewellery
          </Link>
        </div>
      </section>
      <section aria-label="Featured pieces" className="container-lux pb-20">
        <ProductGrid products={picks} />
      </section>
    </>
  )
}
