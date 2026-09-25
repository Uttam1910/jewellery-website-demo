import { photos, type Photo } from './images'
import type { CollectionSlug } from './collections'

/**
 * Fictional demo catalogue. Names, prices and specifications are illustrative only —
 * nothing here represents real inventory.
 */

export type Category = 'necklaces' | 'earrings' | 'rings' | 'bracelets' | 'sets'
export type Occasion = 'Bridal' | 'Festive' | 'Engagement' | 'Everyday' | 'Cocktail' | 'Gifting'

export interface Product {
  id: string
  slug: string
  name: string
  category: Category
  collections: CollectionSlug[]
  price: number
  description: string
  details: string
  materials: string[]
  occasion: Occasion[]
  featured: boolean
  newArrival: boolean
  /** Higher = more recently added. Used for "Newest" sorting. */
  added: number
  metal: string
  weight: string
  images: {
    main: Photo
    hover: Photo
    gallery: Photo[]
  }
}

export const categoryLabels: Record<Category, string> = {
  necklaces: 'Necklaces',
  earrings: 'Earrings',
  rings: 'Rings',
  bracelets: 'Bracelets & Bangles',
  sets: 'Sets',
}

const defaultLifestyle: Record<Category, Photo> = {
  necklaces: photos.brideKundan,
  earrings: photos.brideSunlit,
  rings: photos.brideMehndi,
  bracelets: photos.brideMehndi,
  sets: photos.brideGoldWall,
}

interface Seed {
  slug: string
  name: string
  category: Category
  collections: CollectionSlug[]
  price: number
  description: string
  details: string
  materials: string[]
  occasion: Occasion[]
  featured?: boolean
  newArrival?: boolean
  metal: string
  weight: string
  /** [width, height] of the main product photo */
  size: [number, number]
  photoAlt: string
  position?: string
  lifestyle?: Photo
  /** Use the lifestyle photo (rather than the close-up) on card hover */
  hoverLifestyle?: boolean
  extra?: Photo
}

const productPhoto = (slug: string, [width, height]: [number, number], alt: string, position?: string): Photo => ({
  src: `/images/products/${slug}.webp`,
  small: `/images/products/${slug}-480.webp`,
  smallWidth: 480,
  width,
  height,
  alt,
  position,
})

const seeds: Seed[] = [
  {
    slug: 'royal-emerald-polki-necklace',
    name: 'Royal Emerald Polki Necklace',
    category: 'necklaces',
    collections: ['bridal', 'polki', 'emerald'],
    price: 435000,
    description:
      'A stunning polki necklace with emerald drops, handcrafted for modern brides. A perfect blend of tradition and luxury.',
    details:
      'Seven strands of seed pearls lead to a central emerald framed by uncut polki, finished with a fringe of baroque pearl and polki drops. Designed to sit at the base of the neck and pair with a long haar.',
    materials: ['22kt yellow gold', 'Uncut polki diamonds', 'Emerald centre stone', 'Freshwater seed pearls'],
    occasion: ['Bridal', 'Festive'],
    featured: true,
    metal: '22kt yellow gold',
    weight: 'Approx. 86 g',
    size: [900, 1125],
    photoAlt: 'Royal Emerald Polki Necklace — multi-strand pearl choker with a square emerald and polki drops on green silk',
    position: '40% 40%',
    lifestyle: photos.brideEmerald,
    hoverLifestyle: true,
  },
  {
    slug: 'polki-choker-set',
    name: 'Polki Choker Set',
    category: 'sets',
    collections: ['bridal', 'polki', 'heritage'],
    price: 285000,
    description:
      'An antique gold choker lined with polki, finished with a ruby-set chandbali pendant and matching earrings.',
    details:
      'Hand-chased gold links are edged with a row of uncut polki. The crescent pendant carries ruby drops and a single pearl, echoed in the matching chandbali earrings.',
    materials: ['22kt antique-finish gold', 'Uncut polki diamonds', 'Rubies', 'Pearl drops'],
    occasion: ['Bridal', 'Festive'],
    featured: true,
    newArrival: true,
    metal: '22kt antique gold',
    weight: 'Approx. 72 g (set)',
    size: [900, 600],
    photoAlt: 'Polki Choker Set — antique gold choker with polki row, ruby chandbali pendant and matching earrings',
    lifestyle: photos.brideKundan,
    hoverLifestyle: true,
  },
  {
    slug: 'emerald-drop-earrings',
    name: 'Emerald Drop Earrings',
    category: 'earrings',
    collections: ['emerald', 'contemporary'],
    price: 120000,
    description: 'Crescent chandbalis set with emerald-green stones and finished with a delicate pearl fringe.',
    details:
      'A floral emerald stud leads into an openwork crescent paved with green stones, softened with a fringe of seed pearls. Lightweight enough for an evening of dancing.',
    materials: ['18kt yellow gold', 'Emeralds', 'Seed pearls'],
    occasion: ['Festive', 'Cocktail', 'Bridal'],
    featured: true,
    newArrival: true,
    metal: '18kt yellow gold',
    weight: 'Approx. 18 g (pair)',
    size: [900, 798],
    photoAlt: 'Emerald Drop Earrings — pair of emerald-green chandbali earrings with pearl fringe',
    lifestyle: photos.brideNath,
  },
  {
    slug: 'ruby-heritage-ring',
    name: 'Ruby Heritage Ring',
    category: 'rings',
    collections: ['heritage'],
    price: 95000,
    description: 'A deep red ruby held in a hand-engraved gold setting, inspired by heirloom rings passed between generations.',
    details:
      'The oval ruby sits high in a crown of milgrain gold, with engraved shoulders that taper into a comfortable band. Resizable by our atelier.',
    materials: ['22kt yellow gold', 'Ruby centre stone'],
    occasion: ['Engagement', 'Festive', 'Gifting'],
    featured: true,
    newArrival: true,
    metal: '22kt yellow gold',
    weight: 'Approx. 7 g',
    size: [900, 600],
    photoAlt: 'Ruby Heritage Ring — oval ruby in an engraved gold setting resting on pearls',
  },
  {
    slug: 'kundan-bangle-set',
    name: 'Kundan Bangle Set',
    category: 'bracelets',
    collections: ['bridal', 'heritage'],
    price: 175000,
    description: 'A pair of openwork bangles set with rubies and kundan, made to be stacked with a bridal chooda.',
    details:
      'Latticed gold panels alternate with oval rubies and champagne kundan. Sold as a pair, with a screw clasp for easy wear.',
    materials: ['22kt yellow gold', 'Kundan', 'Rubies'],
    occasion: ['Bridal', 'Festive'],
    featured: true,
    newArrival: true,
    metal: '22kt yellow gold',
    weight: 'Approx. 64 g (pair)',
    size: [900, 600],
    photoAlt: 'Kundan Bangle Set — pair of openwork gold bangles set with rubies and kundan',
    lifestyle: photos.brideMehndi,
    hoverLifestyle: true,
  },
  {
    slug: 'aarohi-temple-necklace',
    name: 'Aarohi Temple Necklace',
    category: 'necklaces',
    collections: ['heritage', 'bridal'],
    price: 268000,
    description: 'A South Indian temple necklace of hand-chased gold petals, with ruby accents and matching studs.',
    details:
      'Graduated gold petals are strung into a supple collar, each tipped with a tiny ruby. Inspired by the adornments of temple deities.',
    materials: ['22kt yellow gold', 'Rubies'],
    occasion: ['Bridal', 'Festive'],
    featured: true,
    metal: '22kt yellow gold',
    weight: 'Approx. 58 g',
    size: [900, 624],
    photoAlt: 'Aarohi Temple Necklace — gold petal necklace with ruby accents and matching earrings on black',
    lifestyle: photos.brideVeil,
    hoverLifestyle: true,
  },
  {
    slug: 'meher-kundan-choker',
    name: 'Meher Kundan Choker',
    category: 'necklaces',
    collections: ['heritage', 'polki'],
    price: 198000,
    description: 'An antique gold necklace with a kundan medallion, displayed on deep red velvet.',
    details:
      'Fine gold links frame a carved central medallion set with kundan, finished with an antique wash that brings out every engraved line.',
    materials: ['22kt antique-finish gold', 'Kundan'],
    occasion: ['Festive', 'Bridal'],
    metal: '22kt antique gold',
    weight: 'Approx. 44 g',
    size: [900, 1200],
    photoAlt: 'Meher Kundan Choker — antique gold necklace with a kundan medallion on red velvet',
    lifestyle: photos.brideVelvet,
    hoverLifestyle: true,
  },
  {
    slug: 'kesar-antique-necklace',
    name: 'Kesar Antique Necklace',
    category: 'necklaces',
    collections: ['heritage'],
    price: 156000,
    description: 'A warm antique-gold collar with ruby-dotted motifs and a pair of matching drop earrings.',
    details:
      'Saffron-toned gold with hand-set rubies, designed to lie flat along the collarbone. Earrings included.',
    materials: ['22kt antique-finish gold', 'Rubies'],
    occasion: ['Festive', 'Gifting'],
    metal: '22kt antique gold',
    weight: 'Approx. 38 g',
    size: [900, 561],
    photoAlt: 'Kesar Antique Necklace — antique gold collar with ruby-dotted motifs and matching earrings',
    lifestyle: photos.brideChokerMehndi,
  },
  {
    slug: 'lakshmi-pendant-haar',
    name: 'Lakshmi Pendant Haar',
    category: 'necklaces',
    collections: ['heritage'],
    price: 212000,
    description: 'A long gold haar with a domed filigree pendant and a fringe of ruby beads.',
    details:
      'A textured gold chain carries a hand-granulated dome pendant finished with tiny ruby beads — made to be worn long over a saree.',
    materials: ['22kt yellow gold', 'Ruby beads'],
    occasion: ['Festive', 'Bridal'],
    metal: '22kt yellow gold',
    weight: 'Approx. 52 g',
    size: [900, 600],
    photoAlt: 'Lakshmi Pendant Haar — long gold chain with domed filigree pendant and ruby fringe',
    lifestyle: photos.brideGoldWall,
  },
  {
    slug: 'gulbahar-bridal-set',
    name: 'Gulbahar Bridal Set',
    category: 'sets',
    collections: ['bridal', 'heritage'],
    price: 565000,
    description: 'A complete bridal set — layered rani haar, floral studs, bangles and matha patti in warm gold.',
    details:
      'Three strands of gold beads fall into a floral pendant, with matching studs, a pair of bangles and a matha patti. The set can be worn together or separated across ceremonies.',
    materials: ['22kt yellow gold', 'Rubies', 'Emeralds'],
    occasion: ['Bridal'],
    featured: true,
    metal: '22kt yellow gold',
    weight: 'Approx. 138 g (set)',
    size: [900, 600],
    photoAlt: 'Gulbahar Bridal Set — layered gold necklace, earrings, bangles and matha patti on dark stone',
    lifestyle: photos.bridePink,
    hoverLifestyle: true,
  },
  {
    slug: 'padmini-kemp-set',
    name: 'Padmini Kemp Set',
    category: 'sets',
    collections: ['heritage', 'bridal'],
    price: 248000,
    description: 'A lotus-motif kemp necklace with emerald centres and matching pearl jhumkas.',
    details:
      'Traditional red kemp stones form lotus flowers around emerald centres, strung on a woven gold chain and finished with pearl-edged jhumkas.',
    materials: ['22kt yellow gold', 'Kemp stones', 'Emeralds', 'Pearls'],
    occasion: ['Bridal', 'Festive'],
    metal: '22kt yellow gold',
    weight: 'Approx. 66 g (set)',
    size: [900, 600],
    photoAlt: 'Padmini Kemp Set — lotus kemp necklace with emerald centres and pearl jhumkas on a white cushion',
    extra: productPhoto(
      'padmini-kemp-set-alt',
      [800, 1200],
      'Padmini Kemp Set — alternate view of the pendant and pearl jhumkas',
    ),
  },
  {
    slug: 'noor-e-zamrud-necklace',
    name: 'Noor-e-Zamrud Necklace',
    category: 'necklaces',
    collections: ['emerald', 'contemporary'],
    price: 342000,
    description: 'A fine rose-gold collar of diamond clusters and emerald drops — light, fluid and modern.',
    details:
      'Graduated diamond clusters open into pear-shaped emerald drops, on a slim rose-gold chain with an adjustable clasp.',
    materials: ['18kt rose gold', 'Diamonds', 'Emeralds'],
    occasion: ['Engagement', 'Cocktail'],
    featured: true,
    metal: '18kt rose gold',
    weight: 'Approx. 26 g',
    size: [900, 600],
    photoAlt: 'Noor-e-Zamrud Necklace — rose gold diamond necklace with emerald drops on deep blue',
    lifestyle: photos.storyPortrait,
  },
  {
    slug: 'rajkumari-temple-set',
    name: 'Rajkumari Temple Set',
    category: 'sets',
    collections: ['heritage', 'bridal'],
    price: 395000,
    description: 'A temple necklace with a deity-motif pendant, ruby and emerald beads, and matching chandbalis.',
    details:
      'An antique gold collar of coin motifs anchors a carved pendant edged with ruby beads. Matching chandbalis with emerald drops complete the set.',
    materials: ['22kt antique-finish gold', 'Rubies', 'Emeralds'],
    occasion: ['Bridal', 'Festive'],
    metal: '22kt antique gold',
    weight: 'Approx. 96 g (set)',
    size: [900, 506],
    photoAlt: 'Rajkumari Temple Set — antique temple necklace and chandbali earrings displayed on a black bust',
    lifestyle: photos.brideVeil,
  },
  {
    slug: 'kairi-mala-set',
    name: 'Kairi Mala Set',
    category: 'sets',
    collections: ['contemporary', 'emerald'],
    price: 318000,
    description: 'A mango-motif mala in diamonds with a ruby centre, emerald drops and matching earrings.',
    details:
      'Paisley (kairi) motifs pavé-set with diamonds lead to a ruby centrepiece and a trio of emerald drops. Earrings included.',
    materials: ['18kt white and rose gold', 'Diamonds', 'Ruby', 'Emeralds'],
    occasion: ['Festive', 'Cocktail'],
    metal: '18kt gold',
    weight: 'Approx. 48 g (set)',
    size: [800, 1200],
    photoAlt: 'Kairi Mala Set — diamond mango-motif necklace with ruby centre and emerald drops on a black bust',
  },
  {
    slug: 'moti-mahal-necklace',
    name: 'Moti Mahal Necklace',
    category: 'necklaces',
    collections: ['bridal', 'heritage'],
    price: 226000,
    description: 'A woven gold necklace with a pearl fringe and a diamond-and-ruby pendant.',
    details:
      'A flexible mesh of gold is edged with pearls and centred on a teardrop pendant of diamonds around a single ruby.',
    materials: ['22kt yellow gold', 'Diamonds', 'Ruby', 'Pearls'],
    occasion: ['Bridal', 'Festive'],
    metal: '22kt yellow gold',
    weight: 'Approx. 54 g',
    size: [900, 900],
    photoAlt: 'Moti Mahal Necklace — woven gold necklace with pearl fringe and diamond ruby pendant on red',
  },
  {
    slug: 'shahi-polki-choker',
    name: 'Shahi Polki Choker',
    category: 'sets',
    collections: ['polki', 'bridal'],
    price: 612000,
    description: 'An heirloom-scale polki collar with a detachable pendant and long drop earrings.',
    details:
      'Lace-like floral scrolls are set entirely with uncut diamonds. The central pendant detaches to be worn on its own.',
    materials: ['18kt white gold', 'Uncut polki diamonds'],
    occasion: ['Bridal', 'Cocktail'],
    featured: true,
    metal: '18kt white gold',
    weight: 'Approx. 112 g (set)',
    size: [900, 735],
    photoAlt: 'Shahi Polki Choker — lace-like polki diamond collar with pendant and drop earrings on black',
  },
  {
    slug: 'kairi-paisley-jhumkas',
    name: 'Kairi Paisley Jhumkas',
    category: 'earrings',
    collections: ['heritage'],
    price: 86000,
    description: 'Filigree paisley jhumkas with a gold chain support for the ear.',
    details:
      'Open filigree paisleys lead into bell-shaped jhumkas. A delicate sahara chain supports the weight and frames the face.',
    materials: ['22kt yellow gold'],
    occasion: ['Festive', 'Bridal'],
    metal: '22kt yellow gold',
    weight: 'Approx. 22 g (pair)',
    size: [900, 1117],
    photoAlt: 'Kairi Paisley Jhumkas — gold filigree paisley jhumka earrings on black cloth',
  },
  {
    slug: 'meenakshi-temple-jhumkas',
    name: 'Meenakshi Temple Jhumkas',
    category: 'earrings',
    collections: ['heritage', 'bridal'],
    price: 112000,
    description: 'Temple jhumkas with peacock tops, kemp stones and a cascade of gold beads.',
    details:
      'Carved peacock studs sit above domed jhumkas set with red and green kemp, finished with a fringe of gold ghungroo beads.',
    materials: ['22kt antique-finish gold', 'Kemp stones'],
    occasion: ['Bridal', 'Festive'],
    metal: '22kt antique gold',
    weight: 'Approx. 30 g (pair)',
    size: [900, 600],
    photoAlt: 'Meenakshi Temple Jhumkas — antique gold temple jhumkas with red and green kemp hanging from a branch',
  },
  {
    slug: 'devi-ruby-jhumkas',
    name: 'Devi Ruby Jhumkas',
    category: 'earrings',
    collections: ['heritage'],
    price: 98000,
    description: 'Lakshmi-motif jhumkas paved in tiny rubies, finished with gold bead fringes.',
    details:
      'A carved Lakshmi motif crowns each jhumka, densely set with small rubies and edged with gold beads.',
    materials: ['22kt yellow gold', 'Rubies'],
    occasion: ['Festive', 'Gifting'],
    metal: '22kt yellow gold',
    weight: 'Approx. 26 g (pair)',
    size: [900, 600],
    photoAlt: 'Devi Ruby Jhumkas — ruby-set temple jhumkas displayed on a wooden stand',
  },
  {
    slug: 'chandni-chandbalis',
    name: 'Chandni Chandbalis',
    category: 'earrings',
    collections: ['bridal', 'polki'],
    price: 134000,
    description: 'Crescent chandbalis with polki, ruby accents and a double row of pearls.',
    details:
      'Uncut polki and rubies trace a crescent moon, finished with two tiers of pearls that move softly as you do.',
    materials: ['22kt yellow gold', 'Uncut polki diamonds', 'Rubies', 'Pearls'],
    occasion: ['Bridal', 'Festive'],
    featured: true,
    metal: '22kt yellow gold',
    weight: 'Approx. 28 g (pair)',
    size: [900, 600],
    photoAlt: 'Chandni Chandbalis — polki and ruby crescent earrings with pearl rows',
    lifestyle: photos.bridalBanner,
    hoverLifestyle: true,
  },
  {
    slug: 'rani-ruby-drops',
    name: 'Rani Ruby Drops',
    category: 'earrings',
    collections: ['contemporary'],
    price: 74000,
    description: 'Pear-shaped ruby drops framed with a halo of pearls and diamonds.',
    details: 'A ruby stud leads to a pear-cut ruby framed in diamonds and seed pearls.',
    materials: ['18kt yellow gold', 'Rubies', 'Diamonds', 'Seed pearls'],
    occasion: ['Cocktail', 'Engagement', 'Gifting'],
    metal: '18kt yellow gold',
    weight: 'Approx. 12 g (pair)',
    size: [895, 1200],
    photoAlt: 'Rani Ruby Drops — pear-shaped ruby earrings with pearl and diamond halo',
  },
  {
    slug: 'noor-pearl-earrings',
    name: 'Noor Pearl Jaal Earrings',
    category: 'earrings',
    collections: ['everyday-luxury', 'contemporary'],
    price: 58000,
    description: 'A lattice of kundan and pearls that falls into a soft chandelier drop.',
    details: 'Kundan-set links form an open jaal (net) with pearls at every joint — light and fluid on the ear.',
    materials: ['18kt yellow gold', 'Kundan', 'Pearls'],
    occasion: ['Everyday', 'Festive', 'Gifting'],
    metal: '18kt yellow gold',
    weight: 'Approx. 10 g (pair)',
    size: [900, 948],
    photoAlt: 'Noor Pearl Jaal Earrings — kundan and pearl lattice earrings beside a peacock feather',
  },
  {
    slug: 'zoya-diamond-studs',
    name: 'Zoya Diamond Studs',
    category: 'earrings',
    collections: ['everyday-luxury'],
    price: 64000,
    description: 'Floral studs with a single central stone ringed by smaller diamonds.',
    details: 'A classic flower-head stud in yellow gold — the everyday pair that goes with everything.',
    materials: ['18kt yellow gold', 'Diamonds'],
    occasion: ['Everyday', 'Gifting', 'Engagement'],
    metal: '18kt yellow gold',
    weight: 'Approx. 6 g (pair)',
    size: [900, 600],
    photoAlt: 'Zoya Diamond Studs — pair of floral diamond stud earrings in yellow gold',
  },
  {
    slug: 'swarna-jhumkas',
    name: 'Swarna Jhumkas',
    category: 'earrings',
    collections: ['everyday-luxury', 'heritage'],
    price: 52000,
    description: 'Polished gold jhumkas with filigree tops — a timeless everyday classic.',
    details: 'Hand-pierced filigree tops lead to bright, lightweight domes. Comfortable enough to wear all day.',
    materials: ['22kt yellow gold'],
    occasion: ['Everyday', 'Festive', 'Gifting'],
    metal: '22kt yellow gold',
    weight: 'Approx. 11 g (pair)',
    size: [900, 600],
    photoAlt: 'Swarna Jhumkas — polished gold filigree jhumka earrings on soft white fabric',
  },
  {
    slug: 'navratna-heritage-ring',
    name: 'Navratna Heritage Ring',
    category: 'rings',
    collections: ['heritage'],
    price: 118000,
    description: 'A domed cocktail ring with an emerald centre, ringed with rubies and granulated gold.',
    details:
      'Inspired by navratna talismans, the domed face is worked in fine granulation around a cabochon emerald and coloured stones.',
    materials: ['22kt yellow gold', 'Emerald', 'Rubies', 'Coloured gemstones'],
    occasion: ['Festive', 'Cocktail'],
    metal: '22kt yellow gold',
    weight: 'Approx. 14 g',
    size: [900, 600],
    photoAlt: 'Navratna Heritage Ring — domed gold cocktail ring with emerald centre and ruby accents',
    position: '65% 50%',
  },
  {
    slug: 'tara-polki-ring',
    name: 'Tara Polki Ring',
    category: 'rings',
    collections: ['polki', 'everyday-luxury'],
    price: 82000,
    description: 'A starburst of polki around a central uncut diamond on a slim gold band.',
    details: 'Uncut diamonds form a flower-head around a larger centre stone — a polki ring light enough for everyday.',
    materials: ['22kt yellow gold', 'Uncut polki diamonds'],
    occasion: ['Engagement', 'Everyday', 'Gifting'],
    metal: '22kt yellow gold',
    weight: 'Approx. 6 g',
    size: [900, 600],
    photoAlt: 'Tara Polki Ring — flower-shaped polki ring with an uncut diamond centre',
    position: '65% 50%',
  },
  {
    slug: 'panna-emerald-ring',
    name: 'Panna Emerald Ring',
    category: 'rings',
    collections: ['emerald', 'everyday-luxury'],
    price: 68000,
    description: 'A slim emerald solitaire on a fine gold band — understated and endlessly wearable.',
    details: 'An emerald-cut green stone is held in four claws on a knife-edge band.',
    materials: ['18kt yellow gold', 'Emerald'],
    occasion: ['Engagement', 'Everyday', 'Gifting'],
    newArrival: true,
    metal: '18kt yellow gold',
    weight: 'Approx. 3 g',
    size: [801, 1200],
    photoAlt: 'Panna Emerald Ring — slim gold emerald solitaire ring on a black display hand',
    position: '45% 35%',
  },
  {
    slug: 'gulab-cluster-ring',
    name: 'Gulab Cluster Ring',
    category: 'rings',
    collections: ['contemporary'],
    price: 89000,
    description: 'A cluster of champagne stones arranged like an unfurling rose on a split-shank band.',
    details: 'Pear and round champagne stones form a rose-like cluster; the split shank lifts the setting gracefully.',
    materials: ['18kt yellow gold', 'Champagne diamonds'],
    occasion: ['Cocktail', 'Engagement'],
    newArrival: true,
    metal: '18kt yellow gold',
    weight: 'Approx. 5 g',
    size: [900, 600],
    photoAlt: 'Gulab Cluster Ring — champagne stone cluster ring on linen',
  },
  {
    slug: 'sindoor-ruby-bangles',
    name: 'Sindoor Ruby Bangles',
    category: 'bracelets',
    collections: ['bridal'],
    price: 188000,
    description: 'Stacked bridal bangles set with round rubies in beaded gold collets.',
    details: 'Each bangle carries a continuous row of ruby collets framed with granulated gold — sold as a pair.',
    materials: ['22kt yellow gold', 'Rubies'],
    occasion: ['Bridal'],
    newArrival: true,
    metal: '22kt yellow gold',
    weight: 'Approx. 70 g (pair)',
    size: [900, 634],
    photoAlt: 'Sindoor Ruby Bangles — pair of gold bangles set with round rubies on a reflective surface',
    lifestyle: photos.brideVelvet,
  },
  {
    slug: 'sitara-polki-bangles',
    name: 'Sitara Kundan Bangles',
    category: 'bracelets',
    collections: ['polki', 'bridal'],
    price: 164000,
    description: 'Openwork kundan bangles with a sparkling scalloped edge and hinged opening.',
    details: 'Scalloped openwork panels are set with kundan and finished with a hinged opening and safety clasp.',
    materials: ['22kt yellow gold', 'Kundan'],
    occasion: ['Bridal', 'Festive'],
    metal: '22kt yellow gold',
    weight: 'Approx. 48 g (pair)',
    size: [848, 1200],
    photoAlt: 'Sitara Kundan Bangles — pair of openwork kundan bangles on black',
  },
  {
    slug: 'jaali-gold-kada',
    name: 'Jaali Gold Kada',
    category: 'bracelets',
    collections: ['contemporary', 'everyday-luxury'],
    price: 92000,
    description: 'A modern kada with a pierced jaali pattern and satin-finish gold.',
    details: 'Inspired by carved stone jaali screens, this kada pairs pierced panels with a satin finish.',
    materials: ['18kt yellow gold'],
    occasion: ['Everyday', 'Gifting'],
    metal: '18kt yellow gold',
    weight: 'Approx. 22 g',
    size: [900, 600],
    photoAlt: 'Jaali Gold Kada — pair of pierced gold cuffs reflecting on a dark surface',
  },
  {
    slug: 'swarna-bangle-stack',
    name: 'Swarna Bangle Stack',
    category: 'bracelets',
    collections: ['everyday-luxury', 'heritage'],
    price: 146000,
    description: 'A stack of six slim textured gold bangles to wear together or apart.',
    details: 'Six slender bangles with alternating hand-engraved and hammered textures.',
    materials: ['22kt yellow gold'],
    occasion: ['Everyday', 'Festive'],
    metal: '22kt yellow gold',
    weight: 'Approx. 54 g (set of six)',
    size: [900, 600],
    photoAlt: 'Swarna Bangle Stack — stack of slim textured gold bangles reflecting on black',
  },
  {
    slug: 'heera-polki-kada',
    name: 'Heera Polki Kada',
    category: 'bracelets',
    collections: ['polki'],
    price: 296000,
    description: 'A wide statement kada of uncut polki framed in a lace of brilliant diamonds.',
    details: 'A bold cuff with a central row of polki set within scrolling diamond lacework. Hinged for comfort.',
    materials: ['18kt white gold', 'Uncut polki diamonds', 'Diamonds'],
    occasion: ['Cocktail', 'Bridal'],
    newArrival: true,
    metal: '18kt white gold',
    weight: 'Approx. 40 g',
    size: [900, 599],
    photoAlt: 'Heera Polki Kada — wide polki and diamond cuff bracelet on black',
  },
]

export const products: Product[] = seeds.map((s, i) => {
  const main = productPhoto(s.slug, s.size, s.photoAlt, s.position)
  const detail: Photo = {
    src: `/images/products/${s.slug}-detail.webp`,
    width: 900,
    height: Math.round((900 * s.size[1]) / s.size[0]),
    alt: `Close-up of the ${s.name} showing stone setting and finish`,
  }
  const lifestyle = s.lifestyle ?? defaultLifestyle[s.category]
  const styled: Photo = { ...lifestyle, alt: `Styling inspiration: ${lifestyle.alt}` }
  const craft: Photo = {
    ...photos.craftHands,
    alt: 'Illustrative image: an artisan finishing a piece by hand at the jeweller’s bench',
  }
  const gallery = [main, detail, ...(s.extra ? [s.extra] : []), styled, craft]
  return {
    id: `AUR-${String(1001 + i)}`,
    slug: s.slug,
    name: s.name,
    category: s.category,
    collections: s.collections,
    price: s.price,
    description: s.description,
    details: s.details,
    materials: s.materials,
    occasion: s.occasion,
    featured: s.featured ?? false,
    newArrival: s.newArrival ?? false,
    added: seeds.length - i + (s.newArrival ? 100 : 0),
    metal: s.metal,
    weight: s.weight,
    images: { main, hover: s.hoverLifestyle ? styled : s.extra ?? detail, gallery },
  }
})

export const getProduct = (slug: string | undefined) => products.find((p) => p.slug === slug)

/** Products shown under the reference's New Arrivals row, in order */
export const newArrivalSlugs = ['polki-choker-set', 'emerald-drop-earrings', 'ruby-heritage-ring', 'kundan-bangle-set']

export const isBridal = (p: Product) => p.collections.includes('bridal') || p.occasion.includes('Bridal')

export const priceRanges = [
  { id: 'under-1l', label: 'Under ₹1,00,000', min: 0, max: 99999 },
  { id: '1l-2l', label: '₹1,00,000 – ₹2,50,000', min: 100000, max: 250000 },
  { id: '2l-4l', label: '₹2,50,000 – ₹4,00,000', min: 250001, max: 400000 },
  { id: 'above-4l', label: 'Above ₹4,00,000', min: 400001, max: Infinity },
] as const

export const occasions: Occasion[] = ['Bridal', 'Festive', 'Engagement', 'Cocktail', 'Everyday', 'Gifting']

export function relatedProducts(product: Product, count = 4) {
  const score = (p: Product) =>
    (p.category === product.category ? 2 : 0) + p.collections.filter((c) => product.collections.includes(c)).length
  return products
    .filter((p) => p.slug !== product.slug)
    .sort((a, b) => score(b) - score(a))
    .slice(0, count)
}
