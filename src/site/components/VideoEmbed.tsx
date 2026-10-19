import { useState } from 'react'
import { Play, ExternalLink } from 'lucide-react'
import { SITE } from '../data/site'

interface VideoEmbedProps {
  /** unique id of the featured film, used for the embed title */ 
  title: string
  className?: string
}

/**
 * Responsive 16:9 YouTube embed.
 *
 * - loads the privacy-enhanced `youtube-nocookie` player
 * - never autoplays with sound (`autoplay=1&mute=1` is never added)
 * - an accessible, keyboard reachable facade is shown until the player is
 *   asked for, so the page stays fast and no third-party cookie is set
 *   before the visitor opts in
 * - a visible "Watch on YouTube" button links to the exact supplied URL
 */
export default function VideoEmbed({ title, className = '' }: VideoEmbedProps) {
  const [active, setActive] = useState(false)

  return (
    <div className={className}>
      <div className="plate relative aspect-video w-full">
        {active ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`${SITE.videoEmbedUrl}?rel=0&modestbranding=1&playsinline=1&color=white`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            type="button"
            onClick={() => setActive(true)}
            className="group absolute inset-0 grid place-items-center bg-ink text-center"
            aria-label={`Play video: ${title} (YouTube)`}
          >
            {/* warm cinematic wash */}
            <span
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(120% 100% at 20% 10%, rgba(183,110,121,0.55) 0%, rgba(48,39,43,0.92) 58%, #30272B 100%)',
              }}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-5 rounded-[2px] border border-champagne/45 sm:inset-8"
            />

            <span className="relative z-10 flex flex-col items-center gap-5 px-6">
              <span className="relative grid h-20 w-20 place-items-center rounded-full border border-champagne/70 bg-paper/10 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
                <Play
                  className="ml-1 h-7 w-7 text-paper"
                  strokeWidth={1.4}
                  fill="currentColor"
                  aria-hidden="true"
                />
              </span>
              <span className="font-display text-xl italic text-paper sm:text-2xl">
                {title}
              </span>
              <span className="eyebrow !text-champagne">Click to play on YouTube</span>
            </span>
          </button>
        )}
      </div>

      {/* ---------------------- primary call to action ---------------------- */}
      <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <a
          href={SITE.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Watch on YouTube
          <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
        </a>
        <p className="max-w-md text-sm leading-relaxed text-muted">
          <span className="font-display text-base italic text-ink">{title}</span> — a cinematic
          AI-assisted film by Farhana Farid.
        </p>
      </div>
    </div>
  )
}
