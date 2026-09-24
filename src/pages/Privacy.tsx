import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { IMAGES } from '../data/images';
import { PARISH } from '../data/site';

export default function Privacy() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Our commitment"
        title="Privacy Policy"
        description="How we handle the information you share with us."
        image={IMAGES['interior-nave']}
      />
      <section className="bg-ivory py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <Reveal>
            <div className="space-y-8 text-[16px] font-light leading-relaxed text-charcoal/75">
              <p>
                {PARISH.name}, {PARISH.place} respects your privacy. This policy explains
                what information we collect through this website and how it is used.
              </p>
              <div>
                <h2 className="font-display text-2xl font-medium text-maroon-deep">Information you share</h2>
                <p className="mt-3">
                  When you contact us — through the contact form, a prayer intention, or
                  email — we receive the details you provide (such as your name, email
                  address and message). We use these solely to respond to your enquiry.
                </p>
              </div>
              <div>
                <h2 className="font-display text-2xl font-medium text-maroon-deep">How we use it</h2>
                <p className="mt-3">
                  Your information is used only for parish communication. We never sell,
                  rent or share your personal details with third parties for marketing.
                  Prayer intentions are treated with strict confidence.
                </p>
              </div>
              <div>
                <h2 className="font-display text-2xl font-medium text-maroon-deep">Cookies & analytics</h2>
                <p className="mt-3">
                  This website does not use advertising cookies. If analytics are enabled
                  in the future, they will be limited to understanding overall visits, and
                  this policy will be updated.
                </p>
              </div>
              <div>
                <h2 className="font-display text-2xl font-medium text-maroon-deep">Contact</h2>
                <p className="mt-3">
                  For any question about your information, write to us at{' '}
                  <a href={`mailto:${PARISH.email}`} className="text-gold-dark underline underline-offset-4">
                    {PARISH.email}
                  </a>{' '}
                  or call {PARISH.phone}.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
