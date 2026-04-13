
// Preloader Hide Logic
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.classList.add("fade-out");
    document.body.classList.remove("preloader-active");

    setTimeout(() => {
      preloader.style.display = "none";
      ena(); // 🔥 GSAP popup trigger
    }, 2000);

    setTimeout(() => {
      preloader.style.display = "none";
    }, 600);
  }
});
// Preloader logic ends

//Magic Cursor
const cursor = document.querySelector(".cursor2");
if (cursor) {
  window.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  gsap.set(".cursor2", {
    xPercent: -50,
    yPercent: -50,
  });

  window.addEventListener("mousemove", (e) => {
    gsap.to(".cursor2", {
      x: e.clientX,
      y: e.clientY,
      duration: 1,
    });
  });

  let x = 0;
  let y = 0;

  window.addEventListener("mousemove", (e) => {
    x = e.clientX;
    y = e.clientY;
  });

  gsap.ticker.add(() => {
    gsap.to(cursor, {
      x: x,
      y: y,
      duration: 0.5,
    });
  });
}
// Magic Cursor ends

// Text reveal effect GSAP
gsap.registerPlugin(SplitText, ScrollTrigger);

document.fonts.ready.then(() => {
  gsap.set(".container", { opacity: 1 });

  gsap.utils.toArray(".animate-me").forEach((el) => {
    let split = SplitText.create(el, {
      type: "words",
      aria: "hidden",
    });

    gsap.from(split.words, {
      opacity: 0,
      duration: 1.5,
      ease: "sine.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  });
});
// Text reveal effect ends

// Sidebar
const sidebar = document.getElementById("mob-navbar");
const menuBtn = document.getElementById("menuBtn");
const exit = document.getElementById("overlay");

function openSidebar() {
  if (sidebar) sidebar.style.right = "0px";
  if (exit) exit.classList.add("show");
}
function closeSidebar() {
  if (sidebar) sidebar.style.right = "-1000px";
  if (exit) exit.classList.remove("show");
}

// Popup
var p = document.getElementById("popup-parent-f");
var wapp = document.querySelector(".whatsapp");
var mapp = document.querySelector(".mail");
var capp = document.querySelector(".phone");

function ena() {
  if (!p) return;
  p.style.display = "flex";
  p.style.zIndex = "999";

  const tl = gsap.timeline();
  tl.to("#popup-parent-f", {
    opacity: 1,
    duration: 0.4,
    ease: "power2.out",
  }).to(
    ".popup-box",
    {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: "back.out(1.7)",
    },
    "-=0.2"
  );
}

function finish() {
  if (!p) return;

  const tl = gsap.timeline({
    onComplete: () => {
      p.style.display = "none";
      if (wapp) wapp.style.zIndex = "1";
      if (mapp) mapp.style.zIndex = "1";
      if (capp) capp.style.zIndex = "1";
    },
  });

  tl.to(".popup-box", {
    scale: 0.7,
    opacity: 0,
    duration: 0.3,
    ease: "power2.in",
  }).to(
    "#popup-parent-f",
    {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    },
    "-=0.2"
  );
}

if (p) {
  p.addEventListener("click", (e) => {
    if (e.target === p) finish();
  });
}

function closeModal() {
  const popup = document.querySelector(".popup");
  const floatingIcons = document.querySelector(".floating-icons");
  if (popup) popup.style.display = "none";
  if (floatingIcons) floatingIcons.classList.remove("hide-icons");
}

// ✅ SERVICE SECTION AUTO SLIDER (index.html only)
const container = document.querySelector(".container");
if (container) {
  let cards = document.querySelectorAll(".cont1");

  if (cards.length > 0) {
    const gap = 20;
    let cardWidth = cards[0].offsetWidth + gap;

    const serviceFirstClone = cards[0].cloneNode(true);
    const serviceLastClone = cards[cards.length - 1].cloneNode(true);

    container.appendChild(serviceFirstClone);
    container.insertBefore(serviceLastClone, container.firstChild);

    cards = document.querySelectorAll(".cont1");
    container.scrollLeft = cardWidth;

    function moveNext() {
      container.scrollBy({ left: cardWidth, behavior: "smooth" });
    }

    let serviceautoSlide = setInterval(moveNext, 2000);

    container.addEventListener("scroll", () => {
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScrollLeft - 1) {
        container.style.scrollBehavior = "auto";
        container.scrollLeft = cardWidth;
        container.style.scrollBehavior = "smooth";
      }
      if (container.scrollLeft <= 0) {
        container.style.scrollBehavior = "auto";
        container.scrollLeft = container.scrollWidth - 2 * cardWidth;
        container.style.scrollBehavior = "smooth";
      }
    });

    container.addEventListener("mouseenter", () => clearInterval(serviceautoSlide));
    container.addEventListener("mouseleave", () => {
      serviceautoSlide = setInterval(moveNext, 3000);
    });

    window.addEventListener("resize", () => {
      cardWidth = cards[0].offsetWidth + gap;
    });

    let isDragging = false;
    let dragStartX = 0;
    let scrollStartX = 0;

    container.addEventListener("mousedown", (e) => {
      isDragging = true;
      dragStartX = e.clientX;
      scrollStartX = container.scrollLeft;
      container.style.scrollBehavior = "auto";
      container.style.cursor = "grabbing";
      clearInterval(serviceautoSlide);
      e.preventDefault();
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const delta = e.clientX - dragStartX;
      container.scrollLeft = scrollStartX - delta;
    });

    window.addEventListener("mouseup", () => {
      if (!isDragging) return;
      isDragging = false;
      container.style.cursor = "grab";
      container.style.scrollBehavior = "smooth";
      const nearest = Math.round(container.scrollLeft / cardWidth) * cardWidth;
      container.scrollLeft = nearest;
      serviceautoSlide = setInterval(moveNext, 3000);
    });

    window.addEventListener("mouseleave", () => {
      if (!isDragging) return;
      isDragging = false;
      container.style.cursor = "grab";
      container.style.scrollBehavior = "smooth";
      serviceautoSlide = setInterval(moveNext, 3000);
    });

    container.addEventListener("dragstart", (e) => e.preventDefault());
  }
}
// Service section slider ends

// ✅ TESTIMONIAL SLIDER (index.html only)
const track = document.getElementById("track");
if (track) {
  (function () {
    const AUTOPLAY_MS = 3500;
    const TRANSITION_MS = 550;
    const DRAG_THRESHOLD = 60;
    const WHEEL_THRESHOLD = 40;

    const trackWrap = document.getElementById("trackWrap");
    const dotsWrap = document.getElementById("dots");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const statusDot = document.getElementById("statusDot");
    const statusTxt = document.getElementById("statusText");

    const originals = Array.from(track.querySelectorAll(".slide"));
    const N = originals.length;
    if (N === 0) return;

    function getSPV() {
      const w = window.innerWidth;
      if (w <= 640) return 1;
      if (w <= 1023) return 2;
      if (w < 2560) return 3;
      return 4;
    }

    let clonesBefore = [];
    let clonesAfter = [];

    function buildClones() {
      [...clonesBefore, ...clonesAfter].forEach((el) => el.remove());
      clonesBefore = [];
      clonesAfter = [];
      const spv = getSPV();
      for (let i = 0; i < spv; i++) {
        const c = originals[i % N].cloneNode(true);
        c.setAttribute("aria-hidden", "true");
        track.appendChild(c);
        clonesAfter.push(c);
      }
      for (let i = spv - 1; i >= 0; i--) {
        const c = originals[(N - spv + i) % N].cloneNode(true);
        c.setAttribute("aria-hidden", "true");
        track.insertBefore(c, track.firstChild);
        clonesBefore.unshift(c);
      }
    }

    const allSlides = () => Array.from(track.querySelectorAll(".slide"));

    let spv = getSPV();
    let realIndex = spv;
    let current = 0;
    let isPaused = false;
    let isTransitioning = false;
    let autoTimer = null;

    function buildDots() {
      dotsWrap.innerHTML = "";
      originals.forEach((_, i) => {
        const d = document.createElement("button");
        d.className = "dot" + (i === 0 ? " active" : "");
        d.setAttribute("aria-label", `Slide ${i + 1}`);
        d.addEventListener("click", () => { goTo(i); resetAuto(); });
        dotsWrap.appendChild(d);
      });
    }

    function updateDots() {
      dotsWrap.querySelectorAll(".dot").forEach((d, i) =>
        d.classList.toggle("active", i === current)
      );
    }

    function updateActive() {
      allSlides().forEach((s, i) =>
        s.classList.toggle("is-active", i >= realIndex && i < realIndex + spv)
      );
    }

    function slideStep() {
      const slides = allSlides();
      const gap = parseFloat(getComputedStyle(track).gap) || 24;
      return slides[0].offsetWidth + gap;
    }

    function updateSlideWidths() {
      const gap = parseFloat(getComputedStyle(track).gap) || 24;
      const w = (trackWrap.offsetWidth - (spv - 1) * gap) / spv;
      allSlides().forEach((s) => {
        s.style.flex = `0 0 ${w}px`;
        s.style.width = `${w}px`;
      });
    }

    function applyTransform(instant) {
      updateSlideWidths();
      const x = -(realIndex * slideStep());
      if (instant) {
        track.classList.add("no-transition");
        track.style.transform = `translateX(${x}px)`;
        track.offsetHeight;
        track.classList.remove("no-transition");
      } else {
        track.style.transform = `translateX(${x}px)`;
      }
    }

    function slide(dir) {
      if (isTransitioning) return;
      isTransitioning = true;
      realIndex += dir;
      current = (((realIndex - spv) % N) + N) % N;
      applyTransform(false);
      updateDots();
      setTimeout(() => {
        if (realIndex >= spv + N) { realIndex = spv; applyTransform(true); }
        if (realIndex < spv) { realIndex = spv + N - 1; applyTransform(true); }
        updateActive();
        isTransitioning = false;
      }, TRANSITION_MS);
    }

    function goTo(idx) {
      if (isTransitioning) return;
      current = idx;
      realIndex = spv + idx;
      applyTransform(false);
      updateDots();
      updateActive();
    }

    prevBtn.addEventListener("click", () => { slide(-1); resetAuto(); });
    nextBtn.addEventListener("click", () => { slide(+1); resetAuto(); });

    function startAuto() {
      stopAuto();
      autoTimer = setInterval(() => { if (!isPaused) slide(+1); }, AUTOPLAY_MS);
    }
    function stopAuto() { clearInterval(autoTimer); autoTimer = null; }
    function resetAuto() { startAuto(); }

    trackWrap.addEventListener("mouseenter", () => {
      isPaused = true;
      statusDot.classList.add("paused");
      statusTxt.textContent = "Paused";
    });
    trackWrap.addEventListener("mouseleave", () => {
      isPaused = false;
      statusDot.classList.remove("paused");
      statusTxt.textContent = "Autoplaying";
    });

    let dragX = 0, dragDelta = 0, dragging = false;

    function onDragStart(x) { dragX = x; dragging = true; isPaused = true; track.classList.add("no-transition"); }
    function onDragMove(x) {
      if (!dragging) return;
      dragDelta = x - dragX;
      const base = -(realIndex * slideStep());
      track.style.transform = `translateX(${base + dragDelta}px)`;
    }
    function onDragEnd() {
      if (!dragging) return;
      dragging = false;
      isPaused = false;
      track.classList.remove("no-transition");
      if (dragDelta < -DRAG_THRESHOLD) slide(+1);
      else if (dragDelta > DRAG_THRESHOLD) slide(-1);
      else applyTransform(false);
      dragDelta = 0;
    }

    trackWrap.addEventListener("mousedown", (e) => onDragStart(e.clientX));
    window.addEventListener("mousemove", (e) => { if (dragging) onDragMove(e.clientX); });
    window.addEventListener("mouseup", () => onDragEnd());
    trackWrap.addEventListener("touchstart", (e) => onDragStart(e.touches[0].clientX), { passive: true });
    trackWrap.addEventListener("touchmove", (e) => onDragMove(e.touches[0].clientX), { passive: true });
    trackWrap.addEventListener("touchend", () => onDragEnd());

    let wheelAccum = 0, wheelTimer = null;
    trackWrap.addEventListener("wheel", (e) => {
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      if (!isHorizontal) return;
      e.preventDefault();
      wheelAccum += e.deltaX;
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => { wheelAccum = 0; }, 200);
      if (wheelAccum > WHEEL_THRESHOLD) { wheelAccum = 0; slide(+1); resetAuto(); }
      else if (wheelAccum < -WHEEL_THRESHOLD) { wheelAccum = 0; slide(-1); resetAuto(); }
    }, { passive: false });

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") { slide(-1); resetAuto(); }
      if (e.key === "ArrowRight") { slide(+1); resetAuto(); }
    });

    let resizeTimer = null;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const newSpv = getSPV();
        if (newSpv !== spv) {
          spv = newSpv;
          document.documentElement.style.setProperty("--spv", spv);
          buildClones();
          realIndex = spv + current;
        }
        applyTransform(true);
        updateActive();
      }, 100);
    });

    buildClones();
    buildDots();
    document.documentElement.style.setProperty("--spv", spv);
    applyTransform(true);
    updateActive();
    updateDots();
    startAuto();
  })();
}
// Testimonial slider ends

// ✅ Form submit (all pages)
const SHEET_URL = "https://script.google.com/macros/s/AKfycbzxNke4z7H_eUouHhvy3tnktMbVenJv10UXOKsxND5J3fdFImyLUlZrzDZTM0xXy0uC9Q/exec";

const swalConfig = {
  success: {
    title: "Success!",
    text: "Form submitted successfully!",
    icon: "success",
    confirmButtonText: "OK",
    customClass: {
      popup: "my-popup",
      title: "my-title",
      confirmButton: "my-btn",
    },
  },
  error: {
    icon: "error",
    title: "Oops...",
    text: "Something went wrong!",
    customClass: {
      popup: "my-popup",
      title: "my-title",
      confirmButton: "my-btn",
    },
  },
};

function submitToSheet(form, source) {
  const formData = new FormData(form);

  const data = {
    name: formData.get("name"),
    number: formData.get("number"),
    message: formData.get("message"),
    date: formData.get("date"),
    source: source,
  };

  fetch(SHEET_URL, {
    method: "POST",
    body: JSON.stringify(data),
    mode: "no-cors",
  })
    .then(() => {
      Swal.fire(swalConfig.success).then(() => {
        form.reset();
      });
    })
    .catch(() => {
      Swal.fire(swalConfig.error);
    });
}

// ── myForm (popup form — used on contact.html & other pages) ──
const myForm = document.getElementById("myForm");
if (myForm) {
  myForm.addEventListener("submit", function (e) {
    e.preventDefault();
    submitToSheet(this, "Popup Form");
  });
}

// ── contactForm (contact section form — used on contact.html) ──
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    submitToSheet(this, "Contact Form");
  });
}

document.addEventListener("DOMContentLoaded", function() {
  const today = new Date().toISOString().split("T")[0];
  document.querySelectorAll('input[type="date"]').forEach(function(input) {
    input.setAttribute("min", today);
  });
});

// ✅ Running number counter (index.html only)
const counters = document.querySelectorAll(".counter");
if (counters.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = +counter.dataset.target;
          let count = 0;

          const update = () => {
            const increment = target / 100;
            if (count < target) {
              count += increment;
              counter.innerText = Math.ceil(count) + "+";
              requestAnimationFrame(update);
            } else {
              counter.innerText = Math.ceil(count) + "+";
            }
          };

          update();
          observer.unobserve(counter);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((counter) => observer.observe(counter));
}
// Counter ends