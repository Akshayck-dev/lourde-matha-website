import { useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface LightboxImage {
  src: string;
  caption: string;
}

interface LightboxProps {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/** Fullscreen lightbox with keyboard navigation. */
export default function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const prev = useCallback(() => {
    if (index === null) return;
    onNavigate((index - 1 + images.length) % images.length);
  }, [index, images.length, onNavigate]);

  const next = useCallback(() => {
    if (index === null) return;
    onNavigate((index + 1) % images.length);
  }, [index, images.length, onNavigate]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [index, onClose, prev, next]);

  const current = index !== null ? images[index] : null;

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[80] flex flex-col bg-maroon-deep/97 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
          onClick={onClose}
        >
          {/* top bar */}
          <div className="flex items-center justify-between px-5 py-4 md:px-8">
            <p className="text-xs uppercase tracking-luxe text-ivory/50">
              {(index as number) + 1} / {images.length}
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close gallery"
              className="p-2 text-ivory/80 transition-colors hover:text-gold-light"
            >
              <X className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>

          {/* image */}
          <div
            className="relative flex flex-1 items-center justify-center px-4 pb-4 md:px-20"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.figure
              key={current.src}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="max-h-full"
            >
              <img
                src={current.src}
                alt={current.caption}
                className="max-h-[72vh] w-auto max-w-full rounded-none object-contain shadow-soft"
              />
              <figcaption className="mt-4 text-center">
                <span className="font-display text-2xl italic text-ivory">{current.caption}</span>
              </figcaption>
            </motion.figure>

            {/* arrows */}
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 p-3 text-ivory/70 transition-all hover:-translate-x-0.5 hover:text-gold-light md:left-8"
            >
              <ChevronLeft className="h-9 w-9" strokeWidth={1.25} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-3 text-ivory/70 transition-all hover:translate-x-0.5 hover:text-gold-light md:right-8"
            >
              <ChevronRight className="h-9 w-9" strokeWidth={1.25} aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
