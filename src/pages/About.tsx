import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Droplets,
  HeartHandshake,
  Wheat,
  Flame,
  Heart,
  Cross,
  Music,
  Users,
  BookOpen,
  HandHeart,
  Church,
} from 'lucide-react';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import { IMAGES } from '../data/images';
import { PARISH, MILESTONES, VALUES, MISSION, SACRAMENTS, MINISTRIES } from '../data/site';

const SACRAMENT_ICONS = [Droplets, HeartHandshake, Wheat, Flame, Heart, Cross];
const MINISTRY_ICONS = [Music, Users, BookOpen, HandHeart, Church];

function Story() {
  return (
    <section className="bg-ivory py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Our story"
          title="Nine Decades of Grace"
          description={`The story of ${PARISH.name} is the story of the families of Thalayanadu — their faith, their feasts, and their quiet fidelity across generations.`}
        />

        <div className="relative mt-16">
          {/* timeline spine */}
          <div className="absolute bottom-0 left-[7px] top-0 w-px bg-gold/40 md:left-1/2" aria-hidden="true" />

          <div className="space-y-14 md:space-y-20">
            {MILESTONES.map((m, i) => (
              <Reveal key={m.year} delay={0.05 * i}>
                <div
                  className={`relative pl-10 md:w-1/2 md:pl-0 ${
                    i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:ml-auto md:pl-16'
                  }`}
                >
                  <span
                    className={`absolute left-0 top-1.5 h-[15px] w-[15px] rotate-45 border border-gold bg-ivory ${
                      i % 2 === 0 ? 'md:left-auto md:-right-[8px]' : 'md:-left-[8px]'
                    }`}
                    aria-hidden="true"
                  />
                  <p className="font-display text-3xl italic text-gold-dark">{m.year}</p>
                  <h3 className="mt-2 font-display text-2xl font-medium text-maroon-deep">{m.title}</h3>
                  <p className="mt-3 text-[15.5px] font-light leading-relaxed text-charcoal/70">{m.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section className="bg-cream/70 py-24 md:py-28">
      <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
        <Reveal>
          <p className="eyebrow">Our mission</p>
          <blockquote className="mt-6 font-display text-3xl font-medium italic leading-snug text-maroon-deep md:text-4xl">
            “{MISSION}”
          </blockquote>
          <div className="gold-rule mt-8" aria-hidden="true" />
        </Reveal>
      </div>
    </section>
  );
}

function Values() {
  return (
    <section className="bg-ivory py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="What we hold dear"
          title="Our Values"
        />
        <div className="mt-14 grid gap-px bg-maroon/10 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.07} className="h-full">
              <div className="group h-full bg-ivory p-9 transition-colors duration-500 hover:bg-maroon-deep">
                <p className="font-display text-lg italic text-gold-dark transition-colors group-hover:text-gold-light">
                  0{i + 1}
                </p>
                <h3 className="mt-4 font-display text-3xl font-medium text-maroon-deep transition-colors group-hover:text-ivory">
                  {v.title}
                </h3>
                <p className="mt-3 text-[15px] font-light leading-relaxed text-charcoal/65 transition-colors group-hover:text-ivory/70">
                  {v.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Leadership() {
  return (
    <section className="bg-maroon-deep py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <SectionHeading
          dark
          eyebrow="Shepherds of the flock"
          title="Parish Leadership"
          description="Guided by our vicar and served by the parish council, our parish walks together in faith."
        />

        <div className="mt-14 flex justify-center">
          <Reveal>
            <div className="group relative max-w-sm border border-gold/25 bg-maroon-rich/40 p-10 text-center transition-colors duration-500 hover:border-gold/60">
              {/* monogram */}
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-gold/60">
                <span className="font-display text-4xl font-medium text-gold-light">FS</span>
              </div>
              <p className="mt-7 text-[11px] font-medium uppercase tracking-luxe text-gold-light/80">
                {PARISH.vicarRole}
              </p>
              <h3 className="mt-2 font-display text-3xl font-medium text-ivory">{PARISH.vicar}</h3>
              <div className="gold-rule mt-6" aria-hidden="true" />
              <p className="mt-6 text-[15px] font-light leading-relaxed text-ivory/65">
                Shepherding the parish family of Thalayanadu with devotion to Our Lady of
                Lourdes and care for every household.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CommunitySection() {
  return (
    <section className="bg-ivory py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="img-frame aspect-[4/3] shadow-soft">
            <img src={IMAGES['life-community']} alt="Parishioners gathered after Sunday Mass" loading="lazy" />
          </div>
        </Reveal>
        <div>
          <Reveal>
            <p className="eyebrow">One family</p>
            <h2 className="display-heading mt-4 text-4xl md:text-5xl">Our Community</h2>
            <div className="gold-rule-left mt-6" aria-hidden="true" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-[17px] font-light leading-relaxed text-charcoal/75">
              From the choir loft to the catechism classroom, from the youth group to the
              charitable societies — the life of {PARISH.name} is carried by its people.
              New faces are not strangers here for long.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <Link to="/contact" className="btn-maroon mt-9">
              Get in Touch <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <main>
      <PageHero
        eyebrow="Lourde Matha Church · Thalayanadu"
        title="About Our Parish"
        description={`A ${PARISH.rite} parish of the ${PARISH.diocese} — established ${PARISH.established}, under the patronage of ${PARISH.patrons}.`}
        image={IMAGES['interior-nave']}
      />
      <Story />
      <Mission />
      <Values />
      <Leadership />
      <CommunitySection />
      <Sacraments />
      <Ministries />
    </main>
  );
}

function Sacraments() {
  return (
    <section className="bg-ivory py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Milestones of faith"
          title="Sacraments"
          description="From baptism to matrimony — the sacred moments of Christian life, celebrated in the Syro-Malabar tradition."
        />
        <div className="mt-14 grid gap-px bg-maroon/10 sm:grid-cols-2 lg:grid-cols-3">
          {SACRAMENTS.map((s, i) => {
            const Icon = SACRAMENT_ICONS[i % SACRAMENT_ICONS.length];
            return (
              <Reveal key={s.name} delay={(i % 3) * 0.07} className="h-full">
                <div className="group h-full bg-ivory p-9 transition-colors duration-500 hover:bg-maroon-deep">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 text-gold-dark transition-colors duration-500 group-hover:border-gold/60 group-hover:text-gold-light">
                    <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-medium text-maroon-deep transition-colors duration-500 group-hover:text-ivory">
                    {s.name}
                  </h3>
                  <p className="mt-3 text-[15px] font-light leading-relaxed text-charcoal/65 transition-colors duration-500 group-hover:text-ivory/70">
                    {s.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-12 max-w-2xl text-center text-[15px] font-light italic leading-relaxed text-charcoal/60">
            To arrange a sacrament, please speak to the parish office — we will guide you
            through every step.
          </p>
          <div className="mt-6 text-center">
            <Link to="/contact" className="btn-maroon">
              Contact Parish Office <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Ministries() {
  return (
    <section className="bg-maroon-deep py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          dark
          eyebrow="Serve & belong"
          title="Ministries & Groups"
          description="The life of our parish is carried by its people — there is a place for every gift here."
        />
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {MINISTRIES.map((m, i) => {
            const Icon = MINISTRY_ICONS[i % MINISTRY_ICONS.length];
            return (
              <Reveal key={m.name} delay={(i % 3) * 0.07}>
                <div className="h-full border border-gold/25 bg-maroon-rich/40 p-9 transition-colors duration-500 hover:border-gold/60">
                  <Icon className="h-7 w-7 text-gold-light" strokeWidth={1.5} aria-hidden="true" />
                  <h3 className="mt-5 font-display text-2xl font-medium text-ivory">{m.name}</h3>
                  <p className="mt-3 text-[15px] font-light leading-relaxed text-ivory/65">
                    {m.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-12 max-w-2xl text-center text-[15px] font-light leading-relaxed text-ivory/60">
            Want to lend your voice, your hands or your time?{' '}
            <Link to="/contact" className="text-gold-light underline-offset-4 transition-colors hover:text-gold hover:underline">
              Get in touch
            </Link>{' '}
            — we would love to welcome you.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
