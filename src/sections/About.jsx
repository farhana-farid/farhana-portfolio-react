import { motion } from 'framer-motion'
import { Code2, Lightbulb, TrendingUp } from 'lucide-react'
import { VALUES, CODE_SNIPPET, TAG_CHIPS } from '../data'

const fx = [Code2, Lightbulb, TrendingUp]

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHeader
          id="about"
          index="01"
          eyebrow="About me"
          title={
            <>
              Engineering software that feels{' '}
              <span className="mark-navy">effortless</span>
            </>
          }
          description="A quick look at how I think about code, products and the people who use them."
          align="center"
        />

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14">
          <div className="min-w-0 space-y-6">
            <p className="text-base leading-relaxed sm:text-[1.0625rem]">
              I'm an AI enthusiast and web developer who loves turning ambitious ideas into pixel-perfect digital
              experiences. Today I work across the whole stack — Python &amp; Flask on the back, Tailwind-powered
              interfaces on the front — and I care just as much about intelligent features as{' '}
              <strong className="mark-leaf px-1 py-0.5">delightful UX</strong>.
            </p>
            <p className="text-base leading-relaxed sm:text-[1.0625rem]">
              My approach is simple: understand the problem properly, keep the codebase readable, and ship in small
              increments. I write typed, documented code, treat accessibility and performance as features rather than
              afterthoughts, and review my own pull requests like a stranger would. When something breaks in production,
              I want the trail to be obvious — not a mystery hunt.
            </p>
            <p className="text-base leading-relaxed sm:text-[1.0625rem]">
              Right now I'm deepening my focus on scalability: cleaner data boundaries, better observability, and design
              systems that let a team move fast without drifting. Long term, I want to architect front-end platforms for
              products that serve thousands of people a day.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 border-2 border-ink bg-navy px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wide text-on-navy shadow-brutal-sm">
                <Code2 className="h-3.5 w-3.5" /> /about
              </div>
              <div className="mt-4 border-2 border-ink bg-ink p-5 font-mono text-xs leading-relaxed shadow-brutal-lg">
                {CODE_SNIPPET.map((line, i) => (
                  <div
                    key={i}
                    className="flex"
                    style={{ paddingLeft: `${line.indent * 1.25}rem` }}
                  >
                    {line.tokens.map((tk, j) => (
                      <span key={j} className={tk.cls}>
                        {tk.text}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <ul className="flex flex-wrap gap-2 pt-2">
              {TAG_CHIPS.map((tag) => (
                <li
                  key={tag}
                  className="chip-brutal bg-paper px-2.5 py-1 font-mono text-[11px] font-bold text-ink"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {VALUES.map((v, i) => {
              const Icon = fx[i]
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="card-brutal bg-card p-5 sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center border-2 border-ink ${v.accent} ${v.text} shadow-brutal-sm`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink">
                        {v.number}
                      </p>
                      <h3 className="mt-1 font-display text-base uppercase tracking-tight text-ink">
                        {v.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed">{v.body}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function SectionHeader({ id, index, eyebrow, title, description, align = 'center' }) {
  return (
    <div className={align === 'center' ? 'text-center' : 'text-left'}>
      <div
        className={`inline-flex items-center gap-3 border-2 border-ink bg-card px-3.5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-ink shadow-brutal-sm ${
          align === 'center' ? 'mx-auto' : ''
        }`}
      >
        <span className="font-mono text-navy">{index}</span>
        {eyebrow}
      </div>
      <h2
        className={`mt-6 max-w-4xl text-3xl font-black uppercase leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl xl:text-[3.4rem] ${
          align === 'center' ? 'mx-auto' : ''
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-5 max-w-2xl text-base leading-relaxed sm:text-lg ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
export { SectionHeader }
