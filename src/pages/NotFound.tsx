import { Link } from 'react-router-dom';
import { ArrowLeft, Church } from 'lucide-react';
import Reveal from '../components/Reveal';
import { Button } from '../components/ui/button';

export default function NotFound() {
  return (
    <main id="main-content">
      <section className="flex min-h-[78vh] items-center bg-ivory">
        <div className="mx-auto max-w-2xl px-5 py-24 text-center md:px-8">
          <Reveal>
            <span className="mx-auto flex h-16 w-16 items-center justify-center border-2 border-gold text-gold">
              <Church className="h-8 w-8" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <p className="eyebrow mt-8">Lost your way</p>
            <h1 className="display-heading mt-4 text-5xl text-maroon-deep md:text-6xl">
              Page not found
            </h1>
            <p className="mx-auto mt-6 max-w-md text-[16px] font-light leading-relaxed text-charcoal/70">
              The page you were looking for has moved or no longer exists. Let us
              walk you back to the parish home.
            </p>
            <Button variant="gold" size="lg" asChild className="mt-10">
              <Link to="/">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Home
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
