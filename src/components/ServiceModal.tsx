import { useEffect, useRef, useCallback, type ReactNode } from 'react';
import { X, ArrowRight } from 'lucide-react';

interface ServiceModalProps {
  open: boolean;
  onClose: () => void;
  icon: ReactNode;
  title: string;
  description: string;
  features: string[];
  details: string;
  faqs: { q: string; a: string }[];
}

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function ServiceModal({
  open,
  onClose,
  icon,
  title,
  description,
  features,
  details,
  faqs,
}: ServiceModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      dialogRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
      return;
    }
    if (e.key === 'Tab' && dialogRef.current) {
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }, [onClose]);

  if (!open) return null;

  const scrollToContact = () => {
    onClose();
    setTimeout(() => {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-earth-950/60 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-modal-title"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto outline-none"
      >
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-8 py-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary-50 text-primary-600">
              {icon}
            </div>
            <h3 id="service-modal-title" className="text-xl font-display text-earth-900">{title}</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-lg hover:bg-gray-100 text-earth-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-8 py-8 space-y-8">
          <p className="text-earth-600 leading-relaxed">{description}</p>

          <div>
            <h4 className="text-sm font-semibold text-earth-900 uppercase tracking-wider mb-4">What's Included</h4>
            <div className="grid sm:grid-cols-2 gap-3">
              {features.map((f) => (
                <div key={f} className="flex items-start gap-2.5 p-3 rounded-lg bg-primary-50/50">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                  <span className="text-sm text-earth-700">{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-earth-900 uppercase tracking-wider mb-3">Details</h4>
            <p className="text-earth-600 text-sm leading-relaxed">{details}</p>
          </div>

          {faqs.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-earth-900 uppercase tracking-wider mb-4">Common Questions</h4>
              <div className="space-y-4">
                {faqs.map(({ q, a }) => (
                  <div key={q}>
                    <p className="text-sm font-medium text-earth-900 mb-1">{q}</p>
                    <p className="text-sm text-earth-600 leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={scrollToContact}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md group"
          >
            Request This Service
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
