import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Clock, MapPin, CalendarDays, ArrowRight, Play } from 'lucide-react';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import { useAutoSlider } from '../components/useAutoSlider';
import { Button } from '../components/ui/button';
import { IMAGES } from '../data/images';
import { PARISH, EVENTS, EVENT_CATEGORIES, FEAST_VIDEOS, PATRONAL_FEASTS, type ParishEvent, type EventCategory } from '../data/site';

function Feasts() {
  return (
    <section className="bg-maroon-deep py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          dark
          eyebrow="Patronal feasts"
          title="Our Feasts"
          description="Two heavenly patrons watch over Thalayanadu — their feasts are the high points of our parish year."
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {PATRONAL_FEASTS.map((feast, i) => (
            <Reveal key={feast.name} delay={i * 0.08} className="h-full">
              <div className="flex h-full flex-col rounded-none border border-gold/25 bg-maroon-rich/40 p-10 transition-colors duration-500 hover:border-gold/60 md:p-12">
                <p className="text-[11px] font-medium uppercase tracking-luxe text-gold-light/80">
                  {feast.date}
                </p>
                <h3 className="mt-3 font-display text-3xl font-medium text-ivory md:text-4xl">
                  {feast.name}
                </h3>
                <p className="mt-2 font-malayalam text-xl text-gold-light/90">{feast.malayalam}</p>
                <div className="gold-rule-left mt-6" aria-hidden="true" />
                <p className="mt-6 flex-1 text-[15px] font-light leading-relaxed text-ivory/65">
                  {feast.description}
                </p>
                {feast.watchAnchor && (
                  <a
                    href={feast.watchAnchor}
                    className="mt-8 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.18em] text-gold-light transition-colors hover:text-gold"
                  >
                    Watch the 2026 feast <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-[14px] font-light italic leading-relaxed text-ivory/50">
            Feast dates follow the liturgical calendar; the parish&apos;s exact Perunnal
            programme is announced each year.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function EventModal({ event, onClose }: { event: ParishEvent | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {event && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-maroon-deep/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={event.title}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-none bg-ivory shadow-soft"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-60 md:h-72">
              <img src={IMAGES[event.image]} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/70 to-transparent" aria-hidden="true" />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close details"
                className="absolute right-4 top-4 bg-maroon-deep/60 p-2 text-ivory backdrop-blur transition-colors hover:bg-maroon-deep hover:text-gold-light"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
              <div className="absolute bottom-5 left-6 right-6 md:left-8">
                <p className="text-[11px] font-medium uppercase tracking-luxe text-gold-light">{event.category}</p>
                <h3 className="mt-1 font-display text-3xl font-medium text-ivory md:text-4xl">{event.title}</h3>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <p className="text-[16px] font-light leading-relaxed text-charcoal/75">{event.description}</p>
              <dl className="mt-6 space-y-4 border-t border-maroon/10 pt-6">
                {[
                  { icon: CalendarDays, label: 'Date', value: event.dateLabel },
                  { icon: Clock, label: 'Time', value: event.time },
                  { icon: MapPin, label: 'Location', value: event.location },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-none border border-gold/50 text-gold-dark">
                      <Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <div>
                      <dt className="text-[10px] font-medium uppercase tracking-luxe text-charcoal/50">{label}</dt>
                      <dd className="font-display text-xl text-maroon-deep">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
              <Button variant="maroon" asChild className="mt-8 w-full">
                <a href={PARISH.phoneHref}>
                  Contact Parish Office <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Events() {
  const sliderRef = useAutoSlider<HTMLDivElement>();
  const [filter, setFilter] = useState<'All' | EventCategory>('All');
  const [selected, setSelected] = useState<ParishEvent | null>(null);

  const filtered = filter === 'All' ? EVENTS : EVENTS.filter((e) => e.category === filter);

  return (
    <main id="main-content">
      <PageHero
        eyebrow="Celebrate with us"
        title="Parish Events"
        description="Feasts, novenas and gatherings through the year — the rhythm of our life together."
        image={IMAGES['event-feast']}
      />

      <Feasts />

      <section className="bg-ivory py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading eyebrow="Through the year" title="What’s Happening" />

          {/* filters */}
          <Reveal className="mt-10 flex flex-wrap justify-center gap-3">
            {EVENT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                aria-pressed={filter === cat}
                className={`rounded-none px-6 py-2.5 text-[12px] font-medium uppercase tracking-[0.16em] transition-all duration-300 ${
                  filter === cat
                    ? 'bg-maroon text-ivory shadow-card'
                    : 'border border-maroon/20 text-maroon-deep/70 hover:border-gold hover:text-gold-dark'
                }`}
              >
                {cat}
              </button>
            ))}
          </Reveal>

          {/* event list */}
          <div ref={sliderRef} className="mt-8 flex snap-x gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((event) => (
                <motion.article
                  key={event.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex flex-col overflow-hidden rounded-none bg-white/70 shadow-card transition-shadow duration-500 hover:shadow-soft w-[80%] shrink-0 snap-start sm:w-[62%] md:w-auto"
                >
                  <button
                    type="button"
                    onClick={() => setSelected(event)}
                    className="img-frame relative block aspect-[16/10] text-left"
                    aria-label={`View details — ${event.title}`}
                  >
                    <img src={IMAGES[event.image]} alt="" loading="lazy" />
                    <span className="absolute left-4 top-4 bg-maroon-deep/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-light backdrop-blur">
                      {event.category}
                    </span>
                  </button>
                  <div className="flex flex-1 flex-col p-7">
                    <p className="font-display text-xl italic text-gold-dark">{event.dateLabel}</p>
                    <h3 className="mt-2 font-display text-[28px] font-medium leading-tight text-maroon-deep">
                      {event.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[15px] font-light leading-relaxed text-charcoal/65">
                      {event.description}
                    </p>
                    <div className="mt-5 flex items-center gap-5 text-[13px] font-light text-charcoal/55">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-gold-dark" strokeWidth={1.5} aria-hidden="true" />
                        {event.time}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-gold-dark" strokeWidth={1.5} aria-hidden="true" />
                        {event.location}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelected(event)}
                      className="mt-6 inline-flex items-center gap-2 self-start text-[13px] font-medium uppercase tracking-[0.18em] text-maroon-deep transition-colors hover:text-gold-dark"
                    >
                      View Details
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <p className="mt-10 text-center font-display text-2xl italic text-charcoal/50">
              No events in this category yet.
            </p>
          )}
        </div>
      </section>

      {/* Past feast recordings */}
      <section className="bg-maroon-deep py-14 md:py-20" aria-labelledby="feast-videos">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <div id="feast-videos" className="text-center">
              <p className="eyebrow-light">Watch</p>
              <h2 className="mt-4 font-display text-4xl font-medium text-ivory md:text-5xl">
                Perunnal Memories
              </h2>
              <p className="mt-3 font-malayalam text-xl text-ivory/70">കഴിഞ്ഞ തിരുനാൾ ആഘോഷങ്ങൾ</p>
              <div className="gold-rule mx-auto mt-6" aria-hidden="true" />
              <p className="mx-auto mt-6 max-w-2xl text-[15px] font-light leading-relaxed text-ivory/70">
                Relive the faith and festivity of our past feasts — full recordings from the
                parish&apos;s Perunnal celebrations.
              </p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {FEAST_VIDEOS.map((video, i) => (
              <Reveal key={video.url} delay={i * 0.08}>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-none bg-maroon/40 ring-1 ring-gold/25 transition-all duration-300 hover:-translate-y-1 hover:ring-gold/60"
                  aria-label={`Watch on YouTube: ${video.title}`}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={IMAGES[video.image]}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-maroon-deep/35 transition-colors duration-300 group-hover:bg-maroon-deep/15"
                      aria-hidden="true"
                    />
                    <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                      <span className="flex h-16 w-16 items-center justify-center rounded-none bg-gold text-maroon-deep shadow-soft transition-transform duration-300 group-hover:scale-110">
                        <Play className="ml-1 h-6 w-6 fill-current" aria-hidden="true" />
                      </span>
                    </span>
                    <span className="absolute bottom-3 right-3 bg-maroon-deep/80 px-2 py-1 text-[11px] font-medium tracking-wider text-ivory">
                      YouTube
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="font-malayalam text-lg font-medium leading-snug text-gold-light">
                      {video.titleMl}
                    </p>
                    <p className="mt-2 font-display text-xl font-medium text-ivory">{video.title}</p>
                    <p className="mt-3 text-[13px] font-light uppercase tracking-[0.16em] text-ivory/55">
                      {video.dateLabel} · {video.meta}
                    </p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <EventModal event={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
