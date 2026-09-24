import { useState, type FormEvent } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import { Button } from '../components/ui/button';
import { IMAGES } from '../data/images';
import { PARISH } from '../data/site';

const inputClass =
  'w-full rounded-xl border border-maroon/15 bg-white/70 px-5 py-4 text-[15px] font-light text-charcoal placeholder:text-charcoal/35 outline-none transition-all duration-300 focus:border-gold focus:bg-white focus:shadow-card';

function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') || '');
    const email = String(data.get('email') || '');
    const phone = String(data.get('phone') || '');
    const message = String(data.get('message') || '');
    const subject = encodeURIComponent(`Website enquiry — ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`);
    window.location.href = `mailto:${PARISH.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-2xl border border-maroon/10 bg-white/60 p-10 text-center shadow-card">
        <CheckCircle2 className="h-14 w-14 text-gold" strokeWidth={1.25} aria-hidden="true" />
        <h3 className="mt-6 font-display text-3xl font-medium text-maroon-deep">Thank You</h3>
        <p className="mt-3 max-w-sm text-[15px] font-light leading-relaxed text-charcoal/65">
          Your email app should now be open with your message addressed to the parish
          office. We look forward to hearing from you.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 text-[13px] font-medium uppercase tracking-[0.18em] text-gold-dark underline-offset-4 hover:underline"
        >
          Write another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-maroon/10 bg-white/60 p-7 shadow-card md:p-10">
      <h3 className="font-display text-3xl font-medium text-maroon-deep">Send a Message</h3>
      <p className="mt-2 text-[14.5px] font-light text-charcoal/60">
        We usually reply within a day or two.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-[11px] font-medium uppercase tracking-luxe text-charcoal/55">
            Name *
          </label>
          <input id="name" name="name" required autoComplete="name" placeholder="Your full name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-[11px] font-medium uppercase tracking-luxe text-charcoal/55">
            Email *
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={inputClass} />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="phone" className="mb-2 block text-[11px] font-medium uppercase tracking-luxe text-charcoal/55">
          Phone
        </label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+91 …" className={inputClass} />
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="mb-2 block text-[11px] font-medium uppercase tracking-luxe text-charcoal/55">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="How can we help you?"
          className={`${inputClass} resize-none`}
        />
      </div>

      <Button type="submit" variant="maroon" className="mt-8 w-full">
        Send Message <Send className="h-4 w-4" aria-hidden="true" />
      </Button>
      <p className="mt-4 text-center text-[13px] font-light text-charcoal/50">
        This opens your email app with the message addressed to the parish office.
      </p>
    </form>
  );
}

export default function Contact() {
  const details = [
    { icon: MapPin, label: 'Address', value: PARISH.addressLines.join(', ') },
    { icon: Phone, label: 'Phone', value: PARISH.phone, href: PARISH.phoneHref },
    { icon: Mail, label: 'Email', value: PARISH.email, href: `mailto:${PARISH.email}` },
    // office hours render only once confirmed with the parish office
    ...(PARISH.officeHours
      ? [{ icon: Clock, label: 'Parish Office Hours', value: PARISH.officeHours }]
      : []),
  ];

  return (
    <main id="main-content">
      <PageHero
        eyebrow="We’d love to hear from you"
        title="Contact Us"
        description="Questions about Mass, sacraments or parish life — reach out, and we’ll respond with joy."
        image={IMAGES['welcome-facade']}
      />

      <section className="bg-ivory py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            {/* info */}
            <div>
              <SectionHeading align="left" eyebrow="Get in touch" title="Visit, Call or Write" />
              <Reveal delay={0.1}>
                <ul className="mt-10 divide-y divide-maroon/10 border-y border-maroon/10">
                  {details.map(({ icon: Icon, label, value, href }) => (
                    <li key={label} className="flex items-start gap-5 py-6">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gold/50 text-gold-dark">
                        <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-[11px] font-medium uppercase tracking-luxe text-charcoal/50">
                          {label}
                        </span>
                        {href ? (
                          <a
                            href={href}
                            className="mt-1 block break-all font-display text-[22px] leading-snug text-maroon-deep transition-colors hover:text-gold-dark"
                          >
                            {value}
                          </a>
                        ) : (
                          <span className="mt-1 block break-all font-display text-[22px] leading-snug text-maroon-deep">
                            {value}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="mt-8 rounded-xl border border-gold/40 bg-gold/10 p-6">
                  <p className="font-display text-xl italic text-maroon-deep">
                    “Come to me, all you who are weary, and I will give you rest.”
                  </p>
                  <p className="mt-2 text-[12px] uppercase tracking-luxe text-charcoal/50">Matthew 11:28</p>
                </div>
              </Reveal>
            </div>

            {/* form */}
            <Reveal delay={0.12}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* map */}
      <section className="relative h-[420px] bg-cream" aria-label="Parish location map">
        <iframe
          title={`Map — ${PARISH.name}, ${PARISH.place}`}
          src={PARISH.mapsEmbed}
          className="absolute inset-0 h-full w-full grayscale-[35%] contrast-[1.02]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="pointer-events-none absolute left-1/2 top-8 -translate-x-1/2">
          <div className="pointer-events-auto rounded-2xl bg-maroon-deep px-8 py-5 text-center shadow-soft">
            <p className="font-display text-2xl text-ivory">{PARISH.name}</p>
            <a
              href={PARISH.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-block text-[12px] font-medium uppercase tracking-[0.18em] text-gold-light hover:text-gold"
            >
              Get Directions →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
