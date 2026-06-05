import { useEffect } from 'react';

const SELECTORS = '.reveal, .reveal-left, .reveal-right, .reveal-scale';

/**
 * Sets up ONE IntersectionObserver for the entire document.
 * Any element with a reveal class is observed directly, so `revealed`
 * is added to the exact element — no parent/child mismatch.
 * A MutationObserver re-runs on route changes so new page content is picked up.
 */
const useGlobalReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.07, rootMargin: '0px 0px -30px 0px' }
    );

    const observeAll = () => {
      document.querySelectorAll(SELECTORS).forEach(el => {
        if (!el.classList.contains('revealed')) observer.observe(el);
      });
    };

    observeAll();

    // Pick up elements added after route transitions
    const mutation = new MutationObserver(observeAll);
    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutation.disconnect();
    };
  }, []);
};

export default useGlobalReveal;
