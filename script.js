const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-nav");

const closeMenu = () => {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
  navigation.classList.remove("is-open");
};

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  navigation.classList.toggle("is-open", !isOpen);
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    closeMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

document.addEventListener("click", (event) => {
  if (menuButton?.getAttribute("aria-expanded") === "true" &&
      !navigation.contains(event.target) && !menuButton.contains(event.target)) {
    closeMenu();
  }
});

const motionOkay = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll(
  ".section-label, .about-grid, .work-heading, .work-card, .capability-layout, .contact-heading, .contact-card"
);

if (motionOkay && "IntersectionObserver" in window) {
  document.documentElement.classList.add("motion-ready");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -32px 0px" });

  revealItems.forEach((item) => revealObserver.observe(item));
}

const heroArt = document.querySelector(".hero-visual");
if (heroArt && motionOkay && window.matchMedia("(pointer: fine)").matches) {
  heroArt.addEventListener("pointermove", (event) => {
    const bounds = heroArt.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    heroArt.style.setProperty("--pointer-x", `${x * 12}px`);
    heroArt.style.setProperty("--pointer-y", `${y * 12}px`);
  });

  heroArt.addEventListener("pointerleave", () => {
    heroArt.style.setProperty("--pointer-x", "0px");
    heroArt.style.setProperty("--pointer-y", "0px");
  });
}
