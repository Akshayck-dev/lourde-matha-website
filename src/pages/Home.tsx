import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronDown,
  Flame,
  Users,
  HandHeart,
  Church,
  Star,
  Navigation,
  Accessibility,
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
      {/* background — full image, exactly one screen, no crop or zoom */}
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
        className="absolute inset-x-0 top-0 h-svh bg-gradient-to-b from-maroon-deep/60 via-maroon-deep/35 to-maroon-deep/75"
        aria-hidden="true"
      />

      {/* content */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative mx-auto w-full max-w-7xl px-5 pt-28 md:px-8"
      >
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease }}
            className="flex items-center gap-4"
          >
            <span className="h-px w-12 bg-gold" aria-hidden="true" />
            <p className="eyebrow-light">Welcome to our parish</p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease }}
            className="mt-6 font-display text-[13vw] font-medium leading-[1.02] text-ivory sm:text-6xl md:text-7xl lg:text-[5.4rem]"
          >
            A Place of Faith,
            <br />
            Hope <span className="italic text-gold-light">&amp;</span> Grace
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease }}
            className="mt-6 max-w-xl text-[17px] font-light leading-relaxed text-ivory/80 md:text-lg"
          >
            {PARISH.name}, {PARISH.place} — a {PARISH.rite} parish of the {PARISH.diocese},
            gathering in worship since {PARISH.establishedYear} under the loving patronage of{' '}
            {PARISH.patrons}.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Button variant="gold" asChild>
              <Link to="/about">
                Explore Our Parish <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/mass-timings">View Mass Timings</Link>
            </Button>
          </motion.div>
        </div>
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
        <span className="text-[10px] uppercase tracking-luxe">Scroll</span>
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

/* ====================== 2. WELCOME / ABOUT PREVIEW =================== */

function Welcome() {
  return (
    <section id="welcome" className="bg-ivory py-14 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <div className="img-frame aspect-[4/5] shadow-soft">
            <img src={IMAGES['welcome-facade']} alt="Entrance of Lourde Matha Church" loading="lazy" />
          </div>
          {/* offset gold frame accent */}
          <div
            className="pointer-events-none absolute -bottom-5 -left-5 -z-10 h-full w-full border border-gold/50"
            aria-hidden="true"
          />
          <div className="absolute -right-4 top-8 hidden rounded-2xl bg-maroon-deep px-7 py-6 text-ivory shadow-soft md:block">
            <p className="font-display text-4xl font-medium text-gold-light">1935</p>
            <p className="mt-1 text-[11px] uppercase tracking-luxe text-ivory/60">Established</p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow">Our parish</p>
            <h2 className="display-heading mt-4 text-4xl md:text-5xl">Welcome to Our Parish</h2>
            <div className="gold-rule-left mt-6" aria-hidden="true" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-[17px] font-light leading-relaxed text-charcoal/75">
              For ninety years, the doors of {PARISH.name} have stood open to all who seek
              God — families raising children in faith, elders keeping the flame of
              tradition, and travellers who simply wandered in and stayed for prayer.
            </p>
            <p className="mt-4 text-[17px] font-light leading-relaxed text-charcoal/75">
              Here, the ancient liturgy of the Syro-Malabar Church meets a living,
              breathing community. Come as you are; you will be met with warmth.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <Button variant="maroon" asChild className="mt-9">
              <Link to="/about">
                Discover Our Story <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* =========================== 3. MASS TIMINGS ========================= */

function MassPreview() {
  const today = todaysMassEntries();
  const todayIds = new Set(today.map((m) => m.id));

  return (
    <section className="relative overflow-hidden bg-maroon-deep py-14 md:py-20">
      {/* faint backdrop */}
      <div className="absolute inset-0 opacity-[0.14]" aria-hidden="true">
        <img src={IMAGES['mass-timings-bg']} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-maroon-deep via-maroon-deep/80 to-maroon-deep" aria-hidden="true" />

      <div className="relative mx-auto max-w-5xl px-5 md:px-8">
        <SectionHeading
          dark
          eyebrow="Worship with us"
          title="Join Us in Prayer"
          description="The Holy Qurbana is the heartbeat of our parish. All are welcome at every celebration."
        />

        <div className="mt-10">
          {MASS_SCHEDULE.slice(0, 4).map((m, i) => {
            const isToday = todayIds.has(m.id);
            return (
              <Reveal key={m.id} delay={i * 0.07}>
                <div
                  className={`group flex flex-col gap-2 border-b border-ivory/12 py-6 transition-colors duration-300 sm:flex-row sm:items-baseline sm:justify-between ${
                    isToday ? 'border-gold/40' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`h-2 w-2 rotate-45 transition-colors ${isToday ? 'bg-gold-light' : 'bg-gold/50 group-hover:bg-gold'}`}
                      aria-hidden="true"
                    />
                    <div>
                      <p className="flex flex-wrap items-center gap-3 font-display text-2xl text-ivory md:text-[26px]">
                        {m.label}
                        {isToday && (
                          <span className="bg-gold px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-maroon-deep">
                            Today
                          </span>
                        )}
                      </p>
                      <p className="mt-1 text-sm font-light text-ivory/55">{m.note}</p>
                    </div>
                  </div>
                  <p className="pl-6 font-display text-xl italic text-gold-light sm:pl-0 sm:text-right md:text-2xl">
                    {m.times.join('  ·  ')}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-8 text-center">
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

/* ============================ 4. PARISH LIFE ========================= */

const PARISH_LIFE = [
  {
    icon: Church,
    title: 'Holy Mass',
    text: 'The Holy Qurbana celebrated with reverence — the source and summit of our parish life.',
    image: 'life-mass',
  },
  {
    icon: Flame,
    title: 'Sacraments',
    text: 'Baptism, First Communion, Confirmation, Matrimony — milestones of grace, prepared with care.',
    image: 'life-sacraments',
  },
  {
    icon: Users,
    title: 'Community',
    text: 'Choir, youth, catechism and charitable works — a family that prays, serves and celebrates together.',
    image: 'life-community',
  },
  {
    icon: HandHeart,
    title: 'Prayer',
    text: 'Novenas, adoration and the rosary — quiet spaces to meet God in the stillness of the heart.',
    image: 'life-prayer',
  },
];

function ParishLife() {
  return (
    <section className="bg-cream/60 py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Parish life"
          title="The Life of Our Parish"
          description="Four pillars hold up everything we are — worship, sacrament, fellowship and prayer."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PARISH_LIFE.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08} className="h-full">
              <Link
                to="/about"
                className="group relative block h-[420px] overflow-hidden rounded-3xl bg-maroon-deep"
                aria-label={`${item.title} — discover our story`}
              >
                <img
                  src={IMAGES[item.image]}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-80 transition-all duration-[1.4s] ease-out group-hover:scale-[1.06] group-hover:opacity-60"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-maroon-deep via-maroon-deep/25 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <item.icon className="h-7 w-7 text-gold-light" strokeWidth={1.25} aria-hidden="true" />
                  <h3 className="mt-4 font-display text-3xl font-medium text-ivory">{item.title}</h3>
                  <p className="mt-2 max-h-0 overflow-hidden text-[15px] font-light leading-relaxed text-ivory/75 opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
                    {item.text}
                  </p>
                  <span
                    className="mt-4 block h-px w-10 bg-gold transition-all duration-500 group-hover:w-20"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================= 5. PARISH STORY =========================== */

function Story() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  return (
    <section ref={ref} className="relative overflow-hidden bg-maroon-deep py-12 md:py-16">
      <motion.div style={{ y: bgY }} className="absolute inset-0" aria-hidden="true">
        <img src={IMAGES['story-wide']} alt="" className="h-[124%] w-full object-cover" loading="lazy" />
      </motion.div>
      <div className="absolute inset-0 bg-maroon-deep/70" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-maroon-deep/70 via-transparent to-maroon-deep/70" aria-hidden="true" />

      <div className="relative mx-auto max-w-4xl px-5 text-center md:px-8">
        <Reveal>
          <p className="eyebrow-light">Since 1935</p>
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-medium leading-[1.1] text-ivory md:text-6xl">
            Ninety Years of Faith
            <br />
            <span className="italic text-gold-light">in Thalayanadu</span>
          </h2>
          <div className="gold-rule mt-7" aria-hidden="true" />
          <p className="mx-auto mt-7 max-w-2xl text-[17px] font-light leading-relaxed text-ivory/90">
            What began in 1935 as a small community of faithful has grown into a living
            sanctuary — where the Syro-Malabar liturgy is sung with devotion, and every
            generation finds its home beneath these arches.
          </p>
          <Button variant="outline" asChild className="mt-10">
            <Link to="/about">
              Read Our Story <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

/* ========================== 6. UPCOMING EVENTS ======================= */

function UpcomingEvents() {
  const upcoming = EVENTS.slice(0, 3);

  return (
    <section className="bg-ivory py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Mark your calendar"
            title="Upcoming Events"
          />
          <Reveal delay={0.1}>
            <Link
              to="/events"
              className="group inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.18em] text-maroon-deep transition-colors hover:text-gold-dark"
            >
              View all events
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-8 divide-y divide-maroon/10 border-y border-maroon/10">
          {upcoming.map((event, i) => (
            <Reveal key={event.id} delay={i * 0.06}>
              <Link
                to="/events"
                className="group grid items-center gap-5 py-7 transition-colors duration-300 md:grid-cols-[150px_1fr_auto] md:gap-10 md:py-8"
              >
                <div>
                  <p className="font-display text-2xl italic text-gold-dark md:text-[26px]">
                    {event.dateLabel}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-luxe text-charcoal/50">
                    {event.category}
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-3xl font-medium text-maroon-deep transition-colors group-hover:text-maroon-rich md:text-[32px]">
                    {event.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-[15.5px] font-light leading-relaxed text-charcoal/65">
                    {event.description}
                  </p>
                </div>
                <span className="hidden items-center gap-2 text-[13px] font-medium uppercase tracking-[0.18em] text-maroon-deep/60 transition-all group-hover:gap-3 group-hover:text-gold-dark md:inline-flex">
                  Details <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================== 7. GALLERY PREVIEW ======================= */

function GalleryPreview() {
  const preview = GALLERY.slice(0, 6);

  return (
    <section className="bg-cream/60 py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Moments of grace"
          title="Glimpses of Parish Life"
          description="Feasts and quiet mornings, candlelight and celebration — fragments of our life together."
        />

        <div className="mt-10 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
          {preview.map((item, i) => (
            <Reveal key={item.image} delay={(i % 3) * 0.08} className="break-inside-avoid">
              <Link to="/gallery" className="img-frame group relative block" aria-label={`View gallery — ${item.caption}`}>
                <img
                  src={IMAGES[item.image]}
                  alt={item.caption}
                  loading="lazy"
                  className={item.tall ? 'aspect-[3/4]' : 'aspect-[4/3]'}
                />
                <span
                  className="absolute inset-0 bg-maroon-deep/0 transition-colors duration-500 group-hover:bg-maroon-deep/25"
                  aria-hidden="true"
                />
                <span className="absolute bottom-4 left-4 translate-y-2 font-display text-xl italic text-ivory opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {item.caption}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 text-center">
          <Button variant="outlineDark" asChild>
            <Link to="/gallery">
              View Gallery <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ 8. COMMUNITY =========================== */

function Community() {
  return (
    <section className="bg-ivory py-14 md:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
        <div className="order-2 lg:order-1">
          <Reveal>
            <p className="eyebrow">Belong</p>
            <h2 className="display-heading mt-4 text-4xl md:text-5xl">Growing Together in Faith</h2>
            <div className="gold-rule-left mt-6" aria-hidden="true" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-[17px] font-light leading-relaxed text-charcoal/75">
              A parish is more than a building — it is a family. Our choir lifts its voice,
              our youth dream boldly, our elders pray faithfully, and our volunteers serve
              quietly. Whoever you are, there is a place for you here.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <Button variant="maroon" asChild className="mt-9">
              <Link to="/contact">
                Be Part of Our Community <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </Reveal>
        </div>
        <Reveal className="order-1 lg:order-2" delay={0.1}>
          <div className="img-frame aspect-[4/3] shadow-soft">
            <img src={IMAGES['community-group']} alt="Members of the parish community together" loading="lazy" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ========================= 9. PRAYER INTENTION ======================= */

function Prayer() {
  return (
    <section className="relative overflow-hidden bg-maroon-deep py-14 md:py-20">
      <div className="absolute inset-0 opacity-20" aria-hidden="true">
        <img src={IMAGES['gallery-candles']} alt="" className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-maroon-deep via-maroon-deep/70 to-maroon-deep" aria-hidden="true" />

      <div className="relative mx-auto max-w-2xl px-5 text-center md:px-8">
        <Reveal>
          <p className="eyebrow-light">We pray with you</p>
          <h2 className="mt-4 font-display text-4xl font-medium leading-tight text-ivory md:text-5xl">
            Your Prayer Matters
          </h2>
          <div className="gold-rule mt-6" aria-hidden="true" />
          <p className="mt-6 text-[17px] font-light leading-relaxed text-ivory/75">
            Share your prayer intention with our parish community. Your request will be
            remembered in our novenas and at the altar — in confidence and with love.
          </p>
          <Button variant="gold" asChild className="mt-9">
            <a href={`mailto:${PARISH.email}?subject=${encodeURIComponent('Prayer Intention')}`}>
              Submit a Prayer Intention <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

/* ======================= 10. LOCATION / CONTACT ====================== */

function Location() {
  return (
    <section className="bg-ivory py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Find us"
          title="Visit Our Parish"
          description="In the heart of Thalayanadu — come for Mass, for prayer, or simply for a moment of quiet."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* map */}
          <Reveal className="min-h-[380px] min-w-0">
            <div className="relative h-full min-h-[380px] overflow-hidden rounded-3xl border border-maroon/10 shadow-card">
              <iframe
                title={`Map — ${PARISH.name}, ${PARISH.place}`}
                src={PARISH.mapsEmbed}
                className="absolute inset-0 h-full w-full grayscale-[35%] contrast-[1.02]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          {/* details */}
          <Reveal delay={0.1} className="flex min-w-0 flex-col justify-center">
            <p className="font-malayalam text-xl text-maroon-deep/80">
              {PARISH.malayalamName}
            </p>
            <ul className="mt-2 divide-y divide-maroon/10">
              {[
                { icon: MapPin, label: 'Address', value: PARISH.addressLines.join(', ') },
                { icon: Navigation, label: 'Plus Code', value: PARISH.plusCode },
                {
                  icon: Star,
                  label: 'Google Rating',
                  value: `${PARISH.googleRating.stars} · ${PARISH.googleRating.reviews} reviews`,
                  href: PARISH.mapsUrl,
                },
                { icon: Phone, label: 'Phone', value: PARISH.phone, href: PARISH.phoneHref },
                { icon: Mail, label: 'Email', value: PARISH.email, href: `mailto:${PARISH.email}` },
                // parish office hours render only once confirmed with the parish office
                ...(PARISH.officeHours
                  ? [{ icon: Clock, label: 'Parish Office Hours', value: PARISH.officeHours }]
                  : []),
              ].map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-5 py-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold-dark">
                    <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[11px] font-medium uppercase tracking-luxe text-charcoal/50">
                      {label}
                    </span>
                    {href ? (
                      <a
                        href={href}
                        className="mt-1 block break-all font-display text-[22px] text-maroon-deep transition-colors hover:text-gold-dark"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="mt-1 block break-all font-display text-[22px] text-maroon-deep">{value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 flex items-start gap-3 text-[15px] font-light leading-relaxed text-charcoal/70">
              <Accessibility className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" strokeWidth={1.5} aria-hidden="true" />
              <span>
                {PARISH.amenities}. {PARISH.grotto}
              </span>
            </p>
            <Button variant="maroon" asChild className="mt-8 self-start">
              <a href={PARISH.mapsUrl} target="_blank" rel="noreferrer">
                Get Directions <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ========================= 11. FINAL BLESSING ======================== */

function Blessing() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section ref={ref} className="relative overflow-hidden bg-maroon-deep py-14 md:py-20">
      <motion.div style={{ y: bgY }} className="absolute inset-0" aria-hidden="true">
        <img src={IMAGES['blessing-sunset']} alt="" className="h-[120%] w-full object-cover" loading="lazy" />
      </motion.div>
      <div className="absolute inset-0 bg-maroon-deep/55" aria-hidden="true" />

      <div className="relative mx-auto max-w-3xl px-5 text-center md:px-8">
        <Reveal>
          <p className="eyebrow-light">A final blessing</p>
          <h2 className="mt-5 font-display text-5xl font-medium leading-[1.08] text-ivory md:text-6xl">
            May Faith Guide
            <br />
            Your <span className="italic text-gold-light">Journey</span>
          </h2>
          <div className="gold-rule mt-7" aria-hidden="true" />
          <p className="mx-auto mt-7 max-w-xl text-[17px] font-light leading-relaxed text-ivory/78">
            “The Lord bless you and keep you; the Lord make His face shine upon you.”
            Our doors — and our hearts — are open.
          </p>
          <Button variant="gold" asChild className="mt-10">
            <Link to="/contact">
              Visit Our Parish <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================ PAGE =============================== */

export default function Home() {
  return (
    <main>
      <Hero />
      <Welcome />
      <MassPreview />
      <ParishLife />
      <Story />
      <UpcomingEvents />
      <GalleryPreview />
      <Community />
      <Prayer />
      <Location />
      <Blessing />
    </main>
  );
}
