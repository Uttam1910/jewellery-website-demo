import { useId, useRef, useState, type FormEvent } from 'react'
import { ArrowRight, CalendarCheck } from 'lucide-react'
import { jewelleryConfig } from '../config/jewellery'
import { appointmentTypes, type AppointmentTypeId } from '../data/appointments'
import { cx } from '../lib/format'

interface FormState {
  name: string
  phone: string
  email: string
  date: string
  time: string
  type: AppointmentTypeId | ''
  message: string
}

type Errors = Partial<Record<keyof FormState, string>>

const toISO = (d: Date) => {
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 10)
}

function validate(f: FormState): Errors {
  const e: Errors = {}
  const today = toISO(new Date())
  const max = toISO(new Date(Date.now() + 180 * 86400000))
  if (f.name.trim().length < 2) e.name = 'Please enter your name.'
  const digits = f.phone.replace(/\D/g, '')
  if (digits.length < 10 || digits.length > 13) e.phone = 'Please enter a valid 10-digit mobile number.'
  if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) e.email = 'Please enter a valid email address.'
  if (!f.date) e.date = 'Please choose a preferred date.'
  else if (f.date < today) e.date = 'Please choose a date from today onwards.'
  else if (f.date > max) e.date = 'Appointments can be requested up to six months ahead.'
  if (!f.time) e.time = 'Please choose a preferred time.'
  if (!f.type) e.type = 'Please select an appointment type.'
  if (f.message.length > 600) e.message = 'Please keep your message under 600 characters.'
  return e
}

const order: (keyof FormState)[] = ['type', 'name', 'phone', 'email', 'date', 'time', 'message']

export function AppointmentForm({ initialType }: { initialType?: AppointmentTypeId }) {
  const uid = useId()
  const id = (k: string) => `${uid}-${k}`
  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    type: initialType ?? '',
    message: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState<FormState | null>(null)
  const confirmRef = useRef<HTMLDivElement>(null)

  // Follow a new ?type= preselection (e.g. clicking another option in the panel above)
  const [lastInitial, setLastInitial] = useState(initialType)
  if (initialType !== lastInitial) {
    setLastInitial(initialType)
    if (initialType) setForm((f) => ({ ...f, type: initialType }))
  }

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((f) => ({ ...f, [k]: v }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const submit = (ev: FormEvent) => {
    ev.preventDefault()
    const e = validate(form)
    setErrors(e)
    const first = order.find((k) => e[k])
    if (first) {
      const el = first === 'type' ? document.querySelector<HTMLInputElement>(`input[name="${id('type')}"]`) : document.getElementById(id(first))
      el?.focus()
      return
    }
    setSubmitted(form)
    requestAnimationFrame(() => confirmRef.current?.focus())
  }

  if (submitted) {
    const type = appointmentTypes.find((t) => t.id === submitted.type)
    const date = new Date(`${submitted.date}T00:00:00`).toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    return (
      <div ref={confirmRef} tabIndex={-1} className="animate-fade-up border border-line bg-ivory p-8 text-center outline-none md:p-12" role="status">
        <CalendarCheck size={40} strokeWidth={1} className="mx-auto text-gold" aria-hidden="true" />
        <h3 className="mt-5 text-[2rem] leading-tight">Appointment Request Received</h3>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Thank you, {submitted.name.trim().split(' ')[0]}. Your appointment request has been received for this demo.
        </p>
        <dl className="mx-auto mt-8 grid max-w-md gap-3 border-y border-line py-6 text-left text-sm">
          {[
            ['Appointment', type?.label],
            ['Date', date],
            ['Time', submitted.time],
            ['Contact', `${submitted.email} · ${submitted.phone}`],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-6">
              <dt className="text-muted">{k}</dt>
              <dd className="text-right text-ink">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mx-auto mt-6 max-w-md bg-cream px-4 py-3 text-sm font-medium text-ink">
          Demo website — no real appointment has been booked.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(null)
            setForm({ name: '', phone: '', email: '', date: '', time: '', type: '', message: '' })
          }}
          className="btn btn-outline mt-8"
        >
          Request another appointment
        </button>
      </div>
    )
  }

  const err = (k: keyof FormState) =>
    errors[k] ? (
      <p id={id(`${k}-err`)} className="mt-1.5 text-xs text-ruby">
        {errors[k]}
      </p>
    ) : null

  const aria = (k: keyof FormState) => ({
    'aria-invalid': !!errors[k],
    'aria-describedby': errors[k] ? id(`${k}-err`) : undefined,
  })

  const label = 'mb-1.5 block text-[0.7rem] font-medium tracking-[0.14em] text-charcoal uppercase'

  return (
    <form onSubmit={submit} noValidate className="border border-line bg-ivory p-6 md:p-10">
      <fieldset aria-describedby={errors.type ? id('type-err') : undefined}>
        <legend className={label}>
          Appointment type <span aria-hidden="true">*</span>
        </legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {appointmentTypes.map(({ id: typeId, label: typeLabel, description, duration, icon: Icon }) => {
            const checked = form.type === typeId
            return (
              <label
                key={typeId}
                className={cx(
                  'relative flex cursor-pointer gap-3.5 border p-4 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold',
                  checked ? 'border-ink bg-cream' : 'border-beige hover:border-gold',
                )}
              >
                <input
                  type="radio"
                  name={id('type')}
                  value={typeId}
                  checked={checked}
                  onChange={() => set('type', typeId)}
                  className="sr-only"
                />
                <Icon size={22} strokeWidth={1.1} className="mt-0.5 shrink-0 text-gold-deep" aria-hidden="true" />
                <span>
                  <span className="block font-serif text-lg leading-tight text-ink">{typeLabel}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted">{description}</span>
                  <span className="mt-1.5 block text-[0.65rem] tracking-[0.14em] text-gold-deep uppercase">{duration}</span>
                </span>
                <span
                  aria-hidden="true"
                  className={cx('absolute right-3 top-3 h-3.5 w-3.5 rounded-full border', checked ? 'border-ink bg-ink ring-2 ring-inset ring-ivory' : 'border-beige')}
                />
              </label>
            )
          })}
        </div>
        {err('type')}
      </fieldset>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={id('name')} className={label}>
            Name <span aria-hidden="true">*</span>
          </label>
          <input id={id('name')} className="field" autoComplete="name" value={form.name} onChange={(e) => set('name', e.target.value)} {...aria('name')} />
          {err('name')}
        </div>
        <div>
          <label htmlFor={id('phone')} className={label}>
            Phone <span aria-hidden="true">*</span>
          </label>
          <input
            id={id('phone')}
            className="field"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+91"
            value={form.phone}
            onChange={(e) => set('phone', e.target.value)}
            {...aria('phone')}
          />
          {err('phone')}
        </div>
        <div>
          <label htmlFor={id('email')} className={label}>
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id={id('email')}
            className="field"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            {...aria('email')}
          />
          {err('email')}
        </div>
        <div>
          <label htmlFor={id('date')} className={label}>
            Preferred date <span aria-hidden="true">*</span>
          </label>
          <input
            id={id('date')}
            className="field"
            type="date"
            min={toISO(new Date())}
            value={form.date}
            onChange={(e) => set('date', e.target.value)}
            {...aria('date')}
          />
          {err('date')}
        </div>
        <div>
          <label htmlFor={id('time')} className={label}>
            Preferred time <span aria-hidden="true">*</span>
          </label>
          <select id={id('time')} className="field appearance-none" value={form.time} onChange={(e) => set('time', e.target.value)} {...aria('time')}>
            <option value="">Select a time</option>
            {jewelleryConfig.appointmentSlots.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {err('time')}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={id('message')} className={label}>
            Message <span className="font-normal normal-case tracking-normal text-muted">(optional)</span>
          </label>
          <textarea
            id={id('message')}
            className="field min-h-28 resize-y"
            placeholder="Tell us about the occasion, pieces you love, or your wedding dates."
            value={form.message}
            onChange={(e) => set('message', e.target.value)}
            {...aria('message')}
          />
          {err('message')}
        </div>
      </div>

      <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">Demo website — requests are not sent or stored.</p>
        <button type="submit" className="btn btn-dark w-full sm:w-auto">
          Request appointment <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
    </form>
  )
}
