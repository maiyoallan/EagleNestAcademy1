/* Page interactions shared across the static site. */
document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileNavigation = document.getElementById("mobile-navigation");

  if (menuToggle && mobileNavigation) {
    const openIcon = menuToggle.querySelector("[data-menu-icon-open]");
    const closeIcon = menuToggle.querySelector("[data-menu-icon-close]");

    function setMenuOpen(isOpen) {
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
      mobileNavigation.hidden = !isOpen;
      mobileNavigation.classList.toggle("hidden", !isOpen);
      if (openIcon) openIcon.classList.toggle("hidden", isOpen);
      if (closeIcon) closeIcon.classList.toggle("hidden", !isOpen);
    }

    menuToggle.addEventListener("click", () => {
      setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
    });
    mobileNavigation.addEventListener("click", (event) => {
      if (event.target.closest("a")) setMenuOpen(false);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    });
  }

  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  }

  const counters = document.querySelectorAll("[data-count]");
  function animateCounter(element) {
    if (element.dataset.countStarted === "true") return;
    element.dataset.countStarted = "true";
    const target = Number(element.dataset.count);
    if (!Number.isFinite(target)) return;

    const duration = Number(element.dataset.countDuration) || 1400;
    const decimals = (String(element.dataset.count).split(".")[1] || "").length;
    const prefix = element.dataset.countPrefix || "";
    const suffix = element.dataset.countSuffix || "";
    const startTime = performance.now();

    function updateCounter(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const value = (target * easedProgress).toFixed(decimals);
      element.textContent = `${prefix}${value}${suffix}`;
      if (progress < 1) window.requestAnimationFrame(updateCounter);
    }

    window.requestAnimationFrame(updateCounter);
  }

  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach((counter) => counterObserver.observe(counter));
  } else {
    counters.forEach(animateCounter);
  }

  document.querySelectorAll("[data-accordion-trigger]").forEach((trigger) => {
    const panelId = trigger.getAttribute("aria-controls");
    const panel = panelId ? document.getElementById(panelId) : null;
    if (!panel) return;

    trigger.setAttribute("aria-expanded", String(!panel.hidden));
    trigger.addEventListener("click", () => {
      const isExpanded = trigger.getAttribute("aria-expanded") === "true";
      trigger.setAttribute("aria-expanded", String(!isExpanded));
      panel.hidden = isExpanded;
    });
  });

  let backToTop = document.getElementById("back-to-top");
  if (!backToTop) {
    document.body.insertAdjacentHTML("beforeend", `<button id="back-to-top" class="fixed bottom-20 right-5 z-30 hidden h-11 w-11 items-center justify-center rounded-full bg-ink text-white shadow-soft-lg transition-colors hover:bg-sky-600" type="button" aria-label="Back to top" title="Back to top"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5"><path stroke-linecap="round" stroke-linejoin="round" d="m5 15 7-7 7 7" /></svg></button>`);
    backToTop = document.getElementById("back-to-top");
  }

  if (backToTop) {
    const updateBackToTop = () => {
      const isVisible = window.scrollY > 400;
      backToTop.classList.toggle("hidden", !isVisible);
      backToTop.classList.toggle("inline-flex", isVisible);
    };
    window.addEventListener("scroll", updateBackToTop, { passive: true });
    updateBackToTop();
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }
});