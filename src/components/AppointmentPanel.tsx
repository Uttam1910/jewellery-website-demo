import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { appointmentTypes } from '../data/appointments'
import { photos } from '../data/images'
import { cx } from '../lib/format'
import { Img } from './Img'

/** Visually rich CTA that leads into the appointment flow, optionally preselecting a type. */
export function AppointmentPanel({ title = 'Book a Private Appointment', className }: { title?: string; className?: string }) {
  return (
    <section aria-labelledby="appt-panel-title" className={cx('relative isolate overflow-hidden bg-espresso text-ivory', className)}>
      <div className="absolute inset-0 -z-10">
        <Img photo={photos.palaceArches} sizes="100vw" className="opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(31,24,19,0.55),rgba(31,24,19,0.92))]" />
      </div>
      <div className="container-lux py-20 text-center md:py-28">
        <div className="reveal mx-auto max-w-2xl">
          <p className="eyebrow text-gold-soft">By appointment</p>
          <h2 id="appt-panel-title" className="mt-4 text-[2.4rem] leading-[1.05] text-ivory md:text-[3.2rem]">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-ivory/80">
            Experience our jewellery in person with a personalised consultation.
          </p>
        </div>
        <ul className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {appointmentTypes.map(({ id, short, icon: Icon }, i) => (
            <li key={id} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <Link
                to={`/appointments?type=${id}#book`}
                className="group flex h-full flex-col items-center gap-3 border border-ivory/15 bg-ivory/[0.03] px-3 py-6 transition-colors hover:border-gold-soft/60 hover:bg-ivory/[0.07]"
              >
                <Icon size={24} strokeWidth={1} className="text-gold-soft" aria-hidden="true" />
                <span className="text-[0.8rem] leading-snug tracking-wide text-ivory/90">{short}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/appointments#book" className="btn btn-gold mt-12">
          Book now <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
