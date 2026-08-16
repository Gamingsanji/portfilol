/* ==========================================================================
   KARAN — VIDEO EDITOR PORTFOLIO
   script.js — all interactions, no frameworks, vanilla JS only.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ------------------------------------------------------------------
     0. PROJECT DATA
     👉 Your videos are managed in a plain text file: my-videos.txt
        Open THAT file (from your phone or computer) to add, remove or
        edit portfolio videos — no code editing required, ever.
        This section reads that file and turns each line into a project
        card automatically (category + title are figured out from the
        folder name and file name, so you only type a file path).
  ------------------------------------------------------------------ */
  const CATEGORY_LABELS = {
    anime: "Anime Edit",
    facecam: "Face Cam Edit",
    meme: "Funny Meme",
    podcast: "Podcast",
    random: "Random Edit",
    typography: "Typography",
  };

  // Turns "shadow-realm-amv.mp4" into "Shadow Realm Amv"
  function titleFromFilename(path) {
    const file = path.split("/").pop().replace(/\.[^/.]+$/, "");
    return file
      .replace(/[-_]+/g, " ")
      .trim()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  // Parses one line of my-videos.txt: "videos/anime/clip.mp4 | description"
  function parseVideoLine(line) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return null;
    const [rawPath, rawDesc] = trimmed.split("|");
    const video = rawPath.trim();
    if (!video) return null;
    const segments = video.split("/");
    const category = segments.length > 1 ? segments[1] : "random";
    return {
      video,
      category,
      label: CATEGORY_LABELS[category] || "Edit",
      title: titleFromFilename(video),
      desc: rawDesc && rawDesc.trim() ? rawDesc.trim() : "A premium edit by Karan.",
    };
  }

  // A tiny built-in fallback so the page still shows something if
  // my-videos.txt can't be fetched (e.g. previewing by double-clicking
  // index.html directly instead of via a live/hosted site).
  const FALLBACK_PROJECTS = [
    { title: "Shadow Realm AMV", category: "anime", label: "Anime Edit", desc: "Beat-synced action montage with impact-frame transitions.", video: "videos/anime/shadow-realm-amv.mp4" },
    { title: "Gaming Rage Reel", category: "facecam", label: "Face Cam Edit", desc: "Reactive zooms synced to cam and gameplay audio.", video: "videos/facecam/gaming-rage-reel.mp4" },
    { title: "Office Chaos", category: "meme", label: "Funny Meme", desc: "Timed comedic beats with layered sound design.", video: "videos/meme/office-chaos.mp4" },
    { title: "The Grind Podcast Ep. 12", category: "podcast", label: "Podcast", desc: "Multi-cam podcast edit with highlight-clip cutdown.", video: "videos/podcast/the-grind-podcast-ep-12.mp4" },
    { title: "Street Story", category: "random", label: "Random Edit", desc: "Cinematic B-roll storytelling with ambient grade.", video: "videos/random/street-story.mp4" },
    { title: "Motivation Kinetic Type", category: "typography", label: "Typography", desc: "Kinetic type animation synced to a spoken-word script.", video: "videos/typography/motivation-kinetic-type.mp4" },
  ];

  async function loadProjects() {
    try {
      const res = await fetch("my-videos.txt", { cache: "no-store" });
      if (!res.ok) throw new Error("not found");
      const text = await res.text();
      const parsed = text.split("\n").map(parseVideoLine).filter(Boolean);
      return parsed.length ? parsed : FALLBACK_PROJECTS;
    } catch (err) {
      // Happens when opening index.html directly from disk (file://) —
      // browsers block reading local text files that way for security.
      // Everything still works once the site is hosted (GitHub/Vercel).
      return FALLBACK_PROJECTS;
    }
  }

  /* ------------------------------------------------------------------
     1. LOADER
  ------------------------------------------------------------------ */
  const loader = document.getElementById("loader");
  const loaderBarFill = document.querySelector(".loader-bar span");
  const loaderPct = document.getElementById("loaderPct");
  let pct = 0;
  const loadInterval = setInterval(() => {
    pct += Math.random() * 18 + 6;
    if (pct >= 100) {
      pct = 100;
      clearInterval(loadInterval);
      setTimeout(() => {
        loader.classList.add("hidden");
        document.body.classList.remove("no-scroll");
        playHeroEntrance();
      }, 300);
    }
    loaderBarFill.style.width = pct + "%";
    loaderPct.textContent = Math.floor(pct) + "%";
  }, 140);
  document.body.classList.add("no-scroll");

  /* ------------------------------------------------------------------
     2. HERO ENTRANCE ANIMATION (luxury staggered reveal)
  ------------------------------------------------------------------ */
  function playHeroEntrance() {
    const lines = document.querySelectorAll(".hero-inner .reveal-line");
    lines.forEach((line, i) => {
      const span = document.createElement("span");
      span.style.display = "inline-block";
      span.style.transform = "translateY(110%)";
      span.style.opacity = "0";
      span.style.transition = `transform 1s cubic-bezier(.16,1,.3,1) ${i * 0.09}s, opacity 1s ease ${i * 0.09}s`;
      span.innerHTML = line.innerHTML;
      line.innerHTML = "";
      line.appendChild(span);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          span.style.transform = "translateY(0)";
          span.style.opacity = "1";
        });
      });
    });
  }

  /* ------------------------------------------------------------------
     3. PARTICLE BACKGROUND (canvas)
  ------------------------------------------------------------------ */
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");
  let particles = [];
  let mouse = { x: null, y: null };

  function resizeCanvas() {
    // Cap the pixel ratio so ultra-high-DPI phones (3x/4x screens) don't
    // force the canvas to render millions of extra pixels every frame —
    // keeps particle animation smooth on budget phones too.
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function initParticles() {
    const count = window.innerWidth < 480 ? 18 : window.innerWidth < 768 ? 30 : 80;
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      alpha: Math.random() * 0.5 + 0.15,
    }));
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvas.offsetWidth;
      if (p.x > canvas.offsetWidth) p.x = 0;
      if (p.y < 0) p.y = canvas.offsetHeight;
      if (p.y > canvas.offsetHeight) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(196,181,253,${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(animateParticles);
  }

  if (canvas) {
    resizeCanvas();
    initParticles();
    animateParticles();
    window.addEventListener("resize", () => { resizeCanvas(); initParticles(); });
  }

  /* ------------------------------------------------------------------
     4. CURSOR GLOW + DOT
  ------------------------------------------------------------------ */
  const cursorGlow = document.getElementById("cursorGlow");
  const cursorDot = document.getElementById("cursorDot");
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    window.addEventListener("mousemove", (e) => {
      cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
    document.querySelectorAll("a, button, .skill-card, .project-card").forEach((el) => {
      el.addEventListener("mouseenter", () => cursorDot.classList.add("active"));
      el.addEventListener("mouseleave", () => cursorDot.classList.remove("active"));
    });
  }

  /* ------------------------------------------------------------------
     5. MAGNETIC BUTTONS
  ------------------------------------------------------------------ */
  document.querySelectorAll(".magnetic").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.22}px, ${y * 0.35}px)`;
    });
    el.addEventListener("mouseleave", () => { el.style.transform = "translate(0,0)"; });
  });

  /* ------------------------------------------------------------------
     6. SKILL CARD SPOTLIGHT (mouse-relative glow position)
  ------------------------------------------------------------------ */
  document.querySelectorAll(".skill-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    });
  });

  /* ------------------------------------------------------------------
     7. NAVBAR — scroll state + mobile toggle
  ------------------------------------------------------------------ */
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
    backToTop.classList.toggle("show", window.scrollY > 700);
  });

  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("open");
    navLinks.classList.toggle("open");
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      navToggle.classList.remove("open");
      navLinks.classList.remove("open");
    })
  );

  /* ------------------------------------------------------------------
     8. SCROLL REVEAL (IntersectionObserver)
  ------------------------------------------------------------------ */
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ------------------------------------------------------------------
     9. ANIMATED STAT COUNTERS
  ------------------------------------------------------------------ */
  const statEls = document.querySelectorAll(".stat-num");
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 60));
        const tick = () => {
          current += step;
          if (current >= target) { el.textContent = target; return; }
          el.textContent = current;
          requestAnimationFrame(tick);
        };
        tick();
        statObserver.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  statEls.forEach((el) => statObserver.observe(el));

  /* ------------------------------------------------------------------
     10. HERO TIMELINE WAVEFORM (generated bars)
  ------------------------------------------------------------------ */
  const wave = document.getElementById("timelineWave");
  if (wave) {
    const bars = 90;
    for (let i = 0; i < bars; i++) {
      const bar = document.createElement("span");
      const h = 8 + Math.random() * 34;
      bar.style.width = "2px";
      bar.style.height = h + "px";
      bar.style.borderRadius = "2px";
      bar.style.background = i % 7 === 0 ? "rgba(196,181,253,0.85)" : "rgba(255,255,255,0.18)";
      bar.style.flexShrink = "0";
      wave.appendChild(bar);
    }
  }

  /* ------------------------------------------------------------------
     11. PROCESS TIMELINE — fill line on scroll
  ------------------------------------------------------------------ */
  const tpLineFill = document.getElementById("tpLineFill");
  const processSection = document.getElementById("process");
  if (tpLineFill && processSection) {
    const processObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tpLineFill.style.width = "100%";
            processObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );
    processObserver.observe(processSection);
  }

  /* ------------------------------------------------------------------
     12. PORTFOLIO — render project cards + filtering
  ------------------------------------------------------------------ */
  const grid = document.getElementById("portfolioGrid");
  const lightbox = document.getElementById("lightbox");
  const lightboxVideo = document.getElementById("lightboxVideo");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxDesc = document.getElementById("lightboxDesc");

  // Touch devices (phones/tablets) can't "hover", so we treat them differently:
  // - the play button stays visible at all times (handled in CSS via [data-touch])
  // - preview videos are never auto-played inline (saves mobile data)
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  if (isTouch) document.body.setAttribute("data-touch", "true");

  /* LAZY VIDEO LOADING ----------------------------------------------------
     No matter how large a video file is (a few MB or a few hundred MB),
     the browser never even requests it until the card is about to enter
     the viewport. This keeps the page fast regardless of video size and
     avoids downloading videos the visitor never scrolls to. */
  const lazyVideoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const videoEl = entry.target;
        const realSrc = videoEl.dataset.src;
        if (realSrc && !videoEl.src) {
          videoEl.src = realSrc;
          videoEl.load();
        }
        lazyVideoObserver.unobserve(videoEl);
      });
    },
    { rootMargin: "400px 0px", threshold: 0.01 }
  );

  function renderProjects(projects) {
    grid.innerHTML = "";
    projects.forEach((p, i) => {
      const card = document.createElement("article");
      card.className = "project-card reveal";
      card.dataset.category = p.category;
      card.style.transitionDelay = (i % 6) * 0.05 + "s";

      card.innerHTML = `
        <div class="project-media">
          <video data-src="${p.video}" muted loop playsinline preload="none"></video>
          <button class="play-btn" aria-label="Play ${p.title}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
          </button>
          <div class="project-info">
            <span class="project-cat">${p.label}</span>
            <h3 class="project-title">${p.title}</h3>
            <p class="project-desc">${p.desc}</p>
          </div>
        </div>
      `;

      const videoEl = card.querySelector("video");
      lazyVideoObserver.observe(videoEl);

      // Only auto-preview on hover for devices that actually support hover
      // (desktop/laptop). On phones this is skipped to save data/battery —
      // tapping the play button opens the full video instead.
      if (!isTouch) {
        card.addEventListener("mouseenter", () => videoEl.play().catch(() => {}));
        card.addEventListener("mouseleave", () => { videoEl.pause(); videoEl.currentTime = 0; });
      }

      card.querySelector(".play-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        openLightbox(p);
      });

      grid.appendChild(card);
      revealObserver.observe(card);
    });
  }

  function openLightbox(p) {
    // Large videos: the lightbox streams straight from disk via the browser's
    // native <video> element, so file size is never limited by JavaScript —
    // it plays exactly like any normal HTML5 video regardless of size.
    lightboxVideo.preload = "auto";
    lightboxVideo.src = p.video;
    lightboxTitle.textContent = p.title;
    lightboxDesc.textContent = p.desc;
    lightbox.classList.add("open");
    document.body.classList.add("no-scroll");
    lightboxVideo.play().catch(() => {});
  }
  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.classList.remove("no-scroll");
    lightboxVideo.pause();
    lightboxVideo.removeAttribute("src");
    lightboxVideo.load();
  }
  document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
  document.getElementById("lightboxBackdrop").addEventListener("click", closeLightbox);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

  loadProjects().then(renderProjects);

  const filterBar = document.getElementById("filterBar");
  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    filterBar.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    document.querySelectorAll(".project-card").forEach((card) => {
      const match = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hide", !match);
    });
  });

  /* ------------------------------------------------------------------
     13. FAQ ACCORDION
  ------------------------------------------------------------------ */
  document.querySelectorAll(".accordion-item").forEach((item) => {
    item.querySelector(".accordion-head").addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".accordion-item").forEach((i) => i.classList.remove("open"));
      if (!isOpen) item.classList.add("open");
    });
  });

  /* ------------------------------------------------------------------
     14. BACK TO TOP
  ------------------------------------------------------------------ */
  const backToTop = document.getElementById("backToTop");
  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ------------------------------------------------------------------
     15. FOOTER YEAR
  ------------------------------------------------------------------ */
  document.getElementById("year").textContent = new Date().getFullYear();

});
