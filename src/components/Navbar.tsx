import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { NAV_LINKS } from '../data/site';
import { getLenis } from '../lib/lenis';
import { Logo } from './Logo';
import { Button } from './ui/button';


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock scroll when the fullscreen menu is open (Lenis-aware)
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const lenis = getLenis();
    if (lenis) {
      if (open) lenis.stop();
      else lenis.start();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open ]);

  // Close the mobile menu on navigation
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const solid = scrolled || open;
  // Floating pill nav once the user scrolls past the hero
  const floating = scrolled && !open;

  return (
    <>
      <div
        className={`fixed z-50 transition-all duration-500 ${
          floating ? 'inset-x-0 top-3 flex justify-center px-4 sm:top-4' : 'inset-x-0 top-0'
        }`}
      >
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`transition-all duration-500 ${
          floating
            ? 'w-full max-w-6xl rounded-full border border-maroon/10 bg-ivory/90 shadow-card backdrop-blur-md'
            : solid
              ? 'w-full bg-ivory/90 shadow-card backdrop-blur-md'
              : 'w-full bg-gradient-to-b from-black/45 to-transparent'
        }`}
      >
        <nav
          className={`mx-auto flex items-center justify-between transition-all duration-500 ${
            floating
              ? 'max-w-6xl px-5 py-3 md:px-7'
              : 'max-w-7xl px-5 md:px-8 ' + (solid ? 'py-3' : 'py-5')
          }`}
          aria-label="Primary"
        >
          <Link
            to="/"
            aria-label="Lourde Matha Church — home"
            className={solid ? 'text-maroon-deep' : 'text-ivory'}
          >
            <Logo light={!solid} />
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `relative text-[12.5px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
                      solid ? 'text-maroon-deep/80' : 'text-ivory/85'
                    } hover:text-gold ${
                      isActive ? (solid ? 'text-gold-dark' : 'text-gold-light') : ''
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span
                        className={`absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-300 ${
                          isActive ? 'w-full' : 'w-0'
                        }`}
                        aria-hidden="true"
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Button
              variant={solid ? 'maroon' : 'gold'}
              size="sm"
              asChild
              className={solid ? undefined : 'bg-gold/95'}
            >
              <Link to="/contact">
                Visit Us <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className={`p-2 transition-colors lg:hidden ${
              solid ? 'text-maroon-deep' : 'text-ivory'
            }`}
          >
            <Menu className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
          </button>
        </nav>
      </motion.header>
      </div>

      {/* Fullscreen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[60] flex flex-col bg-maroon-deep lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div className="flex items-center justify-between px-5 py-4">
              <span className="text-ivory">
                <Logo light />
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="p-2 text-ivory transition-colors hover:text-gold-light"
              >
                <X className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center px-8" aria-label="Mobile">
              <ul className="space-y-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `group flex items-baseline gap-4 border-b border-ivory/10 py-4 ${
                          isActive ? 'text-gold-light' : 'text-ivory'
                        }`
                      }
                    >
                      <span className="font-display text-sm italic text-gold/70">
                        0{i + 1}
                      </span>
                      <span className="font-display text-4xl font-medium transition-colors group-hover:text-gold-light">
                        {link.label}
                      </span>
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-10"
              >
                <Button variant="gold" asChild className="w-full">
                  <Link to="/contact">
                    Visit Us <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </motion.div>
            </nav>
            <p className="px-8 pb-10 text-center text-xs uppercase tracking-luxe text-ivory/40">
              Lourde Matha Church · Thalayanadu
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
