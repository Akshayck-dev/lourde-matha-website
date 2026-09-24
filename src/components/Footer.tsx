import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { PARISH, NAV_LINKS, MASS_SCHEDULE } from '../data/site';
import { Logo } from './Logo';
import { FacebookIcon, InstagramIcon, YoutubeIcon } from './SocialIcons';
import Reveal from './Reveal';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-maroon-deep text-ivory">
      {/* tri-band contact strip — coral / orange / amber */}
      <div className="grid md:grid-cols-3">
        <a
          href={PARISH.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center bg-accent-coral px-6 py-10 text-center text-white transition-colors duration-300 hover:bg-[#d34553]"
        >
          <MapPin className="h-8 w-8 text-white transition-transform duration-300 group-hover:-translate-y-1" strokeWidth={1.25} aria-hidden="true" />
          <p className="mt-4 text-[12px] font-bold uppercase tracking-[0.24em]">Location</p>
          <p className="mt-2 max-w-xs text-[14.5px] leading-relaxed text-white/85">
            {PARISH.addressLines.join(', ')}
          </p>
        </a>
        <a
          href={PARISH.phoneHref}
          className="group flex flex-col items-center bg-gold px-6 py-10 text-center text-white transition-colors duration-300 hover:bg-gold-dark"
        >
          <Phone className="h-8 w-8 text-white transition-transform duration-300 group-hover:-translate-y-1" strokeWidth={1.25} aria-hidden="true" />
          <p className="mt-4 text-[12px] font-bold uppercase tracking-[0.24em]">Phone</p>
          <p className="mt-2 text-[15px] tracking-wide text-white/90">{PARISH.phone}</p>
        </a>
        <a
          href={`mailto:${PARISH.email}`}
          className="group flex flex-col items-center bg-accent-amber px-6 py-10 text-center text-maroon-deep transition-colors duration-300 hover:bg-[#ffc93c]"
        >
          <Mail className="h-8 w-8 transition-transform duration-300 group-hover:-translate-y-1" strokeWidth={1.25} aria-hidden="true" />
          <p className="mt-4 text-[12px] font-bold uppercase tracking-[0.24em]">Email</p>
          <p className="mt-2 break-all text-[14.5px]">{PARISH.email}</p>
        </a>
      </div>

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
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 text-ivory/70 transition-colors duration-300 hover:border-accent-cyan hover:text-accent-cyan"
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
