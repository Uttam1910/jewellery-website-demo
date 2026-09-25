import { Link, useParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Img } from '../components/Img'
import { PageHeader } from '../components/PageHeader'
import { ProductGrid } from '../components/ProductGrid'
import { SectionHeading } from '../components/SectionHeading'
import { collections, getCollection, type Collection } from '../data/collections'
import { products } from '../data/products'
import { useSeo } from '../hooks/useSeo'
import { cx } from '../lib/format'
import NotFound from './NotFound'

export default function CollectionDetail() {
  const { collection: slug } = useParams()
  const collection = getCollection(slug)
  if (!collection) return <NotFound />
  return <CollectionView key={collection.slug} collection={collection} />
}

function CollectionView({ collection }: { collection: Collection }) {
  useSeo(`${collection.name} Collection`, `${collection.summary} A demo collection by AURELIA Fine Jewellery.`)
  const items = products.filter((p) => p.collections.includes(collection.slug))
  const others = collections.filter((c) => c.slug !== collection.slug)
  const dark = collection.tone === 'dark'

  return (
    <>
      <PageHeader eyebrow="The collection" title={collection.name} subtitle={collection.kicker} photo={collection.image} />

      <section className={cx(dark ? 'bg-espresso text-ivory' : 'bg-cream')}>
        <div className="container-lux grid gap-8 py-14 md:grid-cols-[1fr_1.4fr] md:gap-16 md:py-20">
          <p className={cx('eyebrow reveal', dark ? 'text-gold-soft' : 'text-gold-deep')}>About {collection.name}</p>
          <div className="reveal">
            <p className={cx('font-serif text-[1.6rem] leading-snug md:text-[2rem]', dark ? 'text-ivory' : 'text-ink')}>{collection.summary}</p>
            <p className={cx('mt-5 leading-relaxed', dark ? 'text-ivory/75' : 'text-muted')}>{collection.story}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="collection-pieces" className="container-lux py-14 md:py-20">
        <SectionHeading
          title={<span id="collection-pieces">The Pieces</span>}
          subtitle={`${items.length} pieces in ${collection.name}`}
          action={{ label: 'Filter in shop', to: `/shop?collection=${collection.slug}` }}
        />
        <ProductGrid products={items} />
      </section>

      <section aria-labelledby="more-collections" className="border-t border-line py-14 md:py-20">
        <div className="container-lux">
          <SectionHeading title={<span id="more-collections">More Collections</span>} action={{ label: 'All collections', to: '/collections' }} />
          <ul className="no-scrollbar -mx-5 flex snap-x scroll-px-5 gap-4 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-5 md:overflow-visible md:px-0">
            {others.map((c) => (
              <li key={c.slug} className="w-[60%] shrink-0 snap-start md:w-auto">
                <Link to={`/collections/${c.slug}`} className="group block">
                  <div className="aspect-[4/5] overflow-hidden bg-cream">
                    <Img photo={c.image} sizes="(min-width: 768px) 18vw, 60vw" className="img-zoom" alt="" />
                  </div>
                  <span className="mt-3 block font-serif text-xl text-ink">{c.name}</span>
                  <span className="link-arrow">
                    Discover <ArrowRight size={13} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
