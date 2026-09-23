import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

import { Phone, Sparkles } from 'lucide-react';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import { IMAGES } from '../data/images';
import { PARISH, MASS_SCHEDULE, todaysMassEntries } from '../data/site';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function TodayBanner() {
  const today = todaysMassEntries();
  const dayName = DAY_NAMES[new Date().getDay()];

  return (
    <section className="border-b border-maroon/10 bg-cream/60">
      <div className="mx-auto max-w-5xl px-5 py-10 md:px-8">
        <Reveal className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-dark">
            <Sparkles className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
          </span>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-luxe text-gold-dark">
              Today · {dayName}
            </p>
            {today.length > 0 ? (
              <p className="mt-1 font-display text-2xl text-maroon-deep">
                {today.map((m) => `${m.label}: ${m.times.join(' · ')}`).join('   —   ')}
              </p>
            ) : (
              <p className="mt-1 font-display text-2xl italic text-maroon-deep">
                No public Mass scheduled today — the church remains open for private prayer.
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Schedule() {
  return (
    <section className="bg-ivory py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Holy Qurbana & sacraments"
          title="Mass Timings"
          description="The Holy Qurbana is celebrated according to the Syro-Malabar liturgy. Confessions are heard before Mass and on request."
        />

        <div className="mt-14 overflow-hidden rounded-3xl border border-maroon/10 bg-white/60 shadow-card">
          {MASS_SCHEDULE.map((m, i) => {
            const isToday = todaysMassEntries().some((t) => t.id === m.id);
            return (
              <Reveal key={m.id} delay={i * 0.05}>
                <div
                  className={`grid gap-3 px-7 py-7 transition-colors sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8 md:px-10 ${
                    i % 2 === 1 ? 'bg-cream/50' : ''
                  } ${isToday ? 'bg-gold/10' : ''}`}
                >
                  <div>
                    <p className="flex flex-wrap items-center gap-3 font-display text-[26px] font-medium text-maroon-deep">
                      {m.label}
                      {isToday && (
                        <span className="bg-gold px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-maroon-deep">
                          Today
                        </span>
                      )}
                    </p>
                    <p className="mt-1 text-[15px] font-light text-charcoal/60">{m.note}</p>
                  </div>
                  <p className="font-display text-2xl italic text-gold-dark md:text-[26px]">
                    {m.times.join('  ·  ')}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10">
          <div className="flex flex-col items-start gap-4 border border-gold/40 bg-gold/10 px-7 py-6 md:flex-row md:items-center md:justify-between md:px-10">
            <p className="max-w-2xl text-[15px] font-light leading-relaxed text-charcoal/75">
              Timings may vary on feast days and special occasions. For baptisms, weddings,
              house blessings and other sacraments, please contact the parish office.
            </p>
            <Button variant="maroon" asChild className="shrink-0">
              <a href={PARISH.phoneHref}>
                <Phone className="h-4 w-4" aria-hidden="true" /> {PARISH.phone}
              </a>
            </Button>
          </div>
        </Reveal>

        <Reveal className="mt-12 text-center">
          <Link
            to="/events"
            className="text-[13px] font-medium uppercase tracking-[0.18em] text-maroon-deep underline decoration-gold decoration-2 underline-offset-8 transition-colors hover:text-gold-dark"
          >
            See special feast Masses in Events
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export default function MassTimings() {
  return (
    <main>
      <PageHero
        eyebrow="Worship with us"
        title="Mass Timings"
        description="Join us at the altar — the Holy Qurbana, novenas and the Sacrament of Reconciliation through the week."
        image={IMAGES['mass-timings-bg']}
      />
      <TodayBanner />
      <Schedule />
    </main>
  );
}
