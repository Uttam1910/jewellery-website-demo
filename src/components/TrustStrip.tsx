import { Gem, HandHeart, Infinity as InfinityIcon, Leaf } from 'lucide-react'
import { jewelleryConfig } from '../config/jewellery'

const values = [
  { icon: HandHeart, title: 'Exquisite Craftsmanship', text: 'Handcrafted with love' },
  { icon: Leaf, title: 'Ethical Sourcing', text: 'Responsibly chosen' },
  { icon: Gem, title: 'Bespoke Designs', text: 'Made for your story' },
  { icon: InfinityIcon, title: 'Lifetime Care', text: 'Because memories last' },
]

export function TrustStrip() {
  return (
    <section aria-label="Our promise" className="border-b border-line bg-ivory">
      <div className="container-lux">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-7 py-9 md:py-10 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, text }) => (
            <li key={title} className="reveal flex items-center gap-3.5 md:gap-4 lg:justify-center">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-champagne text-gold">
                <Icon size={19} strokeWidth={1.1} aria-hidden="true" />
              </span>
              <span>
                <span className="eyebrow block text-[0.625rem] text-ink">{title}</span>
                <span className="mt-1 block text-[0.8rem] text-muted">{text}</span>
              </span>
            </li>
          ))}
        </ul>
        {jewelleryConfig.showDemoLabels && (
          <p className="-mt-3 pb-5 text-center text-[0.65rem] tracking-[0.12em] text-muted/80 uppercase">
            Illustrative brand commitments · demo content
          </p>
        )}
      </div>
    </section>
  )
}
