/**
 * Local, optimised WebP photography (see public/images/CREDITS.md for sources).
 * `small` is a narrower variant for srcset; `position` is the CSS object-position focal point.
 */
export interface Photo {
  src: string
  small?: string
  smallWidth?: number
  width: number
  height: number
  alt: string
  position?: string
}

const hero = (name: string, width: number, height: number, alt: string, position?: string): Photo => ({
  src: `/images/hero/${name}.webp`,
  small: `/images/hero/${name}-960.webp`,
  smallWidth: 960,
  width,
  height,
  alt,
  position,
})

const big = (name: string, width: number, height: number, alt: string, position?: string): Photo => ({
  src: `/images/editorial/${name}.webp`,
  small: `/images/editorial/${name}-${width > 1200 ? 960 : 640}.webp`,
  smallWidth: width > 1200 ? 960 : 640,
  width,
  height,
  alt,
  position,
})

export const photos = {
  heroBridal: hero(
    'bridal',
    1920,
    2400,
    'Indian bride in a red embroidered lehenga wearing a kundan choker, maang tikka and chooda bangles, lit by warm candlelight',
    '50% 25%',
  ),
  heroFine: hero(
    'fine',
    1600,
    2400,
    'Model in a maroon embroidered lehenga wearing a polki choker, chandbali earrings and maang tikka against a dark backdrop',
    '50% 22%',
  ),
  heroContemporary: hero(
    'contemporary',
    1597,
    2400,
    'Woman in a champagne lehenga wearing a layered polki necklace, passa headpiece and nose ring in soft amber light',
    '50% 25%',
  ),
  bridalBanner: big(
    'bridal-banner',
    1597,
    2400,
    'Close portrait of an Indian bride adjusting her maang tikka, wearing kundan chandbalis and a layered emerald and pearl necklace',
    '50% 30%',
  ),
  bridalHero: big(
    'bridal-hero',
    1832,
    2400,
    'Bride in a gold tissue lehenga wearing layered heritage gold necklaces beside a vintage gramophone',
    '50% 28%',
  ),
  storyPortrait: big(
    'story-portrait',
    1067,
    1600,
    'Woman in a blush lehenga wearing a statement polki and emerald necklace with a matching matha patti',
    '50% 30%',
  ),
  craftHands: big(
    'craft-hands',
    1920,
    1280,
    'Close-up of an artisan’s hands finishing a gemstone ring at the jeweller’s bench',
    '50% 50%',
  ),
  craftBench: big(
    'craft-bench',
    1200,
    800,
    'Jeweller setting stones into a ring with fine hand tools at a wooden workbench',
  ),
  craftTorch: big(
    'craft-torch',
    1200,
    798,
    'Goldsmith soldering precious metal with a fine torch in a workshop',
  ),
  palaceArches: big(
    'palace-arches',
    1129,
    1600,
    'Carved sandstone arches of a Rajasthani palace corridor in warm evening light',
  ),
  palaceRoom: big(
    'palace-room',
    1058,
    1600,
    'Ivory and gold palace hall with carved arches and a crystal chandelier',
    '50% 40%',
  ),
  brideGoldWall: big(
    'bride-gold-wall',
    1067,
    1600,
    'Bride in a red lehenga seated before a gilded backdrop, wearing a long rani haar and gold bangles',
    '50% 25%',
  ),
  brideVeil: big(
    'bride-veil',
    1067,
    1600,
    'Bride with a sheer red dupatta draped over her head wearing a gold temple necklace and chooda',
    '50% 30%',
  ),
  brideVelvet: big(
    'bride-velvet',
    1067,
    1600,
    'Bride in a black and gold velvet lehenga wearing a kundan choker, nath and red bangles, hands adorned with mehendi',
    '50% 25%',
  ),
  brideKundan: big(
    'bride-kundan',
    1067,
    1600,
    'Smiling bride in pink wearing a statement kundan necklace, large kundan earrings and maang tikka',
    '50% 25%',
  ),
  brideSunlit: big(
    'bride-sunlit',
    1067,
    1600,
    'Woman in an orange lehenga wearing an oversized kundan earring and maang tikka in soft daylight',
    '50% 25%',
  ),
  brideEmerald: big(
    'bride-emerald',
    1200,
    1500,
    'Bride wearing a polki and emerald choker with a matching maang tikka and nose ring',
    '50% 30%',
  ),
  brideMehndi: big(
    'bride-mehndi',
    1200,
    800,
    'Bride’s hands decorated with mehendi resting on a gold embroidered lehenga with fine gold bangles',
  ),
  brideChokerMehndi: big(
    'bride-choker-mehndi',
    1067,
    1600,
    'Detail of a layered gold bridal choker and ruby-set necklace with mehendi-painted hands',
    '50% 30%',
  ),
  brideNath: big(
    'bride-nath',
    1067,
    1600,
    'Bride in red wearing a large gold nath, emerald and kundan necklace and a jewelled headpiece',
    '50% 25%',
  ),
  modelChoker: big(
    'model-choker',
    1067,
    1600,
    'Smiling woman wearing a polki choker with a violet centre stone and matching drop earrings',
    '50% 30%',
  ),
  bridePink: big(
    'bride-pink',
    1067,
    1600,
    'Bride in a pink dupatta wearing a gold choker, jhumkas and a maang tikka',
    '50% 25%',
  ),
} satisfies Record<string, Photo>

export type PhotoKey = keyof typeof photos
