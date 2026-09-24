import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useAutoSlider } from '../components/useAutoSlider';

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  ArrowRight,
  Clock,
  ChevronDown,
  Star,
  HandHeart,
} from 'lucide-react';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import { IMAGES } from '../data/images';
import { PARISH, MASS_SCHEDULE, todaysMassEntries, EVENTS, GALLERY } from '../data/site';

const ease = [0.22, 1, 0.36, 1] as const;

/* ============================== 1. HERO ============================== */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-svh items-center overflow-hidden bg-maroon-deep">
      {/* background — full image, exactly one screen */}
      <div className="absolute inset-x-0 top-0 h-svh" aria-hidden="true">
        <motion.img
          src={IMAGES['hero-lourdes-desktop']}
          alt=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, ease }}
          className="hidden h-full w-full object-cover md:block"
        />
        <motion.img
          src={IMAGES['hero-lourdes-mobile']}
          alt=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, ease }}
          className="h-full w-full object-cover md:hidden"
        />
      </div>
      <div
        className="absolute inset-x-0 top-0 h-svh bg-maroon-deep/55"
        aria-hidden="true"
      />

      {/* content — centered, uppercase */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative mx-auto w-full max-w-5xl px-5 pt-28 text-center md:px-8"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease }}
          className="eyebrow-light"
        >
          {PARISH.name} · {PARISH.place}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease }}
          className="mx-auto mt-6 max-w-4xl font-display text-[11.5vw] font-extrabold uppercase leading-[1.06] tracking-tight text-ivory sm:text-6xl md:text-7xl"
        >
          A Place of Faith,
          <br />
          Hope &amp; Grace
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease }}
          className="mx-auto mt-6 max-w-2xl text-[16.5px] leading-relaxed text-ivory/80"
        >
          A {PARISH.rite} parish of the {PARISH.diocese}, gathering in worship since{' '}
          {PARISH.establishedYear} under the loving patronage of {PARISH.patrons}.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button variant="white" asChild>
            <Link to="/about">
              Explore Our Parish <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/mass-timings">Mass Timings</Link>
          </Button>
        </motion.div>
      </motion.div>

      {/* scroll indicator */}
      <motion.a
        href="#welcome"
        aria-label="Scroll to welcome section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-ivory/60 transition-colors hover:text-gold-light md:flex"
      >
        <span className="font-display text-[10px] font-bold uppercase tracking-luxe">Scroll</span>
        <motion.span
          animate={reduce ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-5 w-5" strokeWidth={1.25} aria-hidden="true" />
        </motion.span>
      </motion.a>
    </section>
  );
}

/* ====================== 2. WELCOME =================== */

function Welcome() {
  return (
    <section id="welcome" className="bg-ivory py-14 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="A sanctuary of faith & grace"
          title="Welcome to Lourde Matha Church"
        />

        <Reveal delay={0.05}>
          <p className="mx-auto mt-8 max-w-4xl text-center font-display text-2xl font-extrabold uppercase leading-snug tracking-tight text-maroon-deep/15 md:text-4xl">
            “Come to me, all you who are weary and burdened, and I will give you rest.”
          </p>
        </Reveal>

        <div className="mt-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <p className="text-[16.5px] leading-relaxed text-charcoal/75">
                For ninety years, the doors of {PARISH.name} have stood open to all who
                seek God — families raising children in faith, elders keeping the flame of
                tradition, and travellers who simply wandered in and stayed for prayer.
              </p>
              <p className="mt-4 text-[16.5px] leading-relaxed text-charcoal/75">
                Here, the ancient liturgy of the Syro-Malabar Church meets a living,
                breathing community. Come as you are; you will be met with warmth.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <Button variant="gold" asChild className="mt-9">
                <Link to="/about">
                  Read More <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="relative">
            <div className="img-frame aspect-[4/3]">
              <img src={IMAGES['welcome-facade']} alt="Entrance of Lourde Matha Church" loading="lazy" />
            </div>
            <div className="absolute -bottom-5 left-6 hidden bg-maroon-deep px-7 py-5 text-ivory md:block">
              <p className="font-display text-4xl font-extrabold text-gold-light">1935</p>
              <p className="mt-1 font-display text-[10px] font-bold uppercase tracking-luxe text-ivory/60">
                Established
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ========================= 3. STORY BAND =========================== */

function StoryBand() {
  return (
    <section className="bg-cream py-14 md:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="img-frame aspect-[16/10]">
            <img src={IMAGES['story-wide']} alt="Lourde Matha Church" loading="lazy" />
          </div>
        </Reveal>
        <div>
          <Reveal>
            <p className="eyebrow">Since 1935</p>
            <h2 className="display-heading mt-4 text-4xl md:text-5xl">
              Ninety Years of Faith in Thalayanadu
            </h2>
            <div className="gold-rule-left mt-6" aria-hidden="true" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-[16.5px] leading-relaxed text-charcoal/75">
              What began in 1935 as a small community of faithful has grown into a living
              sanctuary — where the Syro-Malabar liturgy is sung with devotion, and every
              generation finds its home beneath these arches.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <Button variant="gold" asChild className="mt-9">
              <Link to="/about">
                Read More <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ===================== 4. LITURGICAL SCHEDULE ====================== */

function Schedule() {
  const today = todaysMassEntries();
  const todayIds = new Set(today.map((m) => m.id));

  return (
    <section className="bg-ivory py-14 md:py-20">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Worship with us"
          title="Let's Come Together in Holy Mass"
          description="The Holy Qurbana is the heartbeat of our parish. All are welcome at every celebration."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {MASS_SCHEDULE.map((m, i) => {
            const isToday = todayIds.has(m.id);
            return (
              <Reveal key={m.id} delay={(i % 2) * 0.08}>
                <div className="flex h-full items-stretch bg-[#F7EFEF]">
                  <div className="flex w-20 shrink-0 items-center justify-center bg-accent-coral">
                    <Clock className="h-8 w-8 text-white" strokeWidth={1.25} aria-hidden="true" />
                  </div>
                  <div className="flex flex-1 flex-col justify-center px-6 py-6">
                    <p className="flex flex-wrap items-center gap-3 font-display text-lg font-extrabold uppercase tracking-tight text-maroon-deep">
                      {m.label}
                      {isToday && (
                        <span className="bg-accent-coral px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                          Today
                        </span>
                      )}
                    </p>
                    <p className="mt-1 text-sm text-charcoal/60">{m.note}</p>
                    <p className="mt-2 font-display text-xl font-bold text-maroon-deep">
                      {m.times.join('  ·  ')}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10 text-center">
          <Button variant="gold" asChild>
            <Link to="/mass-timings">
              View Full Schedule <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

/* ===================== 5. PRAYER / OFFERINGS CARDS ================== */

function ActionCards() {
  return (
    <section className="bg-ivory pb-14 md:pb-20">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 md:grid-cols-2 md:px-8">
        <Reveal>
          <div className="flex h-full flex-col bg-accent-teal px-8 py-12 text-white md:px-12">
            <HandHeart className="h-10 w-10" strokeWidth={1.25} aria-hidden="true" />
            <h3 className="mt-6 font-display text-3xl font-extrabold uppercase tracking-tight">
              Prayer Intentions
            </h3>
            <p className="mt-3 max-w-md text-[16px] leading-relaxed text-white/85">
              Share your intention with our parish community. Your request will be remembered
              in our novenas and at the altar — in confidence and with love.
            </p>
            <div className="mt-8">
              <Button variant="outline" asChild>
                <a href={`mailto:${PARISH.email}?subject=${encodeURIComponent('Prayer Intention')}`}>
                  Submit Intention <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex h-full flex-col bg-accent-blue px-8 py-12 text-white md:px-12">
            <Star className="h-10 w-10" strokeWidth={1.25} aria-hidden="true" />
            <h3 className="mt-6 font-display text-3xl font-extrabold uppercase tracking-tight">
              Offerings &amp; Mass Intentions
            </h3>
            <p className="mt-3 max-w-md text-[16px] leading-relaxed text-white/85">
              Support the life of the parish and offer Holy Mass for your loved ones, living
              and departed. Every gift sustains our worship and charity.
            </p>
            <div className="mt-8">
              <Button variant="outline" asChild>
                <Link to="/offerings">
                  Give an Offering <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ 6. QUOTE BAND =========================== */

function QuoteBand() {
  return (
    <section className="bg-sand py-14 md:py-20">
      <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
        <Reveal>
          <blockquote className="font-display text-3xl font-extrabold uppercase italic leading-snug tracking-tight text-maroon-deep md:text-4xl">
            “Hail Mary, full of grace, the Lord is with thee.”
          </blockquote>
          <p className="mt-6 font-display text-[12px] font-bold uppercase tracking-[0.24em] text-gold-dark">
            Luke 1 : 28
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ========================== 7. UPCOMING EVENTS ======================= */

function UpcomingEvents() {
  const upcoming = EVENTS.slice(0, 3);
  const sliderRef = useAutoSlider<HTMLDivElement>();

  return (
    <section className="bg-cream py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Mark your calendar"
          title="Upcoming Events"
        />

        <div
          ref={sliderRef}
          className="mt-10 flex snap-x gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:overflow-visible md:pb-0"
        >
          {upcoming.map((event, i) => (
            <Reveal key={event.id} delay={i * 0.08} className="w-[82%] shrink-0 snap-start sm:w-[60%] md:w-auto">
              <Link to="/events" className="group block" aria-label={`${event.title} — view events`}>
                <div className="img-frame aspect-[16/10]">
                  <img src={IMAGES[event.image]} alt="" loading="lazy" />
                </div>
                <div className="relative z-10 mx-5 -mt-12 bg-white p-6 shadow-card">
                  <p className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-gold-dark">
                    {event.category} · {event.dateLabel}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold uppercase leading-snug tracking-tight text-maroon-deep transition-colors group-hover:text-gold-dark">
                    {event.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-[14.5px] leading-relaxed text-charcoal/65">
                    {event.description}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <Button variant="gold" asChild>
            <Link to="/events">
              View More <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

/* ========================== 8. GALLERY PREVIEW ======================= */

function GalleryPreview() {
  const preview = GALLERY.slice(0, 6);

  return (
    <section className="bg-ivory py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Moments of grace"
          title="From the Gallery"
          description="Feasts and quiet mornings, candlelight and celebration — fragments of our life together."
        />

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
          {preview.map((item, i) => (
            <Reveal key={item.image} delay={(i % 3) * 0.08}>
              <Link to="/gallery" className="img-frame group relative block" aria-label={`View gallery — ${item.caption}`}>
                <img
                  src={IMAGES[item.image]}
                  alt={item.caption}
                  loading="lazy"
                  className="aspect-[4/3]"
                />
                <span
                  className="absolute inset-0 bg-maroon-deep/0 transition-colors duration-500 group-hover:bg-maroon-deep/25"
                  aria-hidden="true"
                />
                <span className="absolute bottom-4 left-4 translate-y-2 font-display text-lg font-bold uppercase tracking-tight text-ivory opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {item.caption}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="relative mt-12">
          <div className="absolute inset-x-0 top-1/2 h-[7px] -translate-y-1/2 border-y border-maroon/25" aria-hidden="true" />
          <div className="relative flex justify-center">
            <Button variant="gold" asChild className="bg-ivory">
              <Link to="/gallery">
                All Gallery <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}


/* ================================ PAGE =============================== */

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <Welcome />
      <StoryBand />
      <Schedule />
      <ActionCards />
      <QuoteBand />
      <UpcomingEvents />
      <GalleryPreview />
    </main>
  );
}
