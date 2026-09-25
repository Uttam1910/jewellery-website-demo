/**
 * Single place for every client-customisable detail.
 * Swap these values to rebrand the template for a real jewellery business.
 */
export const jewelleryConfig = {
  brand: 'AURELIA',
  descriptor: 'FINE JEWELLERY',
  tagline: 'Made to be remembered.',
  siteUrl: 'https://aurelia-demo.example.com',

  phone: '+91 00000 00000',
  phoneHref: 'tel:+910000000000',
  email: 'hello@example.com',
  /** International format without "+" — used for wa.me links */
  whatsapp: '910000000000',

  instagramHandle: '@aureliafinejewellery',
  instagram: 'https://instagram.com/aureliafinejewellery',
  facebook: 'https://facebook.com/aureliafinejewellery',
  pinterest: 'https://pinterest.com/aureliafinejewellery',

  location: {
    label: 'Demo Location',
    line1: 'Demo Location',
    city: 'Mumbai',
    region: 'Maharashtra',
    full: 'Demo Location, Mumbai, Maharashtra',
    directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Mumbai%2C+Maharashtra',
  },

  hours: [
    { days: 'Monday – Saturday', time: '11:00 am – 8:00 pm' },
    { days: 'Sunday', time: 'By appointment' },
  ],

  appointmentSlots: ['11:00 am', '12:30 pm', '2:00 pm', '3:30 pm', '5:00 pm', '6:30 pm'],

  colors: {
    ivory: '#f8f4ec',
    champagne: '#e8dcc6',
    gold: '#b0915c',
    charcoal: '#2b2621',
    ink: '#17130f',
  },

  /** Shows "demo" badges and disclaimers across the site. Keep true for the showcase. */
  showDemoLabels: true,
  freeShippingNote: 'Complimentary insured shipping across India (demo)',
} as const

export type JewelleryConfig = typeof jewelleryConfig

export const whatsappLink = (message = 'Hello AURELIA, I would like to know more about your jewellery.') =>
  `https://wa.me/${jewelleryConfig.whatsapp}?text=${encodeURIComponent(message)}`
