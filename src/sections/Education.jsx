import { motion } from 'framer-motion'
import { GraduationCap, Award, ExternalLink } from 'lucide-react'
import { CREDENTIALS, CREDENTIAL_STATS } from '../data'

const TONE_COLOR = {
  navy: 'bg-navy',
  sky: 'bg-sky',
  jam: 'bg-jam',
  leaf: 'bg-leaf',
  tang: 'bg-tang',
  grape: 'bg-grape',
}

export default function Education() {
  return (
    <section id="education" className="py-20 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="text-center">
          <div className="mx-auto inline-flex items-center gap-3 border-2 border-ink bg-card px-3.5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-ink shadow-brutal-sm">
            <span className="font-mono text-navy">04</span>
            Education &amp; Certifications
          </div>
          <h2 className="mt-6 mx-auto max-w-4xl text-3xl font-black uppercase leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl xl:text-[3.4rem]">
            A foundation built on <span className="mark-leaf">learning in public</span>
          </h2>
          <p className="mt-5 mx-auto max-w-2xl text-base leading-relaxed sm:text-lg">
            Formal computer science, plus the certifications that keep my stack current. Everything below is verifiable.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {CREDENTIAL_STATS.map((s) => (
            <div
              key={s.label}
              className="border-2 border-ink bg-card px-4 py-2 shadow-brutal-sm"
            >
              <span className="font-display text-2xl leading-none">{s.value}</span>
              <span className="ml-2 font-mono text-[11px] font-bold uppercase tracking-wider text-ink">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 space-y-4">
          {CREDENTIALS.map((c, i) => {
            const Icon = c.kind === 'degree' ? GraduationCap : Award
            return (
              <motion.article
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="card-brutal bg-card p-5 sm:p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center border-2 border-ink ${TONE_COLOR[c.tone]} text-ink-solid shadow-brutal-sm`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink">
                        {c.kind === 'degree' ? 'Degree' : 'Certification'}
                      </p>
                      <h3 className="mt-1 font-display text-base uppercase tracking-tight text-ink">
                        {c.title}
                      </h3>
                      <p className="mt-1 font-mono text-xs font-bold uppercase tracking-wider text-ink">
                        {c.org} · {c.period}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed">{c.description}</p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {c.highlights.map((h) => (
                          <li
                            key={h}
                            className="chip-brutal bg-paper px-2.5 py-1 font-mono text-[11px] font-bold text-ink"
                          >
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {c.credentialUrl ? (
                    <a
                      href={c.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-brutal bg-card px-3 py-2 text-xs font-bold uppercase tracking-wide text-ink shrink-0"
                    >
                      Verify <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : null}
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
