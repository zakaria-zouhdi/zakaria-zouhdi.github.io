const hero = document.querySelector(".hero-media");

window.addEventListener("pointermove", (event) => {
  if (!hero) return;

  const x = Math.round((event.clientX / window.innerWidth) * 100);
  const y = Math.round((event.clientY / window.innerHeight) * 100);

  hero.style.setProperty("--cursor-x", `${x}%`);
  hero.style.setProperty("--cursor-y", `${y}%`);
});
