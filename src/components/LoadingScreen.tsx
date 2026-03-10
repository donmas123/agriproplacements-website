import { useEffect, useState } from 'react';
import { Sprout } from 'lucide-react';

interface Props {
  onDone: () => void;
}

export default function LoadingScreen({ onDone }: Props) {
  const [phase, setPhase] = useState<'loading' | 'fadeout'>('loading');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('fadeout'), 1300);
    const t2 = setTimeout(onDone, 1800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-earth-900 transition-opacity duration-500 ${
        phase === 'fadeout' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex items-center justify-center">
        <div className="loading-logo-ring absolute w-24 h-24 rounded-full border-2 border-primary-400/60" />
        <div className="loading-logo-pulse">
          <Sprout className="w-12 h-12 text-primary-400" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}
