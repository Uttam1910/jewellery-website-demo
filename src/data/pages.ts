/** Copy for the information pages. All policies are placeholders for a demo website. */
export interface InfoSection {
  heading: string
  body: string[]
}

export interface InfoPageContent {
  slug: string
  eyebrow: string
  title: string
  intro: string
  metaDescription: string
  sections: InfoSection[]
}

export const infoPages: Record<'privacy' | 'terms' | 'shipping' | 'returns' | 'care', InfoPageContent> = {
  privacy: {
    slug: 'privacy',
    eyebrow: 'Legal',
    title: 'Privacy Policy',
    intro:
      'This is a demo website. No personal data entered on this site is transmitted, stored on a server, or shared with anyone.',
    metaDescription: 'Privacy policy for the AURELIA Fine Jewellery demo website.',
    sections: [
      {
        heading: 'What this demo stores',
        body: [
          'Your wishlist and shopping bag are saved only in your own browser (localStorage) so they survive a page refresh. You can clear them at any time by emptying the bag and wishlist or clearing your browser data.',
          'Appointment, newsletter and checkout forms are simulated. Details you type are validated in your browser and then discarded — they are never sent anywhere.',
        ],
      },
      {
        heading: 'Cookies and analytics',
        body: ['This demo does not use tracking cookies, advertising pixels or analytics.'],
      },
      {
        heading: 'For a real business',
        body: [
          'A live jewellery brand would replace this page with its own policy covering how customer information is collected, used and protected, in line with applicable Indian data-protection law.',
        ],
      },
    ],
  },
  terms: {
    slug: 'terms',
    eyebrow: 'Legal',
    title: 'Terms of Use',
    intro: 'AURELIA is a fictional brand created to demonstrate a jewellery website design. Nothing on this site is for sale.',
    metaDescription: 'Terms of use for the AURELIA Fine Jewellery demo website.',
    sections: [
      {
        heading: 'Demo content',
        body: [
          'Products, prices, collections, testimonials, certifications and contact details are illustrative. They do not represent real inventory, real customers or a real store.',
          'Photography is used under the Unsplash License. The jewellery pictured is not made or sold by AURELIA.',
        ],
      },
      {
        heading: 'No transactions',
        body: [
          'Adding to bag, checkout and appointment booking are simulated in your browser. No payment is taken, no order is placed and no appointment is booked.',
        ],
      },
    ],
  },
  shipping: {
    slug: 'shipping',
    eyebrow: 'Customer care',
    title: 'Shipping',
    intro: 'How a jewellery house like AURELIA might deliver fine jewellery. Demo information — no orders are shipped.',
    metaDescription: 'Sample shipping information for the AURELIA Fine Jewellery demo website.',
    sections: [
      {
        heading: 'Insured delivery',
        body: [
          'Every piece would travel fully insured in tamper-evident packaging, with signature required on delivery.',
          'Typical timelines: ready pieces in 3–5 working days within India; made-to-order and bridal pieces in 3–6 weeks.',
        ],
      },
      {
        heading: 'Presentation',
        body: ['Pieces arrive in an AURELIA keepsake box with a care card and a certificate of authenticity (in a real store).'],
      },
      {
        heading: 'International',
        body: ['International shipping would be quoted on request, including duties and insurance.'],
      },
    ],
  },
  returns: {
    slug: 'returns',
    eyebrow: 'Customer care',
    title: 'Returns & Exchanges',
    intro: 'A sample returns policy for a fine jewellery brand. Demo information only.',
    metaDescription: 'Sample returns and exchange policy for the AURELIA Fine Jewellery demo website.',
    sections: [
      {
        heading: 'Ready pieces',
        body: [
          'Unworn pieces in original packaging could be returned within 15 days of delivery for a full refund to the original payment method.',
        ],
      },
      {
        heading: 'Made-to-order and bespoke',
        body: ['Bespoke, engraved and resized pieces are created for you and would not be eligible for return, but remain covered by lifetime care.'],
      },
      {
        heading: 'Lifetime exchange',
        body: ['Many Indian jewellers offer lifetime exchange on gold value. A real business would describe its own terms here.'],
      },
    ],
  },
  care: {
    slug: 'care',
    eyebrow: 'Customer care',
    title: 'Jewellery Care',
    intro: 'Fine jewellery is made to be worn. A little care keeps it beautiful for generations.',
    metaDescription: 'How to care for gold, polki, kundan and gemstone jewellery.',
    sections: [
      {
        heading: 'Everyday care',
        body: [
          'Put jewellery on last — after perfume, hairspray and make-up — and take it off first.',
          'Wipe gently with a soft, dry cloth after wearing to remove oils and moisture.',
        ],
      },
      {
        heading: 'Polki & kundan',
        body: [
          'Polki and kundan are set with gold foil and lac. Keep them away from water and never use ultrasonic cleaners.',
          'Store each piece flat in its own pouch so stones do not scratch one another.',
        ],
      },
      {
        heading: 'Pearls & emeralds',
        body: [
          'Pearls are soft and porous — wear them often, keep them dry and restring every few years.',
          'Emeralds are often oiled; avoid heat and harsh chemicals.',
        ],
      },
    ],
  },
}

export const faqs: { q: string; a: string }[] = [
  {
    q: 'Is AURELIA a real jewellery brand?',
    a: 'No. AURELIA is a fictional brand created as a website design demo. Products, prices and contact details are illustrative.',
  },
  {
    q: 'Can I actually buy the jewellery shown?',
    a: 'No. The bag and checkout work so you can experience the flow, but no payment is taken and no order is created.',
  },
  {
    q: 'What is the difference between polki and kundan?',
    a: 'Polki uses uncut, natural diamonds set in gold foil. Kundan is the traditional setting technique of layering gold foil around stones — often glass or gemstones — so the terms describe different things that are frequently used together.',
  },
  {
    q: 'Do you offer bridal styling appointments?',
    a: 'In this demo you can request a Bridal Styling appointment on the Appointments page to see how the flow works. No real booking is made.',
  },
  {
    q: 'Can pieces be customised?',
    a: 'A real atelier would offer resizing, stone changes and fully bespoke design. Try the Bespoke Design appointment type to see the enquiry flow.',
  },
  {
    q: 'How should I store polki jewellery?',
    a: 'Store each piece flat in a soft pouch, away from moisture, perfume and other jewellery. See our Jewellery Care page for more.',
  },
  {
    q: 'Is my wishlist saved?',
    a: 'Yes — your wishlist and bag are saved in your own browser only, so they are still there if you refresh the page.',
  },
]
