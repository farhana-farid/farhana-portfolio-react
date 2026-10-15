import { motion } from 'framer-motion'
import { ArrowRight, Mail, MapPin } from 'lucide-react'
import { STATS, MARQUEE } from '../data'
import InteractiveMascot from '../components/InteractiveMascot'
import TiltCard from '../components/TiltCard'
import '../mascot.css'

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-16 pt-28 sm:pt-32 lg:pt-36"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid-soft mask-fade-edges absolute inset-0" />
        <motion.div
          animate={{ rotate: [0, 8, 0], x: [0, 10, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-16 top-16 h-40 w-40 border-2 border-ink bg-navy shadow-brutal"
        />
        <motion.div
          animate={{ rotate: [6, -6, 6], y: [0, -14, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-8 top-28 h-28 w-28 border-2 border-ink bg-sky shadow-brutal"
        />
        <motion.div
          animate={{ rotate: [-10, 4, -10] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-12 bottom-24 h-48 w-48 border-2 border-ink bg-jam shadow-brutal"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-8 left-1/4 h-20 w-20 border-2 border-ink bg-leaf shadow-brutal"
        />
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.p
              variants={item}
              className="inline-flex items-center gap-3 border-2 border-ink bg-card px-3.5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-ink shadow-brutal-sm"
            >
              <span className="h-2.5 w-2.5 animate-pulse bg-leaf" />
              Open for New Opportunities &amp; Collaborations
            </motion.p>

            <motion.h1
              variants={item}
              className="mt-7 text-[2.6rem] font-black uppercase leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.4rem]"
            >
              Hello, I'm{' '}
              <span className="mt-2 block">
                <span className="mark-navy">Farhana Farid</span>
              </span>
              <span className="mt-2 block">Building with AI.</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mx-auto mt-7 max-w-xl text-base leading-relaxed sm:text-lg lg:mx-0"
            >
              I'm <strong className="font-bold underline decoration-jam decoration-4 underline-offset-4">Farhana Farid</strong>{' '}
              — an <strong className="font-bold">AI Enthusiast &amp; Web Developer</strong>. I design and build high-performance
              web applications infused with intelligent AI capabilities — from robust Flask backends to responsive, elegant
              user interfaces.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-9 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center lg:justify-start"
            >
              <button
                type="button"
                onClick={() => scrollTo('projects')}
                className="btn-brutal bg-ink px-7 py-3.5 text-sm uppercase tracking-wide text-paper"
              >
                View Projects <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollTo('contact')}
                className="btn-brutal bg-card px-7 py-3.5 text-sm uppercase tracking-wide text-ink"
              >
                <Mail className="h-4 w-4" /> Contact Me
              </button>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-9 flex flex-col items-center gap-5 sm:flex-row sm:justify-center lg:justify-start"
            >
              <a
                href="https://github.com/tiyahossain"
                target="_blank"
                rel="noopener noreferrer"
                className="social-tile inline-flex items-center gap-2 border-2 border-ink bg-card px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-ink shadow-brutal-sm"
              >
                GitHub
              </a>
              <span className="hidden h-8 w-0.5 bg-ink sm:block" />
              <span className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider">
                <MapPin className="h-4 w-4" /> Open to remote &amp; on-site
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative mx-auto w-full max-w-[24rem] lg:max-w-none"
          >
            <TiltCard className="mx-auto w-full max-w-[420px] select-none" maxTilt={14} glare>
              <div className="relative bg-white rounded-3xl p-6 md:p-8 border-2 border-[#EDE9FE] card-soft-shadow">
                <div className="relative bg-gradient-to-b from-[#FAF9FF] via-[#F5F3FF] to-[#EDE9FE] rounded-2xl p-4 overflow-hidden border border-[#EDE9FE] flex items-center justify-center">
                  <div className="absolute w-56 h-56 rounded-full bg-violet-300/30 blur-2xl pointer-events-none" />
                  <InteractiveMascot
                    width={200}
                    mode="svg-rig"
                    maxEyeOffset={8}
                    maxBodyTilt={12}
                    onMascotClick={() => console.log('Mascot clicked!')}
                  />
                </div>
                <div className="mt-5 pt-4 border-t border-[#EDE9FE] flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-extrabold text-[#0F172A] flex items-center gap-1.5">
                      <span>Sparky</span>
                      <span className="text-xs font-normal text-slate-500">• Farhana's AI Mascot</span>
                    </h3>
                    <p className="text-xs font-semibold text-violet-600">Move your cursor — click to make Sparky wink 👋</p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>

        <motion.dl
          variants={container}
          initial="hidden"
          animate="visible"
          className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {STATS.map((s, t) => (
            <motion.div
              key={s.label}
              variants={item}
              className="flex items-stretch gap-4 border-2 border-ink bg-card shadow-brutal"
            >
              <span
                className={`grid w-12 shrink-0 place-items-center border-r-2 border-ink font-mono text-xs font-bold ${
                  ['bg-navy', 'bg-sky', 'bg-jam'][t]
                } ${t === 0 ? 'text-on-navy' : 'text-ink-solid'}`}
              >
                {s.index}
              </span>
              <div className="py-4 pr-5">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-3xl leading-none">{s.value}</dd>
                <dd className="mt-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-ink">
                  {s.label}
                </dd>
              </div>
            </motion.div>
          ))}
        </motion.dl>
      </div>

      <div className="mt-14 w-full overflow-hidden border-y-2 border-ink bg-navy py-3 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="animate-marquee flex w-max items-center gap-8 hover:[animation-play-state:paused]">
          {[...MARQUEE, ...MARQUEE].map((m, t) => (
            <span
              key={`${m}-${t}`}
              className="flex items-center gap-8 whitespace-nowrap font-mono text-xs font-bold uppercase tracking-widest text-on-navy"
            >
              {m}
              <span aria-hidden>✳</span>
            </span>
          ))}
        </div>
      </div>

      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.7 }}
        onClick={() => scrollTo('about')}
        aria-label="Scroll to the about section"
        className="mx-auto mt-10 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.25em] text-ink"
      >
        <span className="animate-bounce-y grid h-10 w-10 place-items-center border-2 border-ink bg-card shadow-brutal-sm">
          <ArrowRight className="h-4 w-4 rotate-90" />
        </span>
        Scroll
      </motion.button>
    </section>
  )
}
