import { motion } from 'framer-motion'
import { Code2, ExternalLink } from 'lucide-react'
import { PROJECTS } from '../data'

export default function Projects() {
  return (
    <section id="projects" className="py-20 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="text-center">
          <div className="mx-auto inline-flex items-center gap-3 border-2 border-ink bg-card px-3.5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-ink shadow-brutal-sm">
            <span className="font-mono text-navy">03</span>
            Projects
          </div>
          <h2 className="mt-6 mx-auto max-w-4xl text-3xl font-black uppercase leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl xl:text-[3.4rem]">
            Selected work, built{' '}
            <span className="mark-jam">end to end</span>
          </h2>
          <p className="mt-5 mx-auto max-w-2xl text-base leading-relaxed sm:text-lg">
            Three production-shaped builds that show how I think about data flow, performance and interface detail. Every
            one is live and open source.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ staggerChildren: 0.14 }}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PROJECTS.map((p, t) => (
            <motion.article
              key={p.title}
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              className={`card-brutal group flex h-full flex-col bg-card ${
                t === PROJECTS.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="relative aspect-[16/10] overflow-hidden border-b-2 border-ink">
                <img
                  src={p.image}
                  alt={`${p.title} interface preview`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <span className="absolute left-3 top-3 border-2 border-ink bg-card px-2.5 py-1 font-mono text-xs font-bold text-ink shadow-brutal-sm">
                  0{t + 1}
                </span>
                {p.featured ? (
                  <span className="chip-brutal absolute right-3 top-3 bg-navy px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-ink-solid">
                    ★ Featured
                  </span>
                ) : null}
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="font-display text-lg uppercase leading-tight tracking-tight text-ink">
                  {p.title}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed">{p.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <li key={tag}>
                      <span className="chip-brutal bg-paper px-2.5 py-1 font-mono text-[11px] font-bold text-ink">
                        {tag}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 grid grid-cols-2 gap-3 border-t-2 border-ink pt-5">
                  <a
                    href={p.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-brutal bg-navy px-3 py-2.5 text-xs font-bold uppercase tracking-wide text-ink-solid"
                  >
                    Live Demo <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={p.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-brutal bg-card px-3 py-2.5 text-xs font-bold uppercase tracking-wide text-ink"
                  >
                    <Code2 className="h-3.5 w-3.5" /> Source
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-10 flex justify-center"
        >
          <a
            href="https://github.com/tiyahossain?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brutal bg-card px-6 py-3.5 text-sm uppercase tracking-wide text-ink"
          >
            <Code2 className="h-4 w-4" /> Explore more on GitHub <ExternalLink className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
