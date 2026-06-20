const hero = document.querySelector(".hero-media");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const coarsePointer = window.matchMedia("(pointer: coarse)");

let frame = 0;
let nextX = 72;
let nextY = 22;

function trackingAllowed() {
  return hero && !reduceMotion.matches && !coarsePointer.matches;
}

function updateHeroLight() {
  frame = 0;
  hero.style.setProperty("--hero-x", `${nextX}%`);
  hero.style.setProperty("--hero-y", `${nextY}%`);
}

window.addEventListener("pointermove", (event) => {
  if (!trackingAllowed()) return;

  nextX = Math.round((event.clientX / window.innerWidth) * 100);
  nextY = Math.round((event.clientY / window.innerHeight) * 100);

  if (!frame) {
    frame = window.requestAnimationFrame(updateHeroLight);
  }
});

const sectionIds = ["profile", "services", "approach", "contact"];
const sections = sectionIds
  .map((id) => document.getElementById(id))
  .filter(Boolean);
const navLinks = Array.from(
  document.querySelectorAll('.site-nav a[href^="#"], .section-index a[href^="#"]')
);

function setActiveSection(id) {
  navLinks.forEach((link) => {
    const active = link.hash === `#${id}`;
    link.classList.toggle("is-active", active);
    if (active) {
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

if (sections.length) {
  document.body.classList.add("enhanced");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 }
    );

    sections.forEach((section) => revealObserver.observe(section));

    const activeObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.1, 0.3, 0.6] }
    );

    sections.forEach((section) => activeObserver.observe(section));
  } else {
    sections.forEach((section) => section.classList.add("is-visible"));
  }
}
