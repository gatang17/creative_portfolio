// ================= GOOGLE ANALYTICS =================
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-X2R58E5647');


// ================= MENU & HEADER SETUP =================
const menuState = { open: false, updateUI: null };

document.addEventListener("DOMContentLoaded", () => {
  // Load header HTML dynamically
  fetch("./js/data/header.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("header").innerHTML = html;

      // --- VARIABLES ---
      const divMenu = document.getElementById('div_menutop');
      const divFoot = document.getElementById('div_menubotom');
      const footerBar = document.getElementById('foot_bar');
      const btnHamburger = document.getElementById('menu_hamburguer');
      const blurElements = document.getElementsByClassName('borroso');
      const dropdownMenu = document.getElementById('navbarMenu');
      const headerMenu = document.getElementById("header");

      const menuOriginalHTML = divMenu.innerHTML;
      const footerOriginalHTML = divFoot.innerHTML;
      const TOP_LIMIT = 50;

      // --- UTILITY FUNCTIONS ---
      const applyBlur = activate => {
        [...blurElements].forEach(el => 
          el.style.filter = activate ? "blur(5px) brightness(0.3)" : "none"
        );
      };

      const updateDropdownVisibility = () => {
        dropdownMenu.style.visibility = menuState.open ? "visible" : "hidden";
      };

      // Responsive UI adjustment
      menuState.updateUI = () => {
        const width = window.innerWidth;
        if (width < 765) {
          divMenu.innerHTML = '';
          divFoot.innerHTML = footerOriginalHTML;
          btnHamburger.style.visibility = "visible";
          updateDropdownVisibility();
        } else {
          divMenu.innerHTML = menuOriginalHTML;
          divFoot.innerHTML = '';
          footerBar.style.border = "none";
          btnHamburger.style.visibility = "hidden";
          dropdownMenu.style.visibility = "hidden";
          menuState.open = false;
          applyBlur(false);
        }
        updateColors(); // Apply correct colors after DOM changes
      };

      // Close menu when any link is clicked
      document.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
          document.body.style.overflow = '';
          menuState.open = false;
          applyBlur(false);
          updateDropdownVisibility();
        });
      });

      // Sticky header on scroll
      headerMenu.style.transition = "top 0.3s ease";
      window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        headerMenu.style.top = scrollY > TOP_LIMIT ? TOP_LIMIT + "px" : scrollY + "px";
      });

      // Hamburger toggle
      btnHamburger.addEventListener("click", () => {
        menuState.open = !menuState.open;
        document.body.style.overflow = menuState.open ? 'hidden' : '';
        applyBlur(menuState.open);
        updateDropdownVisibility();
        dropdownMenu.classList.toggle('menu-overlay', menuState.open);
      });

      // Window resize and load events
      window.addEventListener('resize', menuState.updateUI);
      menuState.updateUI(); // UNA sola vez, cuando el header ya existe
      
   // window.addEventListener('load', menuState.updateUI);
    })
    .catch(err => console.error("Header load error:", err));
});


// ================= SMOOTH SCROLL =================
function scrollToSection(targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;
  const offset = targetId === "section1" ? 0 : window.innerHeight * 0.10;
  window.scrollTo({ top: target.offsetTop - offset, behavior: "smooth" });
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    scrollToSection(link.getAttribute('href').substring(1));
    setTimeout(updateColors, 50);
  });
});


// ================= INTRO ANIMATION =================

window.addEventListener('load', () => {
 

  //const intro = document.getElementById("intro");
  //const logo = document.getElementById('imgLogoIntro');
  const headerMenu = document.getElementById("header");
  const pHome = document.getElementById("pHome");
  //const GIF_DURATION = 15000;

  //logo.src = `images/bigLogo.gif?${new Date().getTime()}`;
  headerMenu.style.display = "none";
  pHome.style.display = "none";
  document.getElementById("section1").style.display = "none";
 
 // let introFinished = false;

  //const finishIntro = () => {
   // if (introFinished) return;
  //  introFinished = true;
   // clearTimeout(introTimeout);

 //   intro.style.display = "none";
    document.getElementById("section1").style.display = "block";
 //   if (typeof menuState.updateUI === "function") menuState.updateUI();

    // Typewriter for section1 text
    typeWriterWords(
      document.getElementById("section1Text"),
      document.getElementById("section1Text").textContent,
      350,
      () => {
        // Show header and pHome
        headerMenu.style.display = "block";
        pHome.style.display = "block";

        headerMenu.classList.add("show");
        pHome.classList.add("show");
       /* requestAnimationFrame(() => {
          headerMenu.classList.add("show");
          pHome.classList.add("show");
        });*/

        // Show section2 & section3
        ["section2","section3"].forEach(id => {
          const sec = document.getElementById(id);
          sec.style.display = "block";
         
          setTimeout(() => sec.classList.add("show"), 200);
        });

        hoverWords("section1Text", "Graphic web design");
        pHomeEffect(); // start word highlight
      }
    );
 // };

  //const introTimeout = setTimeout(finishIntro, GIF_DURATION);

  // Skip intro
  /*const tooltip = document.getElementById("skipTooltip");
  logo.addEventListener("mouseenter", () => { tooltip.textContent = "Skip Animation"; tooltip.style.visibility = "visible"; tooltip.style.opacity = 1; });
  logo.addEventListener("mouseleave", () => { tooltip.style.opacity = 0; setTimeout(() => tooltip.style.visibility = "hidden", 200); });
  logo.addEventListener("mousemove", e => { tooltip.style.left = e.clientX + 15 + "px"; tooltip.style.top = e.clientY + 15 + "px"; });
  logo.addEventListener("click", () => { tooltip.style.visibility = "hidden"; tooltip.style.opacity = 0; finishIntro(); });*/
});



// ================= TYPEWRITER WORDS =================
function typeWriterWords(el, txt, speed = 250, onComplete) {
  el.style.opacity = "1";
  el.textContent = "";
  const words = txt.split(" ");
  let i = 0;
  (function write() {
    if (i < words.length) {
      const span = document.createElement("span");
      span.textContent = words[i] + " ";
      span.style.opacity = "0";
      span.style.transition = "opacity 0.8s ease";
      el.appendChild(span);
      void span.offsetWidth;
      span.style.opacity = "1";
      i++;
      setTimeout(write, speed);
    } else if (typeof onComplete === "function") onComplete();
  })();
}


// ================= PHOME WORD HIGHLIGHT EFFECT =================
function pHomeEffect() {
  const pT = document.getElementById("pHome");
  if(!pT) return;

  const words = pT.textContent.split(" ");
  pT.textContent = "";
  const spans = words.map(word => {
    const span = document.createElement("span");
    span.textContent = word;
    span.classList.add("word");
    span.dataset.baseColor = ""; // will be set dynamically
    pT.appendChild(span);
    pT.appendChild(document.createTextNode(" "));
    return span;
  });
  let index = 0;
  setInterval(() => {
    const sectionColor = getCurrentSectionColor(); // color de sección actual
    spans.forEach(span => { 
      span.classList.remove("active"); 
      span.style.color = "#ffffff"; // default color for inactive words
      span.dataset.baseColor = "#ffffff";
    });
    spans[index].classList.add("active");
    spans[index].style.color = sectionColor; // highlight color = color de sección
    index = (index + 1) % spans.length;
  }, 500);
  
}


// ================= DYNAMIC COLOR CHANGE =================
function getCurrentSectionColor() {
  const sections = ["section1","section2","section3"].map(id => document.getElementById(id));
  let visibleSection = sections.find(sec => {
    if(!sec) return false;
    const rect = sec.getBoundingClientRect();
    return rect.top < window.innerHeight*0.5 && rect.bottom > window.innerHeight*0.5;
  });
  if(!visibleSection) return "#252525";
  return visibleSection.id === "section1" ? "#252525" : "#E3E5D2";
}

function changeElementColors(bgColor) {
  const isDarkColor = color => {
    const rgb = color.match(/\d+/g).map(Number);
    const luminance = 0.299*rgb[0]+0.587*rgb[1]+0.114*rgb[2];
    return luminance < 140;
  };
  const textColor = isDarkColor(bgColor) ? "#E3E5D2" : "#252525";

  // Only apply to base elements, not spans inside hoverWords/pHome
  document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,a,i,button").forEach(el => {
    if(!el.closest("#section1Text") && !el.closest("#pHome")) el.style.color = textColor;
  });

  const footer = document.getElementById("foot_bar");
  if(footer) footer.style.borderTop = `2px solid ${textColor}`;
}

function updateColors() {
  const color = getCurrentSectionColor();
  changeElementColors(color);
}

window.addEventListener('scroll', updateColors);
window.addEventListener('resize', () => { menuState.updateUI(); });
window.addEventListener('load', updateColors);


// ================= HOVER WORDS EFFECT =================
function hoverWords(elementId, hoverText) {
  const h1 = document.getElementById(elementId);
  if (!h1) return;

  const baseWords = h1.textContent.trim().split(" ");
  const hoverWordsArr = hoverText.trim().split(" ");
  if (baseWords.length !== hoverWordsArr.length) return console.warn("Base text and hover text must have same number of words");

  h1.textContent = "";
  baseWords.forEach((baseWord,i)=>{
    const wrapper = document.createElement("span");
    wrapper.style.position="relative"; 
    wrapper.style.cursor="default"; 
    wrapper.style.display="block"; 
    wrapper.style.marginBottom="0.2em";

    const baseSpan = document.createElement("span"); 
    baseSpan.textContent=baseWord;

    const overlay = document.createElement("span");
    overlay.textContent=hoverWordsArr[i];
    overlay.style.position="absolute"; overlay.style.left="0"; overlay.style.top="0"; overlay.style.whiteSpace="nowrap";
    overlay.style.opacity="0"; overlay.style.pointerEvents="none";
    overlay.style.transition="opacity 0.2s ease, transform 0.2s ease"; 
    overlay.style.color="#ffffff"; overlay.style.fontWeight="600"; overlay.style.filter="blur(2px)";

    wrapper.addEventListener("mouseenter",()=>{overlay.style.opacity="0.7"; overlay.style.transform="translateY(50px) translateX(150px) scale(1.5)";});
    wrapper.addEventListener("mouseleave",()=>{overlay.style.opacity="0"; overlay.style.transform="none";});

    wrapper.appendChild(baseSpan); wrapper.appendChild(overlay); h1.appendChild(wrapper);
  });
}


// ================= TYPEWRITER FOR OTHER TITLES =================
function typeWriter(el, speed = 100, step = 1, onComplete) {
  const text = el.textContent;
  el.textContent = "";
  let i = 0;

  function write() {
    if (i < text.length) {
      const char = text[i];
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.display = "inline-block";
      span.style.transition = "transform 0.3s ease";
      span.style.transform = "scale(0)";
      el.appendChild(span);
      void span.offsetWidth;
      setTimeout(() => { span.style.transform = "scale(1)"; }, 50);

      i += step;
      setTimeout(write, speed);
    } else if(typeof onComplete==="function") onComplete();
  }

  write();
}

// IntersectionObserver for all elements with class "title-animate"
// will animate every time they enter viewport
const titles = document.querySelectorAll(".title-animate");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      typeWriter(entry.target, 200, 1);
    }
  });
},{threshold: 0.4});
titles.forEach(title => observer.observe(title));



// ================= GRID GALLERY =================
fetch('./js/data/projects.json')
 
.then(res => res.json())
.then(data => {
  const grid = document.getElementById('projectsGrid');
  data.projects.forEach(proj => {
    const card = document.createElement('div');
    card.classList.add('project-card');

    // Usar hero si existe, si no un placeholder
    const heroImg = proj.hero.trim() !== "" ? proj.hero.trim() : 'images/placeholder.png';

    card.innerHTML = `
    <img src="${heroImg}" alt="${proj.title}">
    
    <div class="tooltip">

      <span class="tooltip-text">
        ${proj.title}<br>${proj.description.substring(0, 100)}...
      </span>
    </div>
  
    <!-- icono móvil centrado y clicable -->
    <span class="mobile-icon" style="display:none;">
      <a href="${proj.link}" ><i class="fa-solid fa-square-up-right"></i></a>
    </span>
  `;
  

  
    // Click en móvil para mostrar tooltip
    const tooltipIcon = card.querySelector('.tooltip-icon');
    const tooltipText = card.querySelector('.tooltip-text');
    tooltipIcon?.addEventListener('click', e => {
      e.stopPropagation(); // evita que dispare el click en la tarjeta
      tooltipText.style.display = tooltipText.style.display === 'block' ? 'none' : 'block';
    });

    // Click en la tarjeta → página de detalles
    card.addEventListener('click', () => {
      window.location.href = proj.link;
    });
    
    grid.appendChild(card);
  });
})
.catch(err => console.error(err));

// ================= DISTORTION =================

document.addEventListener("DOMContentLoaded", () => {
  const distortion = document.getElementById("distortion");
  const grid = document.getElementById("projectsGrid");

  if (!distortion || !grid) return;

  // mover solo cuando esté activo
  grid.addEventListener("mousemove", (e) => {
    distortion.style.left = e.clientX + "px";
    distortion.style.top  = e.clientY + "px";
  });

  // mostrar al entrar al grid
  grid.addEventListener("mouseenter", () => {
    distortion.style.opacity = "1";
  });

  // ocultar al salir del grid
  grid.addEventListener("mouseleave", () => {
    distortion.style.opacity = "0";
  });
});

//DONT SHOW THE BUBBLES ON 2
const balls = document.querySelectorAll('.bouncing-ball');
const section1 = document.getElementById('section1');

const observer2 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      balls.forEach(b => b.style.display = 'block');
    } else {
      balls.forEach(b => b.style.display = 'none');
    }
  });
}, { threshold: 0.5 });

observer2.observe(section1);
