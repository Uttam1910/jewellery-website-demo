import { Check } from 'lucide-react'
import { useStore } from '../context/store'

export function Toast() {
  const { toast } = useStore()
  return (
    <div aria-live="polite" role="status" className="pointer-events-none fixed inset-x-0 bottom-20 z-[80] flex justify-center px-4 md:bottom-8">
      {toast && (
        <div
          key={toast.id}
          className="animate-fade-up flex items-center gap-3 bg-ink px-5 py-3 text-sm text-ivory shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)]"
        >
          <Check size={16} strokeWidth={1.5} className="text-gold-soft" aria-hidden="true" />
          {toast.message}
        </div>
      )}
    </div>
  )
}
