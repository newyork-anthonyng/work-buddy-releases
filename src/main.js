import { site } from "./config.js";
import "./styles.css";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const workFrames = ["./animations/work/00.png", "./animations/work/01.png"];
const restFrames = [
  "./animations/rest/00.png",
  "./animations/rest/01.png",
  "./animations/rest/02.png",
  "./animations/rest/03.png",
];
const campFrames = [
  "./animations/celebrate/00.png",
  "./animations/celebrate/01.png",
];

const loopBeats = [
  { alt: "Hiker walking", frames: workFrames },
  { alt: "Hiker resting on a break", frames: restFrames },
  { alt: "Hiker walking", frames: workFrames },
  { alt: "Hiker setting up camp", frames: campFrames },
];

function downloadHref() {
  if (site.downloadUrl) return site.downloadUrl;
  const subject = encodeURIComponent("Work Buddy early access");
  return `mailto:${site.supportEmail}?subject=${subject}`;
}

function downloadLabel() {
  return "Download for Mac";
}

function wireDownloads() {
  const href = downloadHref();
  const label = downloadLabel();
  document.querySelectorAll("[data-download]").forEach((el) => {
    el.setAttribute("href", href);
    if (el.dataset.download === "label") {
      el.textContent = label;
    }
  });
  document.querySelectorAll("[data-email]").forEach((el) => {
    el.setAttribute("href", `mailto:${site.supportEmail}`);
    if (el.dataset.email === "text") {
      el.textContent = site.supportEmail;
    }
  });
  document.querySelectorAll("[data-macos]").forEach((el) => {
    el.textContent = site.macos;
  });
}

function initNav() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const panel = document.querySelector("[data-nav-panel]");
  if (!toggle || !panel) return;

  const close = () => {
    panel.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    panel.classList.toggle("is-open", !open);
  });

  panel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", close);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });
}

function startFrameAnimation(img, frames, fps) {
  if (!img || frames.length === 0) return () => {};
  let index = 0;
  img.src = frames[0];
  if (reduceMotion || frames.length === 1) return () => {};
  const id = window.setInterval(() => {
    index = (index + 1) % frames.length;
    img.src = frames[index];
  }, 1000 / fps);
  return () => window.clearInterval(id);
}

function initLoop() {
  const img = document.querySelector("[data-loop-anim]");
  if (!img) return;

  let beat = 0;
  let stopAnim = () => {};

  const render = () => {
    const current = loopBeats[beat];
    stopAnim();
    img.alt = current.alt;
    stopAnim = startFrameAnimation(img, current.frames, 1);
  };

  render();
  if (reduceMotion) return;
  window.setInterval(() => {
    beat = (beat + 1) % loopBeats.length;
    render();
  }, 4200);
}

function initFaq() {
  const items = [...document.querySelectorAll(".faq-item")];
  items.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      items.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });
}

wireDownloads();
initNav();
initLoop();
initFaq();
