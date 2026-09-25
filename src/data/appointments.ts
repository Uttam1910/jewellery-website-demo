import { CalendarHeart, Gem, Sparkles, Video, type LucideIcon } from 'lucide-react'

export type AppointmentTypeId = 'in-store' | 'virtual' | 'bridal-styling' | 'bespoke'

export interface AppointmentType {
  id: AppointmentTypeId
  label: string
  short: string
  description: string
  duration: string
  icon: LucideIcon
}

export const appointmentTypes: AppointmentType[] = [
  {
    id: 'in-store',
    label: 'In-Store Experience',
    short: 'In Store Experience',
    description: 'A private viewing at our boutique with a jewellery consultant and refreshments.',
    duration: '60 minutes',
    icon: CalendarHeart,
  },
  {
    id: 'virtual',
    label: 'Virtual Consultation',
    short: 'Virtual Consultation',
    description: 'See pieces up close over video call, from anywhere in the world.',
    duration: '30 minutes',
    icon: Video,
  },
  {
    id: 'bridal-styling',
    label: 'Bridal Styling',
    short: 'Bridal Styling',
    description: 'Plan jewellery across every ceremony with our bridal stylist, outfit swatches welcome.',
    duration: '90 minutes',
    icon: Sparkles,
  },
  {
    id: 'bespoke',
    label: 'Bespoke Design',
    short: 'Bespoke Designs',
    description: 'Sketch a one-of-a-kind piece with our designers, or reimagine an heirloom.',
    duration: '75 minutes',
    icon: Gem,
  },
]

export const isAppointmentType = (v: string | null): v is AppointmentTypeId =>
  appointmentTypes.some((t) => t.id === v)
