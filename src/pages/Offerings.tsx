import { Landmark, Mail, Phone, Info } from 'lucide-react';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { Button } from '../components/ui/button';
import { IMAGES } from '../data/images';
import { PARISH, OFFERING_RATES, OFFERING_BANK } from '../data/site';

function MalayalamHeading({ eyebrow, ml }: { eyebrow: string; ml: string }) {
  return (
    <div className="text-center">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 font-malayalam text-4xl font-semibold text-maroon-deep md:text-5xl">{ml}</h2>
      <div className="gold-rule mx-auto mt-6" aria-hidden="true" />
    </div>
  );
}

export default function Offerings() {
  return (
    <main>
      <PageHero
        eyebrow="നേർച്ചകൾ · Offerings"
        title="Offerings"
        description="Support the life and mission of our parish — every gift, great or small, is received with gratitude."
        image={IMAGES['gallery-candles']}
      />

      {/* Rates */}
      <section className="bg-ivory py-12 md:py-16" aria-labelledby="offering-rates">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <Reveal>
            <div id="offering-rates">
              <MalayalamHeading eyebrow="Offering Rates" ml="തിരുക്കർമ്മങ്ങളുടെ നിരക്ക്" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mt-8 divide-y divide-maroon/10 border-y border-maroon/10">
              {OFFERING_RATES.map((item) => (
                <li
                  key={item.ml}
                  className="flex items-baseline justify-between gap-6 py-5 transition-colors hover:bg-cream/60 md:py-6"
                >
                  <div>
                    <p className="font-malayalam text-xl font-medium text-maroon-deep md:text-2xl">
                      {item.ml}
                    </p>
                    <p className="mt-1 text-[13px] font-light uppercase tracking-[0.18em] text-charcoal/55">
                      {item.en}
                    </p>
                  </div>
                  <p className="shrink-0 font-display text-2xl font-semibold text-gold-dark md:text-3xl">
                    {item.amount === '—' ? '—' : `₹${item.amount}`}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-6 flex items-start justify-center gap-2 text-center text-sm font-light text-charcoal/60">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" aria-hidden="true" />
              Offering rates are to be confirmed with the parish office.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Bank details */}
      <section className="bg-cream py-12 md:py-16" aria-labelledby="bank-details">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <Reveal>
            <div id="bank-details">
              <MalayalamHeading eyebrow="Bank Transfer" ml="ബാങ്ക് അക്കൗണ്ട് വിവരങ്ങൾ" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-gold/40 bg-ivory p-8 shadow-soft md:p-10">
              <div className="mb-8 flex items-center justify-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 text-gold-dark">
                  <Landmark className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <p className="font-display text-2xl font-medium text-maroon-deep">
                  {PARISH.name}, {PARISH.place}
                </p>
              </div>
              <dl className="divide-y divide-maroon/10">
                {OFFERING_BANK.map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-6 py-4">
                    <dt className="text-[13px] font-medium uppercase tracking-[0.18em] text-charcoal/55">
                      {row.label}
                    </dt>
                    <dd className="font-display text-xl font-medium text-maroon-deep md:text-2xl">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-center text-sm font-light text-charcoal/60">
                Bank details to be confirmed with the parish office.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Please note */}
      <section className="bg-maroon-deep py-12 md:py-16" aria-labelledby="offering-note">
        <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
          <Reveal>
            <div id="offering-note">
              <p className="eyebrow-light">Please Note</p>
              <h2 className="mt-4 font-malayalam text-4xl font-semibold text-ivory md:text-5xl">
                ശ്രദ്ധിക്കുക
              </h2>
              <div className="gold-rule mx-auto mt-6" aria-hidden="true" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-8 max-w-2xl font-malayalam text-xl font-light leading-relaxed text-ivory/90 md:text-2xl">
              പണം അയച്ചശേഷം ഇമെയിൽ വഴിയോ ഫോൺ വഴിയോ
              <br />
              പേരും വിലാസവും നിയോഗവും അറിയിക്കുക
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] font-light leading-relaxed text-ivory/70">
              After sending your offering, please share your name, address and intention with the
              parish office by email or phone.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button variant="gold" asChild>
                <a href={`mailto:${PARISH.email}`}>
                  <Mail className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                  Email Parish Office
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={PARISH.phoneHref}>
                  <Phone className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                  {PARISH.phone}
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
