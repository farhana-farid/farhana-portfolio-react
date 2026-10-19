import { useEffect } from 'react'

/**
 * Sets the document title and description for the current route and keeps
 * social metadata in step — the SEO layer for a single-page application.
 */
export default function PageMeta({ title, description }: { title: string; description: string }) {
  const text = description

  useEffect(() => {
    document.title = title

    const set = (selector: string, attr: 'name' | 'property', key: string, value: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute('content', value)
    }

    set('meta[name="description"]', 'name', 'description', text)
    set('meta[property="og:title"]', 'property', 'og:title', title)
    set('meta[property="og:description"]', 'property', 'og:description', text)
    set('meta[name="twitter:title"]', 'name', 'twitter:title', title)
    set('meta[name="twitter:description"]', 'name', 'twitter:description', text)
  }, [title, text])

  return null
}
