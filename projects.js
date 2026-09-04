/* ============================================================
   projects.js — Enhanced project data & card renderer
   Compatible with enhanced-portfolio.css
   ============================================================ */

const projects = [
  {
    title: "AI-Powered Leukemia Detection",
    img: "project1.png",
    description: "Medical analysis platform using machine learning to detect leukemia type and stage from blood smear and bone marrow images with high diagnostic accuracy.",
    link: "mailto:abbes.abdennour13@gmail.com",
    progress: 100,
    status: "Request Demo",
    icon: "fas fa-microscope",
    tags: ["Python", "ML", "Computer Vision"],
    badge: { label: "Completed", type: "success" },
  },
  {
    title: "Large-Scale Multiplayer Game",
    img: "project2.png",
    description: "Cross-platform real-time multiplayer game in Unity supporting 500+ concurrent players with server-synchronised gameplay inspired by Slither.io.",
    link: "",
    progress: 80,
    status: "Contact Publisher",
    icon: "fas fa-gamepad",
    tags: ["Unity", "C#", "Netcode", "WebSockets"],
    badge: { label: "In Progress", type: "info" },
    disabled: true
  },
  {
    title: "ShotLiva – Survival Builder RPG",
    img: "project6.png",
    description: "Pixel‑art survival game with base building, crafting, farming, and village simulation. Gather resources, grow crops, build structures, expand your world.",
    link: "mailto:abbes.abdennour13@gmail.com",
    progress: 30,
    status: "Request Demo",
    icon: "fas fa-hammer",
    tags: ["Unity", "C#", "Pixel Art", "RPG"],
    badge: { label: "Early Dev", type: "warning" },
  },
  {
    title: "Background Remover",
    img: "project12.png",
    description: "A zero-backend image matting tool that runs a neural segmentation model entirely client-side via WebAssembly — no uploads, no server round-trip, full-resolution output on-device.",
    link: "https://abbestlm.github.io/removebackground/",
    progress: 100,
    status: "Try it now",
    icon: "fas fa-magic",
    tags: ["JavaScript", "WebAssembly", "ONNX Runtime", "Client-side ML"],
    badge: { label: "Completed", type: "success" }
  },
  {
    title: "Dream Canvas",
    img: "project10.png",
    description: "A handcrafted personal creative studio for high-quality image generation and deep visual analysis, featuring a neural rendering engine.",
    link: "https://abbestlm.github.io/DREAMCANVAS/",
    progress: 100,
    status: "Try it now",
    icon: "fas fa-palette",
    tags: ["React", "Gemini APIs", "LLMs", "Tailwind CSS"],
    badge: { label: "Completed", type: "success" },
  },
  {
    title: "stock market real-time data dashboard",
    img: "project11.png",
    description: "High-performance stock market dashboard providing real-time data, interactive technical charts, and comprehensive market sentiment analysis.",
    link: "https://abbestlm.github.io/Stocker/",
    progress: 100,
    status: "Try it now",
    icon: "fas fa-chart-line",
    tags: ["React", "TypeScript", "Tailwind CSS", "Financial APIs"],
    badge: { label: "Completed", type: "success" }
  },
  {
    title: "Neural-XOR | Vanilla JS Backprop Engine",
    img: "project9.png",
    description: "A zero-dependency Multi-Layer Perceptron (MLP) built from scratch to solve non-linear classification",
    link: "https://abbestlm.github.io/Synaptic-XOR/",
    progress: 100,
    status: "Play now",
    icon: "fas fa-microscope",
    tags: ["AI", "CNNs", "deep learning", "JavaScript"],
    badge: { label: "Completed", type: "success" },
  },
  {
    title: "Nova laser storm bullet hell",
    img: "project7.png",
    description: "simple Bullet hell game where you control a spaceship and have to dodge incoming lasers and shoot them down.",
    link: "https://abbestlm.github.io/Bullet-hell",
    progress: 100,
    status: "Play now",
    icon: "fas fa-gamepad",
    tags: ["HTML5", "JavaScript", "CSS"],
    badge: { label: "Completed", type: "success" },
  },
];

/* ── Badge colour map ── */
const BADGE_COLORS = {
  success: { bg: "rgba(45,222,152,0.12)", border: "rgba(45,222,152,0.35)", text: "#2dde98" },
  info: { bg: "rgba(124,143,255,0.12)", border: "rgba(124,143,255,0.35)", text: "#7c8fff" },
  warning: { bg: "rgba(251,191,36,0.12)", border: "rgba(251,191,36,0.35)", text: "#fbbf24" },
  danger: { bg: "rgba(248,113,113,0.12)", border: "rgba(248,113,113,0.35)", text: "#f87171" },
};

/* ── Progress gradient map ── */
const progressStyle = (pct) => {
  if (pct === 100) return "linear-gradient(90deg,#2dde98,#1aff85)";
  if (pct >= 70) return "linear-gradient(90deg,#7c8fff,#38f9d7)";
  if (pct >= 40) return "linear-gradient(90deg,#fbbf24,#ffe066)";
  return "linear-gradient(90deg,#fb923c,#ffd580)";
};

/* ── Card renderer ── */
const createProjectCard = (p, index) => {
  const isExternal = p.link.startsWith("http");
  const isDisabled = !!p.disabled;
  const targetRel = isExternal && !isDisabled ? 'target="_blank" rel="noopener noreferrer"' : "";
  const disabledAttr = isDisabled ? "tabindex='-1' aria-disabled='true'" : "";

  const { bg, border, text } = BADGE_COLORS[p.badge.type] || BADGE_COLORS.info;

  const tagsHTML = (p.tags || []).map(t =>
    `<span class="tag">${t}</span>`
  ).join("");

  const progressLabel = p.progress === 100
    ? "Completed"
    : `${p.progress}% Complete`;

  /* Stagger reveal delay per card */
  const delay = index * 80;

  return `
<article class="bento-card" role="listitem" data-reveal style="--reveal-delay:${delay}ms">

  <!-- Project image -->
  <div class="card-img-wrap">
    <img src="${p.img}"
         alt="${p.title} project preview"
         loading="lazy"
         decoding="async"
         height="200"
         width="600" />
  </div>

  <div class="card-body">

    <!-- Header row: icon + badge -->
    <div class="card-header-row">
      <span class="card-icon" aria-hidden="true">
        <i class="${p.icon}"></i>
      </span>
      <span class="card-badge"
            style="background:${bg};border-color:${border};color:${text}">
        ${p.badge.label}
      </span>
    </div>

    <!-- Title -->
    <h3 class="card-title">${p.title}</h3>

    <!-- Description -->
    <p class="card-text">${p.description}</p>

    <!-- Tags -->
    ${tagsHTML ? `<div class="card-tags" aria-label="Technologies used">${tagsHTML}</div>` : ""}

    <!-- CTA -->
    <div class="btn-container mt-auto">
      <a href="${p.link}"
         class="btn btn-primary w-100 ${isDisabled ? "disabled" : ""}"
         ${disabledAttr}
         ${targetRel}>
        <i class="${isExternal ? "fab fa-github" : "fas fa-envelope"}" aria-hidden="true"></i>
        ${p.status}
      </a>
    </div>

    <!-- Progress -->
    <div class="progress mt-3"
         role="progressbar"
         aria-valuenow="${p.progress}"
         aria-valuemin="0"
         aria-valuemax="100"
         aria-label="${p.title} progress: ${progressLabel}">
      <div class="progress-bar"
           style="width:${p.progress}%;background:${progressStyle(p.progress)}"
           aria-hidden="true">
      </div>
    </div>

    <!-- Progress label -->
    <p class="progress-label" aria-hidden="true">
      <span class="progress-pct"
            style="color:${progressStyle(p.progress).split(',')[1]?.replace(')', '').trim() ?? '#7c8fff'}">
        ${p.progress}%
      </span>
      &nbsp;${p.progress === 100 ? "· Completed" : "complete"}
    </p>

  </div>
</article>`.trim();
};

/* ── Mount ── */
const grid = document.getElementById("projectsRow");
if (grid) {
  grid.innerHTML = projects.map(createProjectCard).join("\n");

  /* Re-observe newly injected cards for scroll reveal */
  if (window.__revealObserver) {
    grid.querySelectorAll("[data-reveal]").forEach(el => {
      el.classList.add("reveal");
      window.__revealObserver.observe(el);
    });
  } else {
    /* Fallback: show immediately */
    grid.querySelectorAll("[data-reveal]").forEach(el =>
      el.classList.add("reveal", "is-visible")
    );
  }
}
