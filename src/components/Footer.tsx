import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { jewelleryConfig } from '../config/jewellery'
import { Logo } from './Logo'
import { SocialIcons } from './SocialLinks'

const columns = [
  {
    title: 'Explore',
    links: [
      { to: '/collections', label: 'Collections' },
      { to: '/bridal', label: 'Bridal' },
      { to: '/shop', label: 'Shop' },
      { to: '/our-story', label: 'Our Story' },
      { to: '/appointments', label: 'Appointments' },
      { to: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Customer',
    links: [
      { to: '/shipping', label: 'Shipping' },
      { to: '/returns', label: 'Returns' },
      { to: '/care', label: 'Jewellery Care' },
      { to: '/faq', label: 'FAQs' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { to: '/privacy', label: 'Privacy' },
      { to: '/terms', label: 'Terms' },
    ],
  },
]

function Newsletter() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setDone(true)
  }

  if (done) {
    return (
      <p className="flex items-start gap-3 border border-ivory/15 p-4 text-sm text-ivory/85" role="status">
        <Check size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold-soft" aria-hidden="true" />
        <span>
          Welcome to the private circle. <span className="text-ivory/60">(Demo — your email was not stored or sent.)</span>
        </span>
      </p>
    )
  }

  return (
    <form onSubmit={submit} noValidate>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex border-b border-ivory/35 focus-within:border-gold-soft">
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          aria-invalid={!!error}
          aria-describedby={error ? 'newsletter-error' : undefined}
          className="min-w-0 flex-1 bg-transparent py-3 text-sm text-ivory placeholder:text-ivory/50 focus:outline-none"
        />
        <button type="submit" aria-label="Subscribe" className="grid w-11 place-items-center text-ivory transition-colors hover:text-gold-soft">
          <ArrowRight size={16} strokeWidth={1.25} />
        </button>
      </div>
      {error && (
        <p id="newsletter-error" className="mt-2 text-xs text-[#e6a39f]">
          {error}
        </p>
      )}
    </form>
  )
}

export function Footer() {
  return (
    <footer className="bg-ink pb-20 text-ivory md:pb-0">
      <div className="container-lux grid grid-cols-2 gap-x-6 gap-y-12 py-16 md:py-20 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.6fr_1.4fr] lg:gap-10">
        <div className="col-span-2 lg:col-span-1">
          <Logo light className="items-start" />
          <p className="mt-5 font-serif text-xl italic text-ivory/85">{jewelleryConfig.tagline}</p>
          <SocialIcons className="-ml-3 mt-6" />
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="eyebrow text-gold-soft">{col.title}</p>
            <ul className="mt-5 space-y-3 text-sm">
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-ivory/75 transition-colors hover:text-ivory">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div className="col-span-2 lg:col-span-1">
          <p className="eyebrow text-gold-soft">Join our private circle</p>
          <p className="mb-5 mt-4 text-sm leading-relaxed text-ivory/70">
            First look at new collections, bridal trunk shows and private events.
          </p>
          <Newsletter />
        </div>
      </div>
      <div className="border-t border-ivory/10">
        <div className="container-lux flex flex-col gap-2 py-6 text-xs text-ivory/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {jewelleryConfig.brand} Fine Jewellery — a fictional brand.
          </p>
          <p>Demo website — sample concept for jewellery businesses.</p>
        </div>
      </div>
    </footer>
  )
}
