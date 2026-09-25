import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2, Lock, ShoppingBag as BagIcon, Trash2 } from 'lucide-react'
import { useStore, type BagItem } from '../context/store'
import { jewelleryConfig } from '../config/jewellery'
import { formatPrice } from '../lib/format'
import { Img } from './Img'
import { Overlay } from './Overlay'
import { QtyStepper } from './QtyStepper'

type Step = 'bag' | 'checkout' | 'confirmed'

interface Confirmation {
  order: string
  name: string
  email: string
  items: BagItem[]
  total: number
}

export function ShoppingBag() {
  const { panel, closePanel } = useStore()
  const open = panel === 'bag'
  const [step, setStep] = useState<Step>('bag')

  // Return to the bag view once the drawer has finished closing
  useEffect(() => {
    if (open) return
    const t = window.setTimeout(() => setStep('bag'), 400)
    return () => window.clearTimeout(t)
  }, [open])

  const title = step === 'bag' ? 'Shopping Bag' : step === 'checkout' ? 'Checkout' : 'Order Confirmed'

  return (
    <Overlay open={open} onClose={closePanel} title={title} variant="drawer-right">
      {step === 'bag' && <BagView onCheckout={() => setStep('checkout')} />}
      {step !== 'bag' && <CheckoutView step={step} onBack={() => setStep('bag')} onConfirmed={() => setStep('confirmed')} />}
    </Overlay>
  )
}

function DemoNotice() {
  return (
    <p className="flex items-start gap-2 bg-cream px-3 py-2.5 text-xs leading-relaxed text-muted">
      <Lock size={13} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold-deep" aria-hidden="true" />
      <span>
        <strong className="font-medium text-ink">Demo checkout — no payment will be processed.</strong> No order is placed and
        nothing is shipped.
      </span>
    </p>
  )
}

function BagView({ onCheckout }: { onCheckout: () => void }) {
  const { bag, subtotal, setQty, removeFromBag, closePanel, bagCount } = useStore()

  if (bag.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-8 py-16 text-center">
        <BagIcon size={34} strokeWidth={1} className="text-gold" aria-hidden="true" />
        <p className="mt-5 font-serif text-2xl text-ink">Your bag is empty</p>
        <p className="mt-2 text-sm text-muted">Discover pieces crafted for every occasion.</p>
        <Link to="/shop" onClick={closePanel} className="btn btn-dark mt-7">
          Shop jewellery <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
        </Link>
      </div>
    )
  }

  return (
    <div className="flex min-h-full flex-col">
      <p className="px-6 pt-4 text-xs tracking-[0.12em] text-muted uppercase" aria-live="polite">
        {bagCount} {bagCount === 1 ? 'item' : 'items'}
      </p>
      <ul className="flex-1 divide-y divide-line px-6">
        {bag.map(({ product, qty, lineTotal }) => (
          <li key={product.slug} className="flex gap-4 py-5">
            <Link to={`/product/${product.slug}`} onClick={closePanel} className="h-24 w-20 shrink-0 overflow-hidden bg-cream">
              <Img photo={product.images.main} sizes="80px" alt={product.name} />
            </Link>
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-start justify-between gap-3">
                <Link to={`/product/${product.slug}`} onClick={closePanel} className="font-serif text-lg leading-tight text-ink hover:text-gold-deep">
                  {product.name}
                </Link>
                <button
                  type="button"
                  onClick={() => removeFromBag(product.slug)}
                  className="-mr-1 -mt-1 grid h-8 w-8 shrink-0 place-items-center text-muted transition-colors hover:text-ruby"
                  aria-label={`Remove ${product.name} from bag`}
                >
                  <Trash2 size={15} strokeWidth={1.3} />
                </button>
              </div>
              <p className="mt-1 text-sm tabular-nums text-muted">{formatPrice(product.price)}</p>
              <div className="mt-auto flex items-center justify-between pt-3">
                <QtyStepper size="sm" value={qty} onChange={(v) => setQty(product.slug, v)} label={`Quantity for ${product.name}`} />
                {qty > 1 && <span className="text-sm tabular-nums text-ink">{formatPrice(lineTotal)}</span>}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="sticky bottom-0 border-t border-line bg-ivory px-6 pb-6 pt-5">
        <div className="flex items-baseline justify-between">
          <span className="font-serif text-xl text-ink">Subtotal</span>
          <span className="text-lg font-medium tabular-nums text-ink">{formatPrice(subtotal)}</span>
        </div>
        <p className="mt-1 text-xs text-muted">{jewelleryConfig.freeShippingNote}. Taxes calculated at checkout.</p>
        <button type="button" onClick={onCheckout} className="btn btn-dark mt-5 w-full">
          Checkout <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
        </button>
        <div className="mt-3">
          <DemoNotice />
        </div>
      </div>
    </div>
  )
}

const GST_RATE = 0.03 // 3% GST on gold jewellery, shown for realism in the demo

function CheckoutView({ step, onBack, onConfirmed }: { step: Step; onBack: () => void; onConfirmed: () => void }) {
  const { bag, subtotal, clearBag, closePanel } = useStore()
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '' })
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({})
  const [done, setDone] = useState<Confirmation | null>(null)

  const gst = Math.round(subtotal * GST_RATE)

  const validate = () => {
    const e: typeof errors = {}
    if (form.name.trim().length < 2) e.name = 'Please enter your full name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Please enter a valid email address.'
    if (form.phone.replace(/\D/g, '').length < 10) e.phone = 'Please enter a 10-digit phone number.'
    if (form.city.trim().length < 2) e.city = 'Please enter your city.'
    return e
  }

  const submit = (ev: FormEvent) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length > 0) {
      const first = Object.keys(e)[0]
      document.getElementById(`co-${first}`)?.focus()
      return
    }
    setDone({
      order: `AUR-DEMO-${Math.floor(100000 + Math.random() * 900000)}`,
      name: form.name.trim().split(' ')[0],
      email: form.email,
      items: bag,
      total: subtotal + gst,
    })
    clearBag()
    onConfirmed()
  }

  if (step === 'confirmed' && done) {
    return (
      <div className="px-6 py-10 text-center">
        <CheckCircle2 size={40} strokeWidth={1} className="mx-auto text-gold" aria-hidden="true" />
        <p className="mt-5 font-serif text-3xl text-ink">Thank you, {done.name}</p>
        <p className="mt-2 text-sm text-muted">Your demo order has been received.</p>
        <p className="mt-6 text-xs tracking-[0.14em] text-muted uppercase">Demo order reference</p>
        <p className="mt-1 font-medium tracking-wider text-ink">{done.order}</p>
        <ul className="mt-6 divide-y divide-line border-y border-line text-left text-sm">
          {done.items.map((i) => (
            <li key={i.product.slug} className="flex justify-between gap-3 py-3">
              <span className="text-ink">
                {i.product.name} <span className="text-muted">× {i.qty}</span>
              </span>
              <span className="tabular-nums">{formatPrice(i.lineTotal)}</span>
            </li>
          ))}
          <li className="flex justify-between py-3 font-medium">
            <span>Total (incl. GST)</span>
            <span className="tabular-nums">{formatPrice(done.total)}</span>
          </li>
        </ul>
        <div className="mt-6 text-left">
          <DemoNotice />
        </div>
        <button type="button" onClick={closePanel} className="btn btn-dark mt-6 w-full">
          Continue browsing
        </button>
      </div>
    )
  }

  if (bag.length === 0) {
    return (
      <div className="px-6 py-10 text-center text-sm text-muted">
        Your bag is empty.
        <button type="button" onClick={onBack} className="link-arrow mx-auto mt-4 flex">
          Back to bag
        </button>
      </div>
    )
  }

  const field = (key: keyof typeof form, label: string, type = 'text', autoComplete?: string) => (
    <div>
      <label htmlFor={`co-${key}`} className="mb-1.5 block text-xs tracking-[0.1em] text-charcoal uppercase">
        {label}
      </label>
      <input
        id={`co-${key}`}
        type={type}
        autoComplete={autoComplete}
        value={form[key]}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        aria-invalid={!!errors[key]}
        aria-describedby={errors[key] ? `co-${key}-err` : undefined}
        className="field"
      />
      {errors[key] && (
        <p id={`co-${key}-err`} className="mt-1 text-xs text-ruby">
          {errors[key]}
        </p>
      )}
    </div>
  )

  return (
    <form onSubmit={submit} noValidate className="px-6 pb-8 pt-4">
      <button type="button" onClick={onBack} className="link-arrow mb-4">
        <ArrowLeft size={14} strokeWidth={1.5} aria-hidden="true" /> Back to bag
      </button>
      <DemoNotice />
      <fieldset className="mt-6 space-y-4">
        <legend className="mb-3 font-serif text-xl text-ink">Your details</legend>
        {field('name', 'Full name', 'text', 'name')}
        {field('email', 'Email', 'email', 'email')}
        {field('phone', 'Phone', 'tel', 'tel')}
        {field('city', 'City', 'text', 'address-level2')}
      </fieldset>

      <div className="mt-7 space-y-2 border-t border-line pt-5 text-sm">
        <div className="flex justify-between text-muted">
          <span>Subtotal</span>
          <span className="tabular-nums">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-muted">
          <span>GST (3%)</span>
          <span className="tabular-nums">{formatPrice(gst)}</span>
        </div>
        <div className="flex justify-between text-muted">
          <span>Insured shipping</span>
          <span>Complimentary</span>
        </div>
        <div className="flex justify-between pt-2 text-base font-medium text-ink">
          <span>Total</span>
          <span className="tabular-nums">{formatPrice(subtotal + gst)}</span>
        </div>
      </div>
      <button type="submit" className="btn btn-dark mt-6 w-full">
        Place demo order <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
      </button>
    </form>
  )
}
