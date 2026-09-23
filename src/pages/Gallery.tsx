import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Expand } from 'lucide-react';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import Lightbox from '../components/Lightbox';
import { IMAGES } from '../data/images';
import { GALLERY, GALLERY_CATEGORIES, type GalleryCategory } from '../data/site';

export default function Gallery() {
  const [filter, setFilter] = useState<'All' | GalleryCategory>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = filter === 'All' ? GALLERY : GALLERY.filter((g) => g.category === filter);
  const lightboxImages = filtered.map((g) => ({ src: IMAGES[g.image], caption: g.caption }));

  return (
    <main>
      <PageHero
        eyebrow="Moments of grace"
        title="Gallery"
        description="The church, the feasts and the family — glimpses of life at Lourde Matha."
        image={IMAGES['gallery-exterior']}
      />

      <section className="bg-ivory py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading eyebrow="In pictures" title="Parish in Frames" />

          {/* filters */}
          <Reveal className="mt-10 flex flex-wrap justify-center gap-3">
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                aria-pressed={filter === cat}
                className={`px-6 py-2.5 text-[12px] font-medium uppercase tracking-[0.16em] transition-all duration-300 ${
                  filter === cat
                    ? 'bg-maroon text-ivory shadow-card'
                    : 'border border-maroon/20 text-maroon-deep/70 hover:border-gold hover:text-gold-dark'
                }`}
              >
                {cat}
              </button>
            ))}
          </Reveal>

          {/* masonry */}
          <div className="mt-12 columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.button
                  key={item.image}
                  type="button"
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setLightboxIndex(i)}
                  className="img-frame group relative block w-full break-inside-avoid text-left"
                  aria-label={`Open image — ${item.caption}`}
                >
                  <img
                    src={IMAGES[item.image]}
                    alt={item.caption}
                    loading="lazy"
                    className={item.tall ? 'aspect-[3/4]' : 'aspect-square'}
                  />
                  <span
                    className="absolute inset-0 bg-maroon-deep/0 transition-colors duration-500 group-hover:bg-maroon-deep/35"
                    aria-hidden="true"
                  />
                  <span className="absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-between bg-gradient-to-t from-maroon-deep/80 to-transparent p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="font-display text-lg italic text-ivory">{item.caption}</span>
                    <Expand className="h-4 w-4 text-gold-light" aria-hidden="true" />
                  </span>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Lightbox
        images={lightboxImages}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </main>
  );
}
