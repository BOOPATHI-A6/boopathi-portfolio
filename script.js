// Scroll reveal, typing headline, and reading progress.
document.addEventListener("DOMContentLoaded", () => {
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  const words = ["web experiences", "useful applications", "digital solutions"];
  const target = document.getElementById("typingText");
  let wordIndex = 0, charIndex = 0, deleting = false;
  function type() {
    if (!target) return;
    const word = words[wordIndex];
    target.textContent = word.slice(0, charIndex);
    let delay = deleting ? 42 : 78;
    if (!deleting && charIndex === word.length) {
      deleting = true; delay = 1350;
    } else if (deleting && charIndex === 0) {
      deleting = false; wordIndex = (wordIndex + 1) % words.length; delay = 350;
    } else {
      charIndex += deleting ? -1 : 1;
    }
    window.setTimeout(type, delay);
  }
  type();

  const progress = document.getElementById("scrollProgress");
  function updateProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();
  document.getElementById("year").textContent = new Date().getFullYear();

  // Close the mobile navigation after a section link is selected.
  document.querySelectorAll("#navLinks .nav-link").forEach(link => {
    link.addEventListener("click", () => {
      const nav = document.getElementById("navLinks");
      if (nav.classList.contains("show") && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(nav).hide();
      }
    });
  });
});
