import type { ReactNode } from 'react';
import Reveal from './Reveal';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: 'center' | 'left';
  dark?: boolean;
}

/** Reference-site section heading: bold uppercase eyebrow, Montserrat extrabold title. */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  dark = false,
}: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <Reveal className={centered ? 'text-center' : 'text-left'}>
      <p className={dark ? 'eyebrow-light' : 'eyebrow'}>{eyebrow}</p>
      <h2
        className={`display-heading mt-4 text-4xl md:text-5xl ${
          dark ? 'text-ivory' : ''
        } ${centered ? 'mx-auto max-w-3xl' : 'max-w-2xl'}`}
      >
        {title}
      </h2>
      <div className={`mt-6 bg-gold ${centered ? 'gold-rule' : 'gold-rule-left'}`} aria-hidden="true" />
      {description && (
        <p
          className={`mt-6 max-w-2xl text-[16.5px] leading-relaxed ${
            dark ? 'text-ivory/70' : 'text-charcoal/70'
          } ${centered ? 'mx-auto' : ''}`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
