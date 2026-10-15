import { motion } from 'framer-motion'
import { Code2 } from 'lucide-react'
import { SKILL_GROUPS, HOW_I_SHIP } from '../data'

const TONE_COLOR = {
  navy: 'bg-navy',
  sky: 'bg-sky',
  jam: 'bg-jam',
  leaf: 'bg-leaf',
  tang: 'bg-tang',
  grape: 'bg-grape',
}

function SkillBar({ name, level, tone, delay }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2.5 font-mono text-sm font-bold uppercase tracking-wide text-ink">
          {name}
        </span>
        <span
          className={`border-2 border-ink px-2 py-1 font-mono text-xs font-bold text-ink tabular-nums ${TONE_COLOR[tone]}`}
        >
          {level}%
        </span>
      </div>
      <div
        role="progressbar"
        aria-label={`${name} proficiency`}
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-2.5 h-5 w-full border-2 border-ink bg-paper"
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay }}
          className={`relative h-full overflow-hidden ${TONE_COLOR[tone]}`}
        >
          <span className="bg-stripes absolute inset-0" />
        </motion.div>
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-20 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHeaderLazy
          index="02"
          eyebrow="Skills"
          title={
            <>
              A toolkit tuned for{' '}
              <span className="mark-sky">scalable products</span>
            </>
          }
          description="Honest proficiency levels across the three areas I work in every day — frontend craft, backend systems, and the tooling that holds it together."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ staggerChildren: 0.14 }}
          className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {SKILL_GROUPS.map((g) => (
            <motion.article
              key={g.title}
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              className="card-brutal bg-card"
            >
              <div
                className={`flex items-center gap-3 border-b-2 border-ink px-5 py-4 ${g.band}`}
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center border-2 border-ink bg-card text-ink">
                  <Code2 className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-base uppercase leading-none tracking-tight text-ink-solid">
                    {g.title}
                  </p>
                  <p className="mt-1 font-mono text-[11px] font-bold uppercase tracking-wider text-ink-solid">
                    {g.code}
                  </p>
                </div>
                <span className="ml-auto hidden font-mono text-[11px] font-bold text-ink-solid sm:block">
                  N={g.skills.length}
                </span>
              </div>
              <div className="space-y-5 p-5 sm:p-6">
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
                  {g.blurb}
                </p>
                {g.skills.map((sk, t) => (
                  <SkillBar
                    key={sk.name}
                    name={sk.name}
                    level={sk.level}
                    tone={sk.tone}
                    delay={0.1 + t * 0.09}
                  />
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mt-10 border-2 border-ink bg-ink shadow-brutal"
        >
          <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <span className="inline-flex w-max items-center gap-2 border-2 border-ink bg-navy px-3 py-2 font-mono text-xs font-bold uppercase tracking-widest text-ink-solid shadow-brutal-sm">
              <Code2 className="h-4 w-4" /> How I ship
            </span>
            <ol className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {HOW_I_SHIP.map((step, t) => (
                <li key={step} className="flex items-center gap-4">
                  <span className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-paper">
                    <span className="text-navy">✳</span>
                    {step}
                  </span>
                  {t < HOW_I_SHIP.length - 1 ? (
                    <span className="text-paper/40" aria-hidden>
                      ›
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 text-center font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-ink"
        >
          <Code2 className="mr-2 inline h-3.5 w-3.5" />
          always learning — system design & edge rendering next
        </motion.p>
      </div>
    </section>
  )
}

function SectionHeaderLazy({ index, eyebrow, title, description }) {
  return (
    <div className="text-center">
      <div className="mx-auto inline-flex items-center gap-3 border-2 border-ink bg-card px-3.5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-ink shadow-brutal-sm">
        <span className="font-mono text-navy">{index}</span>
        {eyebrow}
      </div>
      <h2 className="mt-6 mx-auto max-w-4xl text-3xl font-black uppercase leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl xl:text-[3.4rem]">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 mx-auto max-w-2xl text-base leading-relaxed sm:text-lg">{description}</p>
      ) : null}
    </div>
  )
}
