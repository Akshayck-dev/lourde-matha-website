import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { PARISH, NAV_LINKS, MASS_SCHEDULE } from '../data/site';
import { Logo } from './Logo';
import Reveal from './Reveal';

function FacebookIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={props.className} aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={props.className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function YoutubeIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={props.className} aria-hidden="true">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-maroon-deep text-ivory">
      {/* gold hairline */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Identity */}
          <Reveal>
            <Link to="/" aria-label="Lourde Matha Church — home">
              <Logo light />
            </Link>
            <p className="mt-6 max-w-xs text-[15px] font-light leading-relaxed text-ivory/65">
              A Syro-Malabar parish of the {PARISH.diocese}, serving the faithful of
              Thalayanadu since {PARISH.establishedYear} under the patronage of{' '}
              {PARISH.patrons}.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: FacebookIcon, label: 'Facebook' },
                { icon: InstagramIcon, label: 'Instagram' },
                { icon: YoutubeIcon, label: 'YouTube' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 text-ivory/70 transition-all duration-300 hover:border-gold hover:text-gold-light"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </Reveal>

          {/* Quick links */}
          <Reveal delay={0.08}>
            <h3 className="eyebrow-light">Explore</h3>
            <ul className="mt-6 space-y-3.5">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-[15px] font-light text-ivory/70 transition-colors hover:text-gold-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Mass timings */}
          <Reveal delay={0.14}>
            <h3 className="eyebrow-light">Mass Timings</h3>
            <ul className="mt-6 space-y-3.5">
              {MASS_SCHEDULE.slice(0, 4).map((m) => (
                <li key={m.id} className="border-b border-ivory/10 pb-3.5">
                  <p className="text-sm font-light text-ivory/60">{m.label}</p>
                  <p className="mt-0.5 font-display text-[17px] text-gold-light">
                    {m.times.join(' · ')}
                  </p>
                </li>
              ))}
            </ul>
            <Link
              to="/mass-timings"
              className="mt-4 inline-block text-[13px] uppercase tracking-[0.16em] text-gold-light/80 transition-colors hover:text-gold-light"
            >
              Full Schedule →
            </Link>
          </Reveal>

          {/* Contact */}
          <Reveal delay={0.2}>
            <h3 className="eyebrow-light">Contact</h3>
            <ul className="mt-6 space-y-4 text-[15px] font-light text-ivory/70">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-[18px] w-[18px] shrink-0 text-gold" strokeWidth={1.5} aria-hidden="true" />
                <span>
                  {PARISH.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </li>
              <li>
                <a href={PARISH.phoneHref} className="flex gap-3 transition-colors hover:text-gold-light">
                  <Phone className="mt-0.5 h-[18px] w-[18px] shrink-0 text-gold" strokeWidth={1.5} aria-hidden="true" />
                  {PARISH.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${PARISH.email}`} className="flex gap-3 break-all transition-colors hover:text-gold-light">
                  <Mail className="mt-0.5 h-[18px] w-[18px] shrink-0 text-gold" strokeWidth={1.5} aria-hidden="true" />
                  {PARISH.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-[18px] w-[18px] shrink-0 text-gold" strokeWidth={1.5} aria-hidden="true" />
                {PARISH.officeHours}
              </li>
            </ul>
          </Reveal>
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-[13px] font-light text-ivory/45 md:flex-row md:px-8">
          <p>© {year} {PARISH.name}, {PARISH.place}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="transition-colors hover:text-gold-light">
              Privacy Policy
            </Link>
            <span className="text-gold/50" aria-hidden="true">
              ✦
            </span>
            <span>{PARISH.rite}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
