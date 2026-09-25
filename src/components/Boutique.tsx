import { Clock, MapPin, Mail, MessageCircle, Navigation, Phone } from 'lucide-react'
import { jewelleryConfig, whatsappLink } from '../config/jewellery'
import { photos } from '../data/images'
import { DemoBadge } from './DemoBadge'
import { Img } from './Img'

/** "Visit Our Boutique" block with demo contact details and working call / WhatsApp / directions actions. */
export function Boutique({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) {
  const H = headingLevel
  const c = jewelleryConfig
  return (
    <section aria-labelledby="boutique-title" className="bg-cream">
      <div className="grid md:grid-cols-[1fr_1.1fr]">
        <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[36rem]">
          <Img photo={photos.palaceRoom} sizes="(min-width: 768px) 48vw, 100vw" className="absolute inset-0" />
        </div>
        <div className="px-6 py-14 md:px-12 lg:px-20 lg:py-20">
          <div className="reveal">
            <p className="eyebrow text-gold-deep">The boutique</p>
            <H id="boutique-title" className="mt-3 text-[2.2rem] md:text-[2.8rem]">
              Visit Our Boutique
            </H>
            <DemoBadge className="mt-3">Demo contact information</DemoBadge>
          </div>
          <dl className="mt-8 grid gap-6 text-[0.95rem] sm:grid-cols-2">
            <div className="flex gap-3">
              <MapPin size={18} strokeWidth={1.2} className="mt-0.5 shrink-0 text-gold-deep" aria-hidden="true" />
              <div>
                <dt className="eyebrow text-[0.6rem] text-muted">Address</dt>
                <dd className="mt-1 text-ink">
                  {c.location.line1}
                  <br />
                  {c.location.city}, {c.location.region}
                </dd>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock size={18} strokeWidth={1.2} className="mt-0.5 shrink-0 text-gold-deep" aria-hidden="true" />
              <div>
                <dt className="eyebrow text-[0.6rem] text-muted">Hours</dt>
                {c.hours.map((h) => (
                  <dd key={h.days} className="mt-1 text-ink">
                    {h.days}: <span className="text-muted">{h.time}</span>
                  </dd>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <Phone size={18} strokeWidth={1.2} className="mt-0.5 shrink-0 text-gold-deep" aria-hidden="true" />
              <div>
                <dt className="eyebrow text-[0.6rem] text-muted">Phone</dt>
                <dd className="mt-1">
                  <a href={c.phoneHref} className="text-ink underline-offset-4 hover:underline">
                    {c.phone}
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex gap-3">
              <Mail size={18} strokeWidth={1.2} className="mt-0.5 shrink-0 text-gold-deep" aria-hidden="true" />
              <div>
                <dt className="eyebrow text-[0.6rem] text-muted">Email</dt>
                <dd className="mt-1">
                  <a href={`mailto:${c.email}`} className="text-ink underline-offset-4 hover:underline">
                    {c.email}
                  </a>
                </dd>
              </div>
            </div>
          </dl>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={c.phoneHref} className="btn btn-dark">
              <Phone size={14} strokeWidth={1.5} aria-hidden="true" /> Call
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <MessageCircle size={14} strokeWidth={1.5} aria-hidden="true" /> WhatsApp
            </a>
            <a href={c.location.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <Navigation size={14} strokeWidth={1.5} aria-hidden="true" /> Directions
            </a>
          </div>
          <p className="mt-5 text-xs text-muted">
            This is a fictional boutique. Phone and WhatsApp use placeholder numbers; directions open a map of {c.location.city}.
          </p>
        </div>
      </div>
    </section>
  )
}
