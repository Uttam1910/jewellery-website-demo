import { Link } from 'react-router-dom'
import { DemoBadge } from '../components/DemoBadge'
import { PageHeader } from '../components/PageHeader'
import { infoPages } from '../data/pages'
import { useSeo } from '../hooks/useSeo'

const related = [
  { to: '/shipping', label: 'Shipping' },
  { to: '/returns', label: 'Returns' },
  { to: '/care', label: 'Jewellery Care' },
  { to: '/faq', label: 'FAQs' },
  { to: '/privacy', label: 'Privacy' },
  { to: '/terms', label: 'Terms' },
]

export default function InfoPage({ page }: { page: keyof typeof infoPages }) {
  const content = infoPages[page]
  useSeo(content.title, content.metaDescription)
  return (
    <>
      <PageHeader eyebrow={content.eyebrow} title={content.title} subtitle={content.intro} compact>
        <DemoBadge className="mt-5">Demo policy · placeholder text</DemoBadge>
      </PageHeader>
      <div className="container-lux grid gap-12 pb-20 md:pb-28 lg:grid-cols-[1fr_14rem]">
        <article className="max-w-2xl space-y-10 border-t border-line pt-10">
          {content.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-[1.7rem]">{s.heading}</h2>
              <div className="prose-lux mt-3 leading-relaxed text-muted">
                {s.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </article>
        <nav aria-label="Customer care" className="border-t border-line pt-10">
          <p className="eyebrow text-ink">Customer care</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {related.map((r) => (
              <li key={r.to}>
                <Link to={r.to} className={r.to === `/${content.slug}` ? 'text-gold-deep' : 'text-muted hover:text-ink'} aria-current={r.to === `/${content.slug}` ? 'page' : undefined}>
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}
