import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  image: string;
}

/** Cinematic inner-page hero with parallax background. */
export default function PageHero({ eyebrow, title, description, image }: PageHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '22%']);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.25]);

  return (
    <section ref={ref} className="relative flex min-h-[62vh] items-end overflow-hidden bg-maroon-deep">
      <motion.div style={{ y }} className="absolute inset-0" aria-hidden="true">
        <img src={image} alt="" className="h-[115%] w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-maroon-deep/70 via-maroon-deep/45 to-maroon-deep/85" aria-hidden="true" />

      <motion.div
        style={{ opacity }}
        className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-36 md:px-8 md:pb-20"
      >
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="eyebrow-light"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-3xl font-display text-5xl font-extrabold uppercase leading-[1.05] tracking-tight text-ivory md:text-6xl"
        >
          {title}
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-6 h-px w-20 origin-left bg-gold"
          aria-hidden="true"
        />
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 max-w-2xl text-[17px] font-light leading-relaxed text-ivory/75"
          >
            {description}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
