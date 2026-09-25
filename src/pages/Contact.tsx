import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays, Mail, MessageCircle, Phone } from 'lucide-react'
import { Boutique } from '../components/Boutique'
import { PageHeader } from '../components/PageHeader'
import { jewelleryConfig, whatsappLink } from '../config/jewellery'
import { useSeo } from '../hooks/useSeo'

export default function Contact() {
  useSeo('Contact', 'Contact AURELIA Fine Jewellery (demo): boutique location, phone, WhatsApp, email and opening hours.')
  const c = jewelleryConfig
  const options = [
    { icon: Phone, title: 'Call us', text: c.phone, href: c.phoneHref, external: false },
    { icon: MessageCircle, title: 'WhatsApp', text: 'Chat with a consultant', href: whatsappLink(), external: true },
    { icon: Mail, title: 'Email', text: c.email, href: `mailto:${c.email}`, external: false },
  ]
  return (
    <>
      <PageHeader eyebrow="We’re here to help" title="Contact" subtitle="Questions about a piece, sizing or a bridal consultation? Reach us however you prefer." />
      <section aria-label="Ways to reach us" className="container-lux pb-14 md:pb-20">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {options.map(({ icon: Icon, title, text, href, external }) => (
            <li key={title}>
              <a
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex h-full flex-col border border-line p-6 transition-colors hover:border-gold"
              >
                <Icon size={22} strokeWidth={1.1} className="text-gold-deep" aria-hidden="true" />
                <span className="mt-5 font-serif text-xl text-ink">{title}</span>
                <span className="mt-1 text-sm text-muted">{text}</span>
              </a>
            </li>
          ))}
          <li>
            <Link to="/appointments#book" className="group flex h-full flex-col bg-ink p-6 text-ivory transition-colors hover:bg-charcoal">
              <CalendarDays size={22} strokeWidth={1.1} className="text-gold-soft" aria-hidden="true" />
              <span className="mt-5 font-serif text-xl">Book an appointment</span>
              <span className="mt-1 inline-flex items-center gap-2 text-sm text-ivory/75">
                In store or virtual <ArrowRight size={13} strokeWidth={1.5} aria-hidden="true" />
              </span>
            </Link>
          </li>
        </ul>
        <p className="mt-4 text-xs text-muted">Demo contact information — phone, WhatsApp and email are placeholders.</p>
      </section>
      <Boutique />
      <section className="container-lux py-14 text-center md:py-20">
        <h2 className="text-[1.8rem]">Looking for quick answers?</h2>
        <Link to="/faq" className="btn btn-outline mt-6">
          Read our FAQs <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
        </Link>
      </section>
    </>
  )
}
