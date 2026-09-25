import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { faqs } from '../data/pages'
import { useSeo } from '../hooks/useSeo'

export default function FAQ() {
  useSeo('FAQs', 'Frequently asked questions about the AURELIA Fine Jewellery demo website, polki, kundan and appointments.')
  return (
    <>
      <PageHeader eyebrow="Customer care" title="Frequently Asked Questions" subtitle="Everything you might want to know about this demo and our jewellery." compact />
      <div className="container-lux pb-20 md:pb-28">
        <div className="max-w-3xl divide-y divide-line border-y border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-serif text-xl text-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus size={18} strokeWidth={1.25} className="shrink-0 text-gold-deep transition-transform duration-300 group-open:rotate-45" aria-hidden="true" />
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-10 text-muted">
          Still have a question?{' '}
          <Link to="/contact" className="text-ink underline underline-offset-4">
            Contact us
          </Link>{' '}
          or{' '}
          <Link to="/appointments" className="text-ink underline underline-offset-4">
            book an appointment
          </Link>
          .
        </p>
      </div>
    </>
  )
}
