import { photos, type Photo } from './images'
import { products } from './products'

const p = (slug: string) => products.find((x) => x.slug === slug)!.images.main

/** Demo social strip. The handle is fictional; tiles are local images. */
export const instagramTiles: { photo: Photo; caption: string }[] = [
  { photo: photos.brideKundan, caption: 'Kundan for the sangeet' },
  { photo: p('emerald-drop-earrings'), caption: 'Emerald drops, new this season' },
  { photo: photos.brideMehndi, caption: 'Mehendi, gold and quiet moments' },
  { photo: photos.craftBench, caption: 'At the karigar’s bench' },
  { photo: photos.brideEmerald, caption: 'The emerald bride' },
  { photo: p('ruby-heritage-ring'), caption: 'Heirlooms in the making' },
]
