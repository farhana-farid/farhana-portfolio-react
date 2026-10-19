import type { ReactNode } from 'react'
import Reveal from './Reveal'

interface PageHeaderProps {
  eyebrow: string
  title: ReactNode
  lead: string
  /** small meta row rendered under the lead, e.g. "20 photographs · 5 collections" */
  meta?: string[]
}

/**
 * Shared introduction block used at the top of every route so the four pages
 * feel like one considered editorial system rather than four separate designs.
 */
export default function PageHeader({ eyebrow, title, lead, meta }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden">
      {/* soft warm wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-full"
        style={{
          background:
            'linear-gradient(180deg, #FFF8F3 0%, rgba(248,216,206,0.42) 45%, rgba(255,252,250,0) 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-24 h-72 w-72 rounded-full bg-blush/40 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-4xl px-5 pb-14 pt-32 text-center sm:px-8 sm:pb-16 sm:pt-36 lg:pt-40">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>

        <Reveal delay={90}>
          <h1 className="mt-5 font-display text-[clamp(2.5rem,7vw,4.25rem)] leading-[1.05] text-ink">
            {title}
          </h1>
        </Reveal>

        <Reveal delay={170}>
          <div className="mt-6 flex justify-center">
            <span className="rule-diamond" aria-hidden="true" />
          </div>
        </Reveal>

        <Reveal delay={240}>
          <p className="mx-auto mt-6 max-w-2xl text-[1.02rem] leading-relaxed text-muted">
            {lead}
          </p>
        </Reveal>

        {meta && meta.length > 0 ? (
          <Reveal delay={320}>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[0.66rem] font-medium uppercase tracking-[0.26em] text-muted">
              {meta.map((item, i) => (
                <li key={item} className="flex items-center gap-4">
                  {i > 0 ? (
                    <span className="h-1 w-1 rounded-full bg-champagne" aria-hidden="true" />
                  ) : null}
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}
      </div>
    </section>
  )
}
