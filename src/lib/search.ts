import { collections } from '../data/collections'
import { categoryLabels, products, type Product } from '../data/products'

const synonyms: Partial<Record<Product['category'], string>> = {
  bracelets: 'bangle bangles kada bracelet cuff',
  earrings: 'earring jhumki studs',
  necklaces: 'necklace haar choker mala',
  sets: 'set sets',
}

const tokensFor = (p: Product) =>
  [
    p.name,
    p.category,
    categoryLabels[p.category],
    synonyms[p.category] ?? '',
    ...p.collections.map((c) => collections.find((x) => x.slug === c)?.name ?? c),
    ...p.occasion,
    ...p.materials,
  ]
    .join(' ')
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean)

const index = products.map((p) => ({ product: p, tokens: tokensFor(p) }))

/** Every query word must prefix-match a word in the product's name, category, collection, occasion or materials. */
export function searchProducts(query: string): Product[] {
  const words = query
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
    .map((w) => (w.length > 3 ? w.replace(/(es|s)$/, '') : w))
  if (words.length === 0) return []
  return index.filter(({ tokens }) => words.every((w) => tokens.some((t) => t.startsWith(w)))).map((x) => x.product)
}
