import { useEffect, useRef } from 'react';

/**
 * Auto-sliding behaviour for a horizontal card row on mobile.
 * Attach the returned ref to the scroll container; on md+ screens
 * (where the container becomes a grid) it does nothing.
 * Auto-advance pauses for 6s after the user touches/drags/scrolls it.
 */
export function useAutoSlider<T extends HTMLElement>(interval = 3500) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let pausedUntil = 0;
    const pause = () => {
      pausedUntil = Date.now() + 6000;
    };
    el.addEventListener('touchstart', pause, { passive: true });
    el.addEventListener('pointerdown', pause);
    el.addEventListener('wheel', pause, { passive: true });
    const id = window.setInterval(() => {
      if (document.hidden || Date.now() < pausedUntil) return;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 10) return; // desktop layout — nothing to slide
      const first = el.children[0] as HTMLElement | undefined;
      const step = first ? first.offsetWidth + 20 : Math.round(el.clientWidth * 0.8);
      const next = el.scrollLeft + step;
      el.scrollTo({ left: next >= max - 8 ? 0 : next, behavior: 'smooth' });
    }, interval);
    return () => {
      window.clearInterval(id);
      el.removeEventListener('touchstart', pause);
      el.removeEventListener('pointerdown', pause);
      el.removeEventListener('wheel', pause);
    };
  }, [interval]);

  return ref;
}
