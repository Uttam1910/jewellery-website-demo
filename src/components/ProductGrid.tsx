import type { Product } from '../data/products'
import { cx } from '../lib/format'
import { ProductCard } from './ProductCard'

export function ProductGrid({ products, className, columns = 4 }: { products: Product[]; className?: string; columns?: 3 | 4 }) {
  return (
    <ul
      className={cx(
        'grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 md:grid-cols-3 md:gap-y-12',
        columns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3',
        className,
      )}
    >
      {products.map((p) => (
        <li key={p.slug}>
          <ProductCard product={p} sizes={columns === 4 ? '(min-width: 1024px) 22vw, (min-width: 768px) 31vw, 48vw' : '(min-width: 768px) 30vw, 48vw'} />
        </li>
      ))}
    </ul>
  )
}
