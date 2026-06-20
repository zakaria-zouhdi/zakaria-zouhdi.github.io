const hero = document.querySelector(".hero-media");
const reactiveElements = document.querySelectorAll(
  ".button, .credential-plate, .capability-strip article, .service-card, .work-item, .contact-panel"
);

window.addEventListener("pointermove", (event) => {
  const x = Math.round((event.clientX / window.innerWidth) * 100);
  const y = Math.round((event.clientY / window.innerHeight) * 100);

  if (hero) {
    hero.style.setProperty("--cursor-x", `${x}%`);
    hero.style.setProperty("--cursor-y", `${y}%`);
  }
});

reactiveElements.forEach((element) => {
  element.addEventListener("pointermove", (event) => {
    const rect = element.getBoundingClientRect();
    const x = Math.round(((event.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((event.clientY - rect.top) / rect.height) * 100);

    element.style.setProperty("--local-x", `${x}%`);
    element.style.setProperty("--local-y", `${y}%`);
  });
});
