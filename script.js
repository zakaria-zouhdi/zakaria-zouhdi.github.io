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
