import type { Photo } from '../data/images'
import { cx } from '../lib/format'

interface ImgProps {
  photo: Photo
  /** CSS sizes attribute; defaults to full viewport width */
  sizes?: string
  className?: string
  priority?: boolean
  alt?: string
}

/** Responsive, lazy-loaded WebP image with explicit dimensions to avoid layout shift. */
export function Img({ photo, sizes = '100vw', className, priority, alt }: ImgProps) {
  const srcSet = photo.small ? `${photo.small} ${photo.smallWidth}w, ${photo.src} ${photo.width}w` : undefined
  return (
    <img
      src={photo.src}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      width={photo.width}
      height={photo.height}
      alt={alt ?? photo.alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding={priority ? 'sync' : 'async'}
      style={photo.position ? { objectPosition: photo.position } : undefined}
      className={cx('h-full w-full object-cover', className)}
    />
  )
}
