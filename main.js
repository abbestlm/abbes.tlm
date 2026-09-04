(() => {
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  if (reduceMotion) return;

  const REVEAL_ATTR = "data-reveal";
  const REVEAL_CLASS = "reveal";
  const VISIBLE_CLASS = "is-visible";
  const STAGGER_MS = 40;
  const MAX_DELAY_MS = 480;

  const getRevealElements = () => Array.from(document.querySelectorAll(`[${REVEAL_ATTR}]`));

  const primeReveal = (elements) => {
    elements.forEach((el, i) => {
      el.classList.add(REVEAL_CLASS);
      const delay = Math.min(i * STAGGER_MS, MAX_DELAY_MS);
      el.style.setProperty("--reveal-delay", `${delay}ms`);
    });
  };

  const revealNow = (el, observer) => {
    el.classList.add(VISIBLE_CLASS);
    observer.unobserve(el);
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) revealNow(entry.target, obs);
      }
    },
    { root: null, rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
  );

  const observeAll = (elements) => elements.forEach((el) => observer.observe(el));

  // Initial pass
  const initial = getRevealElements();
  primeReveal(initial);
  observeAll(initial);

  // Auto-observe dynamically inserted content (e.g. project cards)
  const mo = new MutationObserver((mutations) => {
    const added = [];
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (!(node instanceof Element)) continue;
        if (node.hasAttribute(REVEAL_ATTR)) added.push(node);
        added.push(...node.querySelectorAll?.(`[${REVEAL_ATTR}]`));
      }
    }

    if (added.length === 0) return;
    const unique = Array.from(new Set(added));
    primeReveal(unique);
    observeAll(unique);
  });

  mo.observe(document.documentElement, { childList: true, subtree: true });
})();

