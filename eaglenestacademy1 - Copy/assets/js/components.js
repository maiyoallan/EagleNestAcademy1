/* Shared page chrome. Keep links relative so pages work on static hosting. */
(function () {
  const pages = [
    { label: "Home", href: "index.html" },
    { label: "About", href: "about.html" },
    { label: "Academics", href: "academics.html" },
    { label: "Student Life", href: "student-life.html" },
    { label: "Admissions", href: "contact.html#apply" },
    { label: "Contact", href: "contact.html" }
  ];
  const phone = "+254792264544";
  const whatsappNumber = phone.replace(/\D/g, "");

  function getCurrentPage() {
    const filename = window.location.pathname.split("/").pop() || "index.html";
    return filename.toLowerCase();
  }

  function renderNavigation(isMobile) {
    const currentPage = getCurrentPage();
    const navClass = isMobile
      ? "flex flex-col gap-1 border-t border-sky-100 px-5 py-4 md:hidden"
      : "hidden items-center gap-1 md:flex";

    return `<nav class="${navClass}"${isMobile ? ' id="mobile-navigation" hidden' : ' aria-label="Main navigation"'}>
      ${pages.map((page) => {
        const isAdmissionsAnchor = page.label === "Admissions";
        const isApplySection = window.location.hash === "#apply";
        const isActive = isAdmissionsAnchor
          ? currentPage === "contact.html" && isApplySection
          : page.href.split("#")[0] === currentPage && !(currentPage === "contact.html" && isApplySection);
        const activeClasses = isActive
          ? "bg-sky-50 text-sky-600"
          : "text-ink hover:bg-sky-50 hover:text-sky-600";
        return `<a class="rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${activeClasses}" href="${page.href}"${isActive ? ' aria-current="page"' : ""}>${page.label}</a>`;
      }).join("")}
    </nav>`;
  }

  function renderHeader() {
    return `<a class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-white focus:px-4 focus:py-2" href="#main-content">Skip to content</a>
      <div class="sticky top-0 z-40 border-b border-sky-100 bg-white/95 shadow-soft backdrop-blur">
        <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <a class="flex min-w-0 items-center gap-3" href="index.html" aria-label="Eaglenest Academy home">
            <span class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-gradient text-lg font-bold text-white" aria-hidden="true">E</span>
            <span class="min-w-0 leading-tight"><span class="block truncate font-heading text-lg font-bold text-ink">Eaglenest Academy</span><span class="mt-1 block text-[0.65rem] font-semibold uppercase tracking-wide text-sky-600">Learn. Grow. Soar.</span></span>
          </a>
          <div class="flex items-center gap-3">
            ${renderNavigation(false)}
            <a class="hidden rounded-lg bg-leaf-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-leaf-500 sm:inline-flex" href="contact.html#apply">Apply Now</a>
            <button class="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-sky-100 text-ink hover:bg-sky-50 md:hidden" type="button" data-menu-toggle aria-controls="mobile-navigation" aria-expanded="false" aria-label="Open menu">
              <svg data-menu-icon-open aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-6 w-6"><path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
              <svg data-menu-icon-close aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="hidden h-6 w-6"><path stroke-linecap="round" d="m6 6 12 12M18 6 6 18" /></svg>
            </button>
          </div>
        </div>
        ${renderNavigation(true)}
      </div>`;
  }

  function renderFooter() {
    return `<div class="bg-ink text-white">
      <div class="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <section aria-labelledby="footer-about">
          <h2 id="footer-about" class="font-heading text-lg font-bold">Eaglenest Academy</h2>
          <p class="mt-4 max-w-xs text-sm leading-6 text-sky-100">A caring learning community where curiosity takes flight and every learner is encouraged to reach their potential.</p>
        </section>
        <section aria-labelledby="footer-links">
          <h2 id="footer-links" class="font-heading text-base font-bold">Quick Links</h2>
          <ul class="mt-4 space-y-3 text-sm text-sky-100">
            ${pages.slice(0, 5).map((page) => `<li><a class="transition-colors hover:text-white" href="${page.href}">${page.label}</a></li>`).join("")}
          </ul>
        </section>
        <section aria-labelledby="footer-contact">
          <h2 id="footer-contact" class="font-heading text-base font-bold">Contact</h2>
          <address class="mt-4 space-y-3 text-sm not-italic leading-6 text-sky-100">
            <p>Nairobi, Kenya</p>
            <p><a class="hover:text-white" href="tel:${phone}">${phone}</a></p>
            <p><a class="break-all hover:text-white" href="mailto:info@eaglenestacademy.ac.ke">info@eaglenestacademy.ac.ke</a></p>
          </address>
        </section>
        <section aria-labelledby="footer-hours">
          <h2 id="footer-hours" class="font-heading text-base font-bold">Hours &amp; Connect</h2>
          <p class="mt-4 text-sm leading-6 text-sky-100">Monday–Friday<br>8:00 AM–5:00 PM</p>
          <div class="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold">
            <a class="hover:text-leaf-100" href="https://www.facebook.com/" aria-label="Facebook">Facebook</a>
            <a class="hover:text-leaf-100" href="https://www.instagram.com/" aria-label="Instagram">Instagram</a>
            <a class="hover:text-leaf-100" href="https://www.youtube.com/" aria-label="YouTube">YouTube</a>
          </div>
        </section>
      </div>
      <div class="border-t border-white/15 px-4 py-5 text-center text-xs text-sky-100 sm:px-6">&copy; ${new Date().getFullYear()} Eaglenest Academy. All rights reserved.</div>
    </div>`;
  }

  function renderWhatsAppButton() {
    return `<a data-whatsapp-button class="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-leaf-600 px-4 py-3 font-bold text-white shadow-soft-lg transition-transform hover:scale-105 hover:bg-leaf-500" href="https://wa.me/${whatsappNumber}" target="_blank" rel="noopener noreferrer" aria-label="Chat with Eaglenest Academy on WhatsApp">
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5"><path d="M12.04 2a9.91 9.91 0 0 0-8.42 15.14L2.3 22l5.02-1.3A10 10 0 1 0 12.04 2Zm0 18.18a8.16 8.16 0 0 1-4.16-1.14l-.3-.18-2.98.77.8-2.9-.2-.3a8.18 8.18 0 1 1 6.84 3.75Zm4.49-6.13c-.25-.12-1.48-.73-1.71-.81-.23-.08-.4-.12-.56.12-.17.25-.65.81-.8.98-.15.17-.3.19-.55.06-.25-.12-1.06-.39-2.02-1.24-.75-.67-1.25-1.49-1.4-1.74-.15-.25-.02-.38.11-.5.11-.1.25-.27.37-.41.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.09s.9 2.42 1.02 2.59c.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.52.6.19 1.15.16 1.58.1.48-.07 1.48-.61 1.69-1.19.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29Z" /></svg>
      <span class="hidden text-sm sm:inline">WhatsApp</span>
    </a>`;
  }

  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");
  if (header) header.innerHTML = renderHeader();
  if (footer) footer.innerHTML = renderFooter();
  if (!document.querySelector("[data-whatsapp-button]")) {
    document.body.insertAdjacentHTML("beforeend", renderWhatsAppButton());
  }
})();