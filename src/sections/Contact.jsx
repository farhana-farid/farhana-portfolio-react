import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Clock, Send } from 'lucide-react'
import { CONTACT_CARDS, SOCIALS, CONTACT_AVAILABILITY } from '../data'

const icons = [Mail, MapPin, Clock]

function validate(field, value) {
  const v = value.trim()
  switch (field) {
    case 'name':
      if (!v) return 'Please tell me your name.'
      if (v.length < 2) return 'That looks a little short — at least 2 characters.'
      return undefined
    case 'email':
      if (!v) return 'An email address is required so I can reply.'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Hmm, that email address looks invalid.'
      return undefined
    case 'message':
      if (!v) return "Don't be shy — add a short message."
      if (v.length < 10) return 'A few more details please (at least 10 characters).'
      return undefined
    default:
      return undefined
  }
}

export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', company: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const onChange = (field) => (e) => {
    const value = e.target.value
    setValues((v) => ({ ...v, [field]: value }))
    if (status === 'success' || status === 'error') setStatus('idle')
    if (errors[field]) setErrors((er) => ({ ...er, [field]: validate(field, value) }))
  }

  const onBlur = (field) => () => {
    setErrors((er) => ({ ...er, [field]: validate(field, values[field]) }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const newErrors = {
      name: validate('name', values.name),
      email: validate('email', values.email),
      message: validate('message', values.message),
    }
    setErrors(newErrors)
    if (Object.values(newErrors).some(Boolean)) return
    setStatus('loading')
    setTimeout(() => setStatus('success'), 900)
  }

  return (
    <section id="contact" className="py-20 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="text-center">
          <div className="mx-auto inline-flex items-center gap-3 border-2 border-ink bg-card px-3.5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-ink shadow-brutal-sm">
            <span className="font-mono text-navy">05</span>
            Contact
          </div>
          <h2 className="mt-6 mx-auto max-w-4xl text-3xl font-black uppercase leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl xl:text-[3.4rem]">
            Let's build something{' '}
            <span className="mark-navy">worth shipping</span>
          </h2>
          <p className="mt-5 mx-auto max-w-2xl text-base leading-relaxed sm:text-lg">
            Have a project in mind, a role to fill, or just want to say hi? My inbox is open.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            <div className="border-2 border-ink bg-navy p-5 text-on-navy shadow-brutal">
              <p className="font-mono text-xs font-bold uppercase tracking-widest">Currently open to projects</p>
              <p className="mt-1.5 text-sm leading-relaxed text-on-navy/90">
                {CONTACT_AVAILABILITY}
              </p>
            </div>

            {CONTACT_CARDS.map((card, i) => {
              const Icon = icons[i] || Mail
              const Wrapper = card.href ? 'a' : 'div'
              const props = card.href
                ? { href: card.href }
                : {}
              return (
                <Wrapper
                  key={card.label}
                  {...props}
                  className="block border-2 border-ink bg-card p-4 shadow-brutal transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-lg"
                >
                  <span
                    className={`inline-flex items-center gap-2 border-2 border-ink px-2.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wide ${i === 0 ? 'bg-navy text-on-navy' : i === 1 ? 'bg-sky text-ink-solid' : 'bg-jam text-ink-solid'}`}
                  >
                    <Icon className="h-4 w-4" /> {card.label}
                  </span>
                  <p className="mt-2 font-mono text-sm font-bold text-ink">{card.value}</p>
                </Wrapper>
              )
            })}

            <div className="border-2 border-ink bg-card p-4 shadow-brutal">
              <p className="mb-3 border-l-2 border-ink pl-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-ink">
                Elsewhere — say hi
              </p>
              <div className="flex flex-wrap gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-brutal bg-paper px-3 py-2 text-xs font-bold uppercase tracking-wide text-ink"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="border-2 border-ink bg-card p-5 shadow-brutal sm:p-6"
            noValidate
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                id="contact-name"
                label="Name"
                value={values.name}
                error={errors.name}
                onChange={onChange('name')}
                onBlur={onBlur('name')}
                autoComplete="name"
              />
              <Field
                id="contact-email"
                label="Email"
                type="email"
                value={values.email}
                error={errors.email}
                onChange={onChange('email')}
                onBlur={onBlur('email')}
                autoComplete="email"
              />
            </div>
            <div className="mt-4">
              <Field
                id="contact-company"
                label="Company (optional)"
                value={values.company}
                onChange={onChange('company')}
                autoComplete="organization"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="contact-message"
                className="mb-1.5 block font-mono text-[11px] font-bold uppercase tracking-wider text-ink"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                rows={5}
                value={values.message}
                onChange={onChange('message')}
                onBlur={onBlur('message')}
                className="w-full border-2 border-ink bg-paper p-3 font-mono text-sm leading-relaxed text-ink placeholder:text-ink/40 focus:bg-card focus:shadow-brutal focus-visible:outline-none"
                placeholder="Tell me a bit about the project..."
              />
              {errors.message ? (
                <p className="mt-1.5 font-mono text-xs font-bold text-jam">{errors.message}</p>
              ) : null}
            </div>

            <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-brutal bg-ink px-6 py-3 text-sm font-bold uppercase tracking-wide text-paper disabled:opacity-60"
              >
                {status === 'loading' ? 'Sending...' : 'Send message'} <Send className="h-4 w-4" />
              </button>
              {status === 'success' ? (
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-leaf">
                  Thanks! I'll reply within 24 hours.
                </p>
              ) : null}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

function Field({ id, label, type = 'text', value, error, onChange, onBlur, autoComplete }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block font-mono text-[11px] font-bold uppercase tracking-wider text-ink"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
        className="w-full border-2 border-ink bg-paper p-3 font-mono text-sm text-ink placeholder:text-ink/40 focus:bg-card focus:shadow-brutal focus-visible:outline-none"
      />
      {error ? (
        <p className="mt-1.5 font-mono text-xs font-bold text-jam">{error}</p>
      ) : null}
    </div>
  )
}
