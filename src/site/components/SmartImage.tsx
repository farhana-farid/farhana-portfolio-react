import { useEffect, useRef, useState, type CSSProperties } from 'react'

interface SmartImageProps {
  src: string
  alt: string
  /** `eager` for above-the-fold imagery, `lazy` for everything else */
  loading?: 'eager' | 'lazy'
  fetchPriority?: 'high' | 'low' | 'auto'
  /** applied to the framing element */
  wrapperClassName?: string
  /** applied to the <img> itself (object-fit, radius, etc.) */
  className?: string
  style?: CSSProperties
}

/**
 * Image with explicit loading and error states.
 *
 * A shimmer sits behind the picture while it decodes and an on-brand panel
 * replaces it if the file ever fails — so a missing asset degrades gracefully
 * instead of leaving a broken-image icon in the layout.
 */
export default function SmartImage({
  src,
  alt,
  loading = 'lazy',
  fetchPriority = 'auto',
  wrapperClassName = '',
  className = '',
  style,
}: SmartImageProps) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const ref = useRef<HTMLImageElement>(null)

  // images already in the cache can finish decoding before onLoad is attached
  useEffect(() => {
    const el = ref.current
    if (el?.complete && el.naturalWidth > 0) setStatus('ready')
  }, [src])

  useEffect(() => {
    setStatus('loading')
  }, [src])

  if (status === 'error') {
    return (
      <div
        role="img"
        aria-label={`${alt} — image unavailable`}
        className={`grid place-items-center bg-ivory text-center ${wrapperClassName}`}
      >
        <div className="px-6 py-10">
          <p className="font-display text-xl italic text-muted">Image unavailable</p>
          <p className="mt-2 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-rose-deep">
            AI Photo Gallery
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden bg-ivory ${wrapperClassName}`}>
      {status === 'loading' ? (
        <span className="shimmer absolute inset-0" aria-hidden="true" />
      ) : null}
      <img
        ref={ref}
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        draggable={false}
        onLoad={() => setStatus('ready')}
        onError={() => setStatus('error')}
        className={`relative h-full w-full transition-opacity duration-700 ${
          status === 'ready' ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        style={style}
      />
    </div>
  )
}
