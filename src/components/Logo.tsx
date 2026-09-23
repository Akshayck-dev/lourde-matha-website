interface LogoMarkProps {
  className?: string;
}

/** Minimal parish emblem: a Latin cross within a thin gold ring. */
export function LogoMark({ className = 'h-10 w-10' }: LogoMarkProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="21.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="24" cy="24" r="17.5" stroke="currentColor" strokeWidth="0.7" opacity="0.55" />
      <path
        d="M24 13v22M17.5 21h13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface LogoProps {
  light?: boolean;
}

/** Wordmark lockup used in the navbar and footer. */
export function Logo({ light = false }: LogoProps) {
  return (
    <span className="flex items-center gap-3">
      <LogoMark className={`h-10 w-10 ${light ? 'text-gold-light' : 'text-gold'}`} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[22px] font-semibold tracking-wide ${
            light ? 'text-ivory' : 'text-current'
          }`}
        >
          Lourde Matha
        </span>
        <span
          className={`mt-1 text-[9px] font-medium uppercase tracking-luxe ${
            light ? 'text-gold-light/80' : 'text-gold-dark'
          }`}
        >
          Church · Thalayanadu
        </span>
      </span>
    </span>
  );
}
