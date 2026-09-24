import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '../lib/utils';

/** Floating back-to-top button — appears once the reader has scrolled past the hero. */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={cn(
        'fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center border-2 border-maroon-deep bg-maroon-deep text-ivory shadow-card transition-all duration-300 hover:border-gold hover:bg-gold',
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
