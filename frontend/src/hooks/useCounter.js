import { useState, useEffect, useRef } from 'react';

/**
 * Counts from 0 up to `target` over `duration` ms using an ease-out cubic curve.
 * Starts animating only when `active` is true (so you can trigger it on scroll).
 */
const useCounter = (target, duration = 1800, active = false) => {
  const [count, setCount] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration, active]);

  return count;
};

export default useCounter;
