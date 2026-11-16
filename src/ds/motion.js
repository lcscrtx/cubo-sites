import { useEffect, useRef, useState } from "react";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** true a partir da primeira vez que o elemento entra na tela (não volta a false). */
export function useInView({ threshold = 0.3, rootMargin = "0px 0px -10% 0px" } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
}

/** Conta de 0 até `to` quando `start` vira true. Easing out-expo. */
export function useCountUp(to, start, duration = 1600) {
  const [value, setValue] = useState(prefersReducedMotion() ? to : 0);

  useEffect(() => {
    if (!start) return;
    if (prefersReducedMotion()) {
      setValue(to);
      return;
    }
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      const e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setValue(to * e);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, start, duration]);

  return value;
}

/** Contador que avança a cada `ms` enquanto `active` for true. */
export function useTicker(active, ms = 2000) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!active || prefersReducedMotion()) return;
    const id = setInterval(() => setTick((t) => t + 1), ms);
    return () => clearInterval(id);
  }, [active, ms]);
  return tick;
}
