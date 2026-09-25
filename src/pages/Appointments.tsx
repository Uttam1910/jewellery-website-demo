import { useSearchParams } from 'react-router-dom'
import { Clock, MapPin } from 'lucide-react'
import { AppointmentForm } from '../components/AppointmentForm'
import { DemoBadge } from '../components/DemoBadge'
import { PageHeader } from '../components/PageHeader'
import { jewelleryConfig } from '../config/jewellery'
import { appointmentTypes, isAppointmentType } from '../data/appointments'
import { photos } from '../data/images'
import { useSeo } from '../hooks/useSeo'

export default function Appointments() {
  useSeo('Book an Appointment', 'Request a private jewellery appointment (demo): in-store, virtual, bridal styling or bespoke design.')
  const [params] = useSearchParams()
  const type = params.get('type')
  const initialType = isAppointmentType(type) ? type : undefined

  return (
    <>
      <PageHeader
        eyebrow="By appointment"
        title="Book an Appointment"
        subtitle="Experience our jewellery in person with a personalised consultation."
        photo={photos.palaceArches}
      />
      <section className="container-lux grid gap-12 py-14 md:py-20 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div className="space-y-10">
          <div>
            <h2 className="text-[2rem]">A private viewing, your way</h2>
            <p className="mt-3 leading-relaxed text-muted">
              Choose how you would like to meet us. Our consultants will prepare pieces in advance based on your notes.
            </p>
            <DemoBadge className="mt-4">Demo — no booking is made</DemoBadge>
          </div>
          <ul className="space-y-5">
            {appointmentTypes.map(({ id, label, description, icon: Icon }) => (
              <li key={id} className="flex gap-4">
                <Icon size={22} strokeWidth={1.1} className="mt-1 shrink-0 text-gold-deep" aria-hidden="true" />
                <div>
                  <p className="font-serif text-xl text-ink">{label}</p>
                  <p className="text-sm text-muted">{description}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="space-y-3 border-t border-line pt-8 text-sm">
            <p className="flex gap-3">
              <MapPin size={16} strokeWidth={1.2} className="mt-0.5 shrink-0 text-gold-deep" aria-hidden="true" />
              <span className="text-ink">{jewelleryConfig.location.full}</span>
            </p>
            {jewelleryConfig.hours.map((h) => (
              <p key={h.days} className="flex gap-3">
                <Clock size={16} strokeWidth={1.2} className="mt-0.5 shrink-0 text-gold-deep" aria-hidden="true" />
                <span>
                  <span className="text-ink">{h.days}</span> <span className="text-muted">· {h.time}</span>
                </span>
              </p>
            ))}
          </div>
        </div>
        <div id="book" className="scroll-mt-28">
          <AppointmentForm initialType={initialType} />
        </div>
      </section>
    </>
  )
}
