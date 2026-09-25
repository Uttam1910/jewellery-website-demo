import { photos, type Photo } from './images'

export type CollectionSlug = 'bridal' | 'heritage' | 'contemporary' | 'polki' | 'emerald' | 'everyday-luxury'

export interface Collection {
  slug: CollectionSlug
  name: string
  kicker: string
  summary: string
  story: string
  /** Visual treatment for the collection page hero */
  tone: 'dark' | 'light'
  image: Photo
}

export const collections: Collection[] = [
  {
    slug: 'bridal',
    name: 'Bridal',
    kicker: 'For the moments that deserve forever',
    summary: 'Traditional luxury bridal pieces — layered polki, kundan and temple gold made for the wedding day.',
    story:
      'Our bridal atelier works slowly and by hand. Each set is balanced to be worn across ceremonies — the haar for the pheras, the choker for the reception — so the jewellery becomes part of the family story long after the day itself.',
    tone: 'dark',
    image: photos.bridalBanner,
  },
  {
    slug: 'heritage',
    name: 'Heritage',
    kicker: 'Inspired by Indian craftsmanship',
    summary: 'Temple motifs, antique gold finishes and kemp stones inspired by centuries of Indian jewellery making.',
    story:
      'Heritage draws on the goldsmithing traditions of South Indian temples and Rajasthani courts — lotus, peacock and mango motifs, hand-chased and finished in a soft antique glow.',
    tone: 'dark',
    image: photos.brideGoldWall,
  },
  {
    slug: 'contemporary',
    name: 'Contemporary',
    kicker: 'Modern jewellery, Indian soul',
    summary: 'Lighter silhouettes and graphic lines that carry Indian influences into everyday modern dressing.',
    story:
      'Contemporary pieces are designed for the woman who moves between a boardroom and a sangeet in the same week — sculptural, wearable and quietly unmistakable.',
    tone: 'light',
    image: photos.modelChoker,
  },
  {
    slug: 'polki',
    name: 'Polki',
    kicker: 'The uncut radiance of tradition',
    summary: 'Traditional polki — uncut diamonds set in gold foil the way Mughal-era karigars once did.',
    story:
      'Polki is the oldest form of diamond jewellery in India. Uncut stones are backed with gold foil and set by hand, so no two pieces catch the light in quite the same way.',
    tone: 'dark',
    image: photos.heroFine,
  },
  {
    slug: 'emerald',
    name: 'Emerald',
    kicker: 'The colour of new beginnings',
    summary: 'An emerald-focused edit — deep green drops, cabochons and beads paired with gold and polki.',
    story:
      'Emerald has been the stone of royal Indian treasuries for centuries. We pair it with warm gold, pearls and uncut diamonds for pieces that feel regal yet fresh.',
    tone: 'dark',
    image: photos.brideEmerald,
  },
  {
    slug: 'everyday-luxury',
    name: 'Everyday Luxury',
    kicker: 'Fine jewellery, lightly worn',
    summary: 'Subtle fine jewellery — studs, slim kadas and rings you can wear from morning to evening.',
    story:
      'Everyday Luxury is our quietest collection: smaller scale, lighter weight and finished to be lived in, not kept in a locker.',
    tone: 'light',
    image: photos.brideSunlit,
  },
]

export const getCollection = (slug: string | undefined) => collections.find((c) => c.slug === slug)
