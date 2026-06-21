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

const sectionIds = ["profile", "services", "portfolio", "approach", "contact"];
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
const artifactControl = document.querySelector("[data-artifact-control]");

if (artifactControl) {
  const artifactStrip = artifactControl.querySelector("[data-artifact-strip]");
  const scrollButtons = artifactControl.querySelectorAll("[data-artifact-scroll]");

  scrollButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!artifactStrip) return;
      const direction = button.dataset.artifactScroll === "prev" ? -1 : 1;
      artifactStrip.scrollBy({
        left: direction * Math.max(220, artifactStrip.clientWidth * 0.72),
        behavior: reduceMotion.matches ? "auto" : "smooth",
      });
    });
  });
}
const methodCarousel = document.querySelector("[data-method-carousel]");

if (methodCarousel) {
  const methodTrack = methodCarousel.querySelector("[data-method-track]");
  const methodItems = Array.from(methodCarousel.querySelectorAll(".method-plate"));
  const methodButtons = Array.from(methodCarousel.querySelectorAll("[data-method-scroll]"));
  let methodScrollFrame = 0;

  function currentMethodIndex() {
    if (!methodTrack || !methodItems.length) return 0;
    const trackLeft = methodTrack.getBoundingClientRect().left;
    return methodItems.reduce((closestIndex, item, index) => {
      const closestDistance = Math.abs(methodItems[closestIndex].getBoundingClientRect().left - trackLeft);
      const itemDistance = Math.abs(item.getBoundingClientRect().left - trackLeft);
      return itemDistance < closestDistance ? index : closestIndex;
    }, 0);
  }

  function updateMethodButtons() {
    const index = currentMethodIndex();
    methodButtons.forEach((button) => {
      const isPrevious = button.dataset.methodScroll === "prev";
      button.disabled = isPrevious ? index === 0 : index === methodItems.length - 1;
    });
  }

  methodButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!methodTrack || !methodItems.length) return;
      const direction = button.dataset.methodScroll === "prev" ? -1 : 1;
      const nextIndex = Math.min(Math.max(currentMethodIndex() + direction, 0), methodItems.length - 1);
      methodTrack.scrollTo({
        left: methodItems[nextIndex].offsetLeft - methodTrack.offsetLeft,
        behavior: reduceMotion.matches ? "auto" : "smooth",
      });
    });
  });

  if (methodTrack) {
    methodTrack.addEventListener("scroll", () => {
      if (methodScrollFrame) return;
      methodScrollFrame = window.requestAnimationFrame(() => {
        methodScrollFrame = 0;
        updateMethodButtons();
      });
    });
  }

  window.addEventListener("resize", updateMethodButtons);
  updateMethodButtons();
}
