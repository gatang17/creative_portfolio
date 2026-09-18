/* =========================================================
   TANA — shell compartido.
   El header y el footer se generan aquí para que todas las
   páginas compartan una única fuente de verdad: si cambia el
   menú, cambia en todo el sitio.
   Se inyecta con JS (no fetch) para que funcione también
   abriendo los archivos directamente con file://
   ========================================================= */

const NAV = [
  { label: "Home",       href: "index.html"      },
  { label: "About",      href: "about.html"      },
  { label: "Menu",       href: "menu.html"       },
  { label: "Reserve",    href: "reserve.html"    },
  { label: "Contact",    href: "contact.html"    },
  { label: "Press",      href: "press.html"      },
  { label: "Gift Cards", href: "gift-cards.html" }
];

const SPRIG = `
<svg class="sprig sprig--left" viewBox="0 0 60 200" fill="none" aria-hidden="true">
  <path d="M30 200V12" stroke="currentColor" stroke-width="1.1"/>
  <path d="M30 168c-14 0-22-9-22-22 13 0 22 8 22 22Z" stroke="currentColor" stroke-width="1.1"/>
  <path d="M30 138c14 0 22-9 22-22-13 0-22 8-22 22Z" stroke="currentColor" stroke-width="1.1"/>
  <path d="M30 104c-14 0-22-9-22-22 13 0 22 8 22 22Z" stroke="currentColor" stroke-width="1.1"/>
  <path d="M30 72c14 0 22-9 22-22-13 0-22 8-22 22Z" stroke="currentColor" stroke-width="1.1"/>
  <path d="M30 40c-12 0-19-8-19-19 11 0 19 7 19 19Z" stroke="currentColor" stroke-width="1.1"/>
  <circle cx="30" cy="9" r="4" stroke="currentColor" stroke-width="1.1"/>
</svg>`;

const LEAF_MARK = `
<svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
  <path d="M20 34V14" stroke="currentColor" stroke-width="1.6"/>
  <path d="M20 26c-8 0-13-5-13-13 8 0 13 5 13 13Z" stroke="currentColor" stroke-width="1.6"/>
  <path d="M20 21c8 0 13-5 13-13-8 0-13 5-13 13Z" stroke="currentColor" stroke-width="1.6"/>
</svg>`;

/* Nombre del archivo actual, para marcar el link activo */
function currentPage() {
  const file = window.location.pathname.split("/").pop();
  return file === "" ? "index.html" : file;
}

function buildHeader(slot) {
  const here = currentPage();

  const links = NAV.map(item => {
    const active = item.href === here ? ' aria-current="page"' : "";
    return `<a href="${item.href}"${active}>${item.label}</a>`;
  }).join("");

  slot.outerHTML = `
    <header class="nav" id="siteNav">
      <a class="nav__brand" href="index.html" aria-label="TANA — inicio">
        <span class="mark">${LEAF_MARK}</span>
        <span class="nav__brand-name wordmark">Tana</span>
      </a>
      <button class="nav__toggle" type="button" aria-expanded="false" aria-controls="navLinks" aria-label="Abrir menú">
        <i class="fa-solid fa-bars"></i>
      </button>
      <nav class="nav__links" id="navLinks">${links}</nav>
    </header>`;
}

function buildFooter(slot) {
  const year = new Date().getFullYear();

  slot.outerHTML = `
    <footer class="foot">
      ${SPRIG}
      ${SPRIG.replace("sprig--left", "sprig--right")}
      <div class="shell">
        <div class="foot__grid foot__grid--brand">
          <a class="foot__brand" href="index.html" aria-label="TANA — inicio">
            <span class="mark">${LEAF_MARK}</span>
            <span class="foot__brand-name wordmark">Tana</span>
          </a>
          <div>
            <h3>Information</h3>
            <ul>
              <li><a href="#">Accessibility</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms &amp; Conditions</a></li>
              <li><a href="#">Site Map</a></li>
            </ul>
          </div>
          <div>
            <h3>Hours</h3>
            <p>Wednesday – Monday<br>5PM – 10PM</p>
            <h3 style="margin-top:18px">Location</h3>
            <p>983 Goss Ave<br>Louisville, KY</p>
          </div>
          <div>
            <h3>Want to get in touch?</h3>
            <p>Want to inquire about private dining, catering, hosting an event, press, etc?</p>
            <ul style="margin-top:12px"><li><a href="contact.html">Contact us</a></li></ul>
          </div>
        </div>
        <div class="foot__base">
          <span class="foot__copy">Copyright © ${year} Tana Restaurant. All rights reserved.</span>
          <div class="foot__social">
            <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
          </div>
        </div>
      </div>
    </footer>`;
}

/* Nav: fondo sólido al bajar + menú móvil */
function setupNav() {
  const nav = document.getElementById("siteNav");
  if (!nav) return;

  const onScroll = () => nav.classList.toggle("is-stuck", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const toggle = nav.querySelector(".nav__toggle");
  const links = nav.querySelector(".nav__links");

  toggle?.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });
}

/* Aparición suave de las secciones */
function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach(el => el.classList.add("is-in"));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      io.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -10% 0px", threshold: .12 });

  items.forEach(el => io.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-tana-header]").forEach(buildHeader);
  document.querySelectorAll("[data-tana-footer]").forEach(buildFooter);
  setupNav();
  setupReveal();
});
