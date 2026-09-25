import { Heart } from 'lucide-react'
import { useStore } from '../context/store'
import { cx } from '../lib/format'

export function WishlistButton({ slug, name, className }: { slug: string; name: string; className?: string }) {
  const { isWishlisted, toggleWishlist } = useStore()
  const active = isWishlisted(slug)
  return (
    <button
      type="button"
      onClick={() => toggleWishlist(slug)}
      aria-pressed={active}
      aria-label={active ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
      className={cx(
        'grid h-9 w-9 place-items-center rounded-full bg-ivory/85 text-ink backdrop-blur-sm transition-colors hover:bg-ivory hover:text-ruby',
        className,
      )}
    >
      <Heart size={16} strokeWidth={1.4} className={cx('transition-transform', active && 'scale-110 fill-ruby text-ruby')} />
    </button>
  )
}
