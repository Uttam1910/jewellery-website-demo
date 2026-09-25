import { Minus, Plus } from 'lucide-react'
import { MAX_QTY } from '../context/store'
import { cx } from '../lib/format'

interface QtyStepperProps {
  value: number
  onChange: (value: number) => void
  label: string
  size?: 'sm' | 'md'
}

export function QtyStepper({ value, onChange, label, size = 'md' }: QtyStepperProps) {
  const box = size === 'sm' ? 'h-8 w-8' : 'h-11 w-11'
  return (
    <div className="inline-flex items-center border border-beige" role="group" aria-label={label}>
      <button
        type="button"
        className={cx(box, 'grid place-items-center text-ink transition-colors hover:bg-cream disabled:text-beige')}
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label="Decrease quantity"
      >
        <Minus size={size === 'sm' ? 12 : 14} strokeWidth={1.5} />
      </button>
      <output aria-live="polite" className={cx('min-w-8 text-center tabular-nums', size === 'sm' ? 'text-xs' : 'text-sm')}>
        {value}
      </output>
      <button
        type="button"
        className={cx(box, 'grid place-items-center text-ink transition-colors hover:bg-cream disabled:text-beige')}
        onClick={() => onChange(value + 1)}
        disabled={value >= MAX_QTY}
        aria-label="Increase quantity"
      >
        <Plus size={size === 'sm' ? 12 : 14} strokeWidth={1.5} />
      </button>
    </div>
  )
}
