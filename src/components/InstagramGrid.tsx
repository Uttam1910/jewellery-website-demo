import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { jewelleryConfig } from '../config/jewellery'
import { instagramTiles } from '../data/instagram'
import { DemoBadge } from './DemoBadge'
import { Img } from './Img'
import { SocialLink } from './SocialLinks'

const tileLinks = ['/collections/polki', '/product/emerald-drop-earrings', '/bridal', '/our-story', '/collections/emerald', '/product/ruby-heritage-ring']

export function InstagramGrid() {
  return (
    <section aria-labelledby="insta-title" className="pb-16 md:pb-24">
      <div className="container-lux reveal mb-8 text-center">
        <p className="eyebrow text-gold-deep">Follow our journey</p>
        <h2 id="insta-title" className="mt-3 text-[1.9rem] md:text-[2.3rem]">
          {jewelleryConfig.instagramHandle}
        </h2>
        <DemoBadge className="mt-3">Demo handle</DemoBadge>
      </div>
      <ul className="grid grid-cols-3 gap-1 md:grid-cols-6">
        {instagramTiles.map((t, i) => (
          <li key={t.caption}>
            <Link to={tileLinks[i]} className="group relative block aspect-square overflow-hidden bg-cream">
              <Img photo={t.photo} sizes="(min-width: 768px) 17vw, 33vw" className="img-zoom" alt={t.photo.alt} />
              <span className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 to-transparent p-3 text-left text-xs text-ivory opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                {t.caption}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-8 text-center">
        <SocialLink network="instagram" className="btn btn-outline">
          Follow on Instagram <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
        </SocialLink>
      </div>
    </section>
  )
}
