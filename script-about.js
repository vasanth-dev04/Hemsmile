//Magic Cursor

const cursor = document.querySelector(".cursor2");
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
const links = document.querySelectorAll(
  "a, button, .icon1, .icon2, .icon3, .t-1, .div1, .brand-grid img, .test-img-main img",
);
links.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("active");
    cursor.style.transform = "scale(2)";
  });

  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("active");
  });
});

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
        trigger: el, // 🔥 each heading triggers itself
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  });
});


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


//Script store a data in google sheet
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

// pop up

var p = document.getElementById("popup-parent-f");
var wapp = document.querySelector(".whatsapp");
var mapp = document.querySelector(".mail");
var capp = document.querySelector(".phone");

function ena() {
  p.style.display = "flex";
  // GSAP Timeline (smooth sequence)
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
    "-=0.2",
  ); // overlap for smooth feel
}

function finish() {
  const tl = gsap.timeline({
    onComplete: () => {
      p.style.display = "none";

      // Restore icons
      wapp.style.zIndex = "1";
      mapp.style.zIndex = "1";
      capp.style.zIndex = "1";
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
    "-=0.2",
  );
}
p.addEventListener("click", (e) => {
  if (e.target === p) finish();
});

function openModal() {}

function closeModal() {
  document.querySelector(".popup").style.display = "none";
  document.querySelector(".floating-icons").classList.remove("hide-icons");
}
// Transformation carousel starts
/* ═══════════════════════════════════════════════════════════════════
   works-carousel.js
   Reusable carousel engine — powers any number of carousels.
   Drop this file into your project and call initCarousel() for each.

   FEATURES:
   ✔ Infinite loop (no jump)
   ✔ Autoplay
   ✔ Pause on hover
   ✔ Prev / Next buttons
   ✔ Dot indicators (clickable)
   ✔ Touch swipe
   ✔ Mouse drag
   ✔ Two-finger trackpad scroll
   ✔ Keyboard arrow keys (focused carousel)
   ✔ Responsive slides-per-view (1 → 2 → 3 → 4)
   ✔ Resize-safe (rebuilds clones & recalculates widths)

   USAGE:
   initCarousel({
     trackId    : 'carouselTrack',   // id of the .carousel-track element
     viewportId : 'carouselViewport',// id of the .carousel-viewport element
     prevId     : 'prevBtn',         // id of the prev button
     nextId     : 'nextBtn',         // id of the next button
     dotsId     : 'carouselDots',    // id of the dots container
     slideClass : 'carousel-slide',  // class used on each slide (default: 'carousel-slide')
     autoplayMs : 3500,              // autoplay interval in ms  (default: 3500)
   });
═══════════════════════════════════════════════════════════════════ */

function initCarousel(config) {
  /* ── Resolve config ── */
  const TRACK_ID = config.trackId;
  const VIEWPORT_ID = config.viewportId;
  const PREV_ID = config.prevId;
  const NEXT_ID = config.nextId;
  const DOTS_ID = config.dotsId;
  const SLIDE_CLASS = config.slideClass || "carousel-slide";
  const AUTOPLAY_MS = config.autoplayMs ?? 3500;
  const TRANSITION_MS = 550;
  const DRAG_THRESHOLD = 60;
  const WHEEL_THRESHOLD = 40;

  /* ── DOM ── */
  const track = document.getElementById(TRACK_ID);
  const viewport = document.getElementById(VIEWPORT_ID);
  const prevBtn = document.getElementById(PREV_ID);
  const nextBtn = document.getElementById(NEXT_ID);
  const dotsWrap = document.getElementById(DOTS_ID);

  if (!track || !viewport) {
    console.warn(
      "[initCarousel] track or viewport not found:",
      TRACK_ID,
      VIEWPORT_ID,
    );
    return;
  }

  /* ── Original slides from HTML ── */
  const originals = Array.from(track.querySelectorAll("." + SLIDE_CLASS));
  const N = originals.length;
  if (N === 0) return;

  /* ── Slides per view by breakpoint ── */
  function getSPV() {
    const w = window.innerWidth;
    if (w <= 640) return 1;
    if (w <= 1023) return 2;
    if (w < 2560) return 3;
    return 4;
  }

  /* ── Clone management ── */
  let clonesBefore = [];
  let clonesAfter = [];

  function buildClones() {
    [...clonesBefore, ...clonesAfter].forEach((el) => el.remove());
    clonesBefore = [];
    clonesAfter = [];

    const s = getSPV();

    /* Append clones of first s originals at the end */
    for (let i = 0; i < s; i++) {
      const c = originals[i % N].cloneNode(true);
      c.setAttribute("aria-hidden", "true");
      track.appendChild(c);
      clonesAfter.push(c);
    }

    /* Prepend clones of last s originals at the start */
    for (let i = s - 1; i >= 0; i--) {
      const c = originals[(N - s + i + N) % N].cloneNode(true);
      c.setAttribute("aria-hidden", "true");
      track.insertBefore(c, track.firstChild);
      clonesBefore.unshift(c);
    }
  }

  const allSlides = () => Array.from(track.querySelectorAll("." + SLIDE_CLASS));

  /* ── State ── */
  let spv = getSPV();
  let realIndex = spv; // first real slide is after spv clones
  let current = 0;
  let isPaused = false;
  let isTransitioning = false;
  let autoTimer = null;

  /* ── Dots ── */
  function buildDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = "";
    originals.forEach((_, i) => {
      const d = document.createElement("button");
      d.className = "carousel-dot" + (i === 0 ? " active" : "");
      d.setAttribute("aria-label", `Go to slide ${i + 1}`);
      d.addEventListener("click", () => {
        goTo(i);
        resetAuto();
      });
      dotsWrap.appendChild(d);
    });
  }

  function updateDots() {
    if (!dotsWrap) return;
    dotsWrap
      .querySelectorAll(".carousel-dot")
      .forEach((d, i) => d.classList.toggle("active", i === current));
  }

  function updateActive() {
    allSlides().forEach((s, i) =>
      s.classList.toggle("is-active", i >= realIndex && i < realIndex + spv),
    );
  }

  /* ── Geometry ── */
  function getGap() {
    return parseFloat(getComputedStyle(track).gap) || 0;
  }

  function slideStep() {
    const slides = allSlides();
    return slides[0].offsetWidth + getGap();
  }

  function updateSlideWidths() {
    const gap = getGap();
    const w = (viewport.offsetWidth - (spv - 1) * gap) / spv;
    allSlides().forEach((s) => {
      s.style.flex = `0 0 ${w}px`;
      s.style.width = `${w}px`;
    });
  }

  /* ── Transform ── */
  function applyTransform(instant) {
    updateSlideWidths();
    const x = -(realIndex * slideStep());
    if (instant) {
      track.classList.add("no-tr");
      track.style.transform = `translateX(${x}px)`;
      track.offsetHeight; /* force reflow */
      track.classList.remove("no-tr");
    } else {
      track.style.transform = `translateX(${x}px)`;
    }
  }

  /* ── Slide (advance by 1) ── */
  function slide(dir) {
    if (isTransitioning) return;
    isTransitioning = true;

    realIndex += dir;
    current = (((realIndex - spv) % N) + N) % N;

    applyTransform(false);
    updateDots();

    setTimeout(() => {
      if (realIndex >= spv + N) {
        realIndex = spv;
        applyTransform(true);
      }
      if (realIndex < spv) {
        realIndex = spv + N - 1;
        applyTransform(true);
      }
      updateActive();
      isTransitioning = false;
    }, TRANSITION_MS);
  }

  /* ── Go to logical index ── */
  function goTo(idx) {
    if (isTransitioning) return;
    current = idx;
    realIndex = spv + idx;
    applyTransform(false);
    updateDots();
    updateActive();
  }

  /* ── Buttons ── */
  if (prevBtn)
    prevBtn.addEventListener("click", () => {
      slide(-1);
      resetAuto();
    });
  if (nextBtn)
    nextBtn.addEventListener("click", () => {
      slide(+1);
      resetAuto();
    });

  /* ── Autoplay ── */
  function startAuto() {
    stopAuto();
    if (AUTOPLAY_MS > 0)
      autoTimer = setInterval(() => {
        if (!isPaused) slide(+1);
      }, AUTOPLAY_MS);
  }
  function stopAuto() {
    clearInterval(autoTimer);
    autoTimer = null;
  }
  function resetAuto() {
    startAuto();
  }

  /* ── Pause on hover ── */
  viewport.addEventListener("mouseenter", () => {
    isPaused = true;
  });
  viewport.addEventListener("mouseleave", () => {
    isPaused = false;
  });

  /* ── Touch + Mouse drag ── */
  let dragX = 0,
    dragDelta = 0,
    dragging = false;

  function onDragStart(x) {
    dragX = x;
    dragging = true;
    isPaused = true;
    track.classList.add("no-tr");
  }
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
    track.classList.remove("no-tr");
    if (dragDelta < -DRAG_THRESHOLD) slide(+1);
    else if (dragDelta > DRAG_THRESHOLD) slide(-1);
    else applyTransform(false);
    dragDelta = 0;
  }

  viewport.addEventListener("mousedown", (e) => onDragStart(e.clientX));
  window.addEventListener("mousemove", (e) => {
    if (dragging) onDragMove(e.clientX);
  });
  window.addEventListener("mouseup", () => onDragEnd());

  viewport.addEventListener(
    "touchstart",
    (e) => onDragStart(e.touches[0].clientX),
    { passive: true },
  );
  viewport.addEventListener(
    "touchmove",
    (e) => onDragMove(e.touches[0].clientX),
    { passive: true },
  );
  viewport.addEventListener("touchend", () => onDragEnd());

  /* ── Two-finger trackpad / wheel scroll ── */
  let wheelAccum = 0,
    wheelTimer = null;

  viewport.addEventListener(
    "wheel",
    (e) => {
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      if (!isHorizontal) return;
      e.preventDefault();
      wheelAccum += e.deltaX;
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => {
        wheelAccum = 0;
      }, 200);
      if (wheelAccum > WHEEL_THRESHOLD) {
        wheelAccum = 0;
        slide(+1);
        resetAuto();
      } else if (wheelAccum < -WHEEL_THRESHOLD) {
        wheelAccum = 0;
        slide(-1);
        resetAuto();
      }
    },
    { passive: false },
  );

  /* ── Resize ── */
  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const newSpv = getSPV();
      if (newSpv !== spv) {
        spv = newSpv;
        buildClones();
        realIndex = spv + current;
      }
      applyTransform(true);
      updateActive();
    }, 100);
  });

  /* ── Init ── */
  buildClones();
  buildDots();
  applyTransform(true);
  updateActive();
  updateDots();
  startAuto();
}

/* ═══════════════════════════════════════════════════════════════════
   WIRE UP YOUR TWO CAROUSELS
   Paste this block at the bottom of your page's <script> or here.
═══════════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", function () {
  /* Carousel 1 — Smile Transformations */
  initCarousel({
    trackId: "carouselTrack",
    viewportId:
      "carouselViewport1" /* add id="carouselViewport1" to first .carousel-viewport */,
    prevId: "prevBtn",
    nextId: "nextBtn",
    dotsId: "carouselDots",
    slideClass: "carousel-slide",
    autoplayMs: 3500,
  });

  /* Carousel 2 — Full Mouth Dental Implant */
  initCarousel({
    trackId: "carouselTrack2",
    viewportId:
      "carouselViewport2" /* add id="carouselViewport2" to second .carousel-viewport */,
    prevId: "prevBtn2",
    nextId: "nextBtn2",
    dotsId: "carouselDots2",
    slideClass: "carousel-slide",
    autoplayMs: 4000,
  });
});
// Transformation carousel ends

// running number effect
const counters = document.querySelectorAll(".counter");

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
            counter.innerText = Math.ceil(count);
            counter.innerText = Math.ceil(count) + "+";
            requestAnimationFrame(update);
          } else {
            counter.innerText = target;
            counter.innerText = Math.ceil(count) + "+";
          }
        };

        update();
        observer.unobserve(counter);
      }
    });
  },
  { threshold: 0.6 },
);

counters.forEach((counter) => {
  observer.observe(counter);
});

// Activity Carousel Script
document.addEventListener("DOMContentLoaded", function () {
  /* ── Config ── */
  const AUTOPLAY_MS = 4000;
  const TRANSITION_MS = 500;
  const DRAG_THRESHOLD = 60;
  const WHEEL_THRESHOLD = 40;

  /* ── DOM ── */
  const track = document.getElementById("act-track");
  const wrapper = track && track.closest(".act-carousel-wrapper");
  const prevBtn = document.getElementById("act-prev");
  const nextBtn = document.getElementById("act-next");
  const dotsWrap = document.getElementById("act-dots");

  if (!track || !wrapper) return;

  /* ── Read original slides from HTML ── */
  const originals = Array.from(track.querySelectorAll(".act-carousel-item"));
  const N = originals.length;
  if (N === 0) return;

  /* ──────────────────────────────────────────────────────────────
     INFINITE LOOP SETUP
     Clone last  → prepend  (index 0)
     Clone first → append   (index N+1)
     Start at realIndex = 1 (first real slide)
  ────────────────────────────────────────────────────────────── */
  const cloneFirst = originals[0].cloneNode(true);
  const cloneLast = originals[N - 1].cloneNode(true);
  cloneFirst.setAttribute("aria-hidden", "true");
  cloneLast.setAttribute("aria-hidden", "true");
  track.appendChild(cloneFirst);
  track.insertBefore(cloneLast, track.firstChild);

  const allItems = () =>
    Array.from(track.querySelectorAll(".act-carousel-item"));

  /* ── State ── */
  let realIndex = 1;
  let current = 0;
  let isPaused = false;
  let isTransitioning = false;
  let autoTimer = null;

  /* ── Dots ── */
  function buildDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = "";
    originals.forEach((_, i) => {
      const d = document.createElement("button");
      d.className = "act-dot" + (i === 0 ? " active" : "");
      d.setAttribute("aria-label", `Go to slide ${i + 1}`);
      d.addEventListener("click", () => {
        goTo(i);
        resetAuto();
      });
      dotsWrap.appendChild(d);
    });
  }

  function updateDots() {
    if (!dotsWrap) return;
    dotsWrap
      .querySelectorAll(".act-dot")
      .forEach((d, i) => d.classList.toggle("active", i === current));
  }

  function updateActive() {
    allItems().forEach((s, i) =>
      s.classList.toggle("is-active", i === realIndex),
    );
  }

  /* ── Each item = 100% of wrapper width ── */
  function getItemWidth() {
    return wrapper.offsetWidth;
  }

  function setItemWidths() {
    const w = getItemWidth();
    allItems().forEach((s) => {
      s.style.minWidth = w + "px";
      s.style.width = w + "px";
    });
  }

  /* ── Transform ── */
  function applyTransform(instant) {
    setItemWidths();
    const x = -(realIndex * getItemWidth());
    if (instant) {
      track.classList.add("act-no-tr");
      track.style.transform = `translateX(${x}px)`;
      track.offsetHeight;
      track.classList.remove("act-no-tr");
    } else {
      track.style.transform = `translateX(${x}px)`;
    }
  }

  /* ── Slide by 1 ── */
  function slide(dir) {
    if (isTransitioning) return;
    isTransitioning = true;

    realIndex += dir;
    current = (((realIndex - 1) % N) + N) % N;

    applyTransform(false);
    updateDots();

    setTimeout(() => {
      if (realIndex === N + 1) {
        realIndex = 1;
        applyTransform(true);
      }
      if (realIndex === 0) {
        realIndex = N;
        applyTransform(true);
      }
      updateActive();
      isTransitioning = false;
    }, TRANSITION_MS);
  }

  /* ── Go to logical index ── */
  function goTo(idx) {
    if (isTransitioning) return;
    current = idx;
    realIndex = idx + 1;
    applyTransform(false);
    updateDots();
    updateActive();
  }

  /* ── Buttons ── */
  if (prevBtn)
    prevBtn.addEventListener("click", () => {
      slide(-1);
      resetAuto();
    });
  if (nextBtn)
    nextBtn.addEventListener("click", () => {
      slide(+1);
      resetAuto();
    });

  /* ── Autoplay ── */
  function startAuto() {
    stopAuto();
    autoTimer = setInterval(() => {
      if (!isPaused) slide(+1);
    }, AUTOPLAY_MS);
  }
  function stopAuto() {
    clearInterval(autoTimer);
    autoTimer = null;
  }
  function resetAuto() {
    startAuto();
  }

  /* ── Pause on hover ── */
  wrapper.addEventListener("mouseenter", () => {
    isPaused = true;
  });
  wrapper.addEventListener("mouseleave", () => {
    isPaused = false;
  });

  /* ── Mouse drag + Touch swipe ── */
  let dragX = 0,
    dragDelta = 0,
    dragging = false;

  function onDragStart(x) {
    dragX = x;
    dragging = true;
    isPaused = true;
    track.classList.add("act-no-tr");
  }
  function onDragMove(x) {
    if (!dragging) return;
    dragDelta = x - dragX;
    const base = -(realIndex * getItemWidth());
    track.style.transform = `translateX(${base + dragDelta}px)`;
  }
  function onDragEnd() {
    if (!dragging) return;
    dragging = false;
    isPaused = false;
    track.classList.remove("act-no-tr");
    if (dragDelta < -DRAG_THRESHOLD) slide(+1);
    else if (dragDelta > DRAG_THRESHOLD) slide(-1);
    else applyTransform(false);
    dragDelta = 0;
  }

  wrapper.addEventListener("mousedown", (e) => {
    e.preventDefault();
    onDragStart(e.clientX);
  });
  window.addEventListener("mousemove", (e) => {
    if (dragging) onDragMove(e.clientX);
  });
  window.addEventListener("mouseup", () => onDragEnd());

  wrapper.addEventListener(
    "touchstart",
    (e) => onDragStart(e.touches[0].clientX),
    { passive: true },
  );
  wrapper.addEventListener(
    "touchmove",
    (e) => onDragMove(e.touches[0].clientX),
    { passive: true },
  );
  wrapper.addEventListener("touchend", () => onDragEnd());

  /* ── Two-finger trackpad scroll ── */
  let wheelAccum = 0,
    wheelTimer = null;

  wrapper.addEventListener(
    "wheel",
    (e) => {
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      if (!isHorizontal) return;
      e.preventDefault();
      wheelAccum += e.deltaX;
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => {
        wheelAccum = 0;
      }, 200);
      if (wheelAccum > WHEEL_THRESHOLD) {
        wheelAccum = 0;
        slide(+1);
        resetAuto();
      } else if (wheelAccum < -WHEEL_THRESHOLD) {
        wheelAccum = 0;
        slide(-1);
        resetAuto();
      }
    },
    { passive: false },
  );

  /* ── Resize ── */
  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => applyTransform(true), 100);
  });

  /* ── Init ── */
  buildDots();
  applyTransform(true);
  updateActive();
  updateDots();
  startAuto();
});
