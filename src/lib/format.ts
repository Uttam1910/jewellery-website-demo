const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })

/** ₹4,35,000 — Indian digit grouping */
export const formatPrice = (value: number) => inr.format(value)

export const cx = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(' ')
