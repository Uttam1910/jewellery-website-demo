/** Fictional demo testimonials — not real customers. */
export interface Testimonial {
  quote: string
  name: string
  clientType: string
  city: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Absolutely stunning collection and exceptional service. My bridal jewellery was everything I dreamed of — and the team helped me plan pieces for every ceremony.',
    name: 'Priya S.',
    clientType: 'Bridal client',
    city: 'Mumbai',
    rating: 5,
  },
  {
    quote:
      'The craftsmanship and detail are unmatched. Aurelia creates pieces that feel truly timeless — my polki choker already feels like an heirloom.',
    name: 'Ananya K.',
    clientType: 'Loyal customer',
    city: 'Pune',
    rating: 5,
  },
  {
    quote: 'A perfect blend of tradition and modern elegance. I always receive compliments on my jewellery.',
    name: 'Rhea M.',
    clientType: 'Repeat buyer',
    city: 'Bengaluru',
    rating: 5,
  },
  {
    quote:
      'We designed my mother’s anniversary ring together over a virtual consultation. Patient, thoughtful and beautifully finished.',
    name: 'Kabir & Meera T.',
    clientType: 'Bespoke design',
    city: 'Delhi',
    rating: 5,
  },
  {
    quote:
      'The private styling appointment made choosing my wedding jewellery calm and joyful. Every piece had a story behind it.',
    name: 'Ishita R.',
    clientType: 'Bridal styling',
    city: 'Jaipur',
    rating: 5,
  },
]
