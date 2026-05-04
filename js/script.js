
document.addEventListener("DOMContentLoaded", () => {
  loadInjectedHeader();
  setupSmoothScroll();
  startPreloader();
  loadProducts();

  setupHeroBubbles();
  setupAboutBubbles();
});

/* =========================
   PRELOADER
========================= */
function startPreloader() {
  const progressBar = document.getElementById("progress-bar");
  const progressText = document.getElementById("progress-text");
  const loadingScreen = document.getElementById("loading");

  if (!progressBar || !progressText || !loadingScreen) return;

  let progress = 0;

  const loadingInterval = setInterval(() => {
    progress += Math.random() * 7;
    if (progress > 100) progress = 100;

    progressBar.style.width = progress + "%";
    progressText.textContent = Math.floor(progress) + "%";

    if (progress >= 100) {
      clearInterval(loadingInterval);
      setTimeout(() => {
        loadingScreen.style.opacity = "0";
        loadingScreen.style.transition = "opacity 0.4s ease";
        setTimeout(() => {
          loadingScreen.style.display = "none";
        }, 400);
      }, 250);
    }
  }, 35);
}

function setupAboutBubbles() {
  const bubbles = document.querySelectorAll(".about-bubble");
  bubbles.forEach(bubble => {
    bubble.addEventListener("click", () => explodeBubble(bubble));
  });
}

function setupHeroBubbles() {
  document.querySelectorAll(".bouncing-ball").forEach(bubble => {
    bubble.addEventListener("click", () => explodeBubble(bubble));
  });
}
function explodeBubble(el) {
  if (el.classList.contains("boom")) return;

  el.classList.add("boom");

  const rect = el.getBoundingClientRect();

  el.style.position = "fixed";
  el.style.left = rect.left + "px";
  el.style.top = rect.top + "px";
  el.style.width = rect.width + "px";
  el.style.height = rect.height + "px";
  el.style.zIndex = "9999";
  el.style.animation = "none";

  el.getBoundingClientRect();

  const r = Math.random() * 360;
  const x = (Math.random() - 0.5) * 200;
  const y = (Math.random() - 0.5) * 200;

  requestAnimationFrame(() => {
    el.style.transition = "transform .3s ease, opacity .3s ease";
    el.style.transform = `translate(${x}px, ${y}px) scale(3.5) rotate(${r}deg)`;
    el.style.opacity = "0";
  });

  setTimeout(() => el.remove(), 300);
}

/* =========================
   HEADER INYECTADO
========================= */
function loadInjectedHeader() {
  fetch("./js/data/header.html")
    .then(res => res.text())
    .then(html => {
      const header = document.getElementById("header");
      if (!header) return;

      header.innerHTML = html;
      header.classList.add("show");

      setupInjectedMenu();
    })
    .catch(err => console.error("Header load error:", err));
}

function setupInjectedMenu() {
  const btnHamburger = document.getElementById("menu_hamburguer");
  const dropdownMenu = document.getElementById("navbarMenu");
  const blurElements = document.getElementsByClassName("borroso");

  if (!btnHamburger || !dropdownMenu) return;

  btnHamburger.addEventListener("click", () => {
    const isVisible = dropdownMenu.style.visibility === "visible";
    dropdownMenu.style.visibility = isVisible ? "hidden" : "visible";
    document.body.style.overflow = isVisible ? "" : "hidden";

    [...blurElements].forEach(el => {
      el.style.filter = isVisible ? "none" : "blur(5px) brightness(0.4)";
    });
  });

  dropdownMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      dropdownMenu.style.visibility = "hidden";
      document.body.style.overflow = "";

      [...blurElements].forEach(el => {
        el.style.filter = "none";
      });
    });
  });
}

/* =========================
   SMOOTH SCROLL
========================= */
function setupSmoothScroll() {
  document.addEventListener("click", e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const href = link.getAttribute("href");
    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
}

/* =========================
   LOAD PRODUCTS JSON
========================= */
async function loadProducts() {
  try {
    const response = await fetch("./js/data/products.json");
    const data = await response.json();

    renderProducts(data.products);
    renderNutrition(data.products);
  } catch (error) {
    console.error("Error loading products JSON:", error);
  }
}

function renderProducts(products) {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  grid.innerHTML = products.map(product => `
      <article class="product-card ${product.theme} fade-up">
          <!-- AQUÍ SE AGREGA EL STYLE INLINE -->
          <div class="product-meta" >
              <span class="product-chip" >${product.badge}</span>
              <span class="product-chip">${product.subtitle}</span>
          </div>
          <div class="product-thumb" style="background-image: url('${product.image}'); background-size: cover; background-position: center;">
              <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="product-info">
              <h3>${product.name}</h3>
              <p class="product-subtitle">${product.subtitle}</p>
              <p class="product-price">$${product.price.toFixed(2)}</p>
          </div>
          <span class="product-dot"></span>
      </article>
  `).join("");
}



function renderNutrition(products) {
  const grid = document.getElementById("nutritionGrid");
  if (!grid) return;

  grid.innerHTML = products.map(product => `
    <article class="nutrition-card fade-up">
      <h3>${product.name}</h3>
      <ul>
        <li><span>Calories</span><strong>${product.nutrition.calories}</strong></li>
        <li><span>Total Sugar</span><strong>${product.nutrition.totalSugar}</strong></li>
        <li><span>Vitamin C</span><strong>${product.nutrition.vitaminC}</strong></li>
        <li><span>Fiber</span><strong>${product.nutrition.fiber}</strong></li>
      </ul>
    </article>
  `).join("");
}

/* =========================
   review
========================= */

const reviewTrack = document.querySelector(".review-track");
const reviewSlides = document.querySelectorAll(".review-slide");
const reviewPrev = document.getElementById("reviewPrev");
const reviewNext = document.getElementById("reviewNext");

let reviewIndex = 0;

function updateReviewCarousel() {
  reviewTrack.style.transform = `translateX(-${reviewIndex * 100}%)`;
}

reviewNext.addEventListener("click", () => {
  reviewIndex = (reviewIndex + 1) % reviewSlides.length;
  updateReviewCarousel();
});

reviewPrev.addEventListener("click", () => {
  reviewIndex = (reviewIndex - 1 + reviewSlides.length) % reviewSlides.length;
  updateReviewCarousel();
});