const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");

if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const countdownEl = document.querySelector("#countdown");
if (countdownEl) {
  const target = new Date("2026-02-14T00:00:00");

  const updateCountdown = () => {
    const now = new Date();
    const diff = target.getTime() - now.getTime();

    if (diff <= 0) {
      countdownEl.textContent = "It's today!";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    countdownEl.textContent = `${days}d ${hours}h ${minutes}m`;
  };

  updateCountdown();
  setInterval(updateCountdown, 60 * 1000);
}

const noBtn = document.querySelector(".no-btn");
if (noBtn) {
  const container = noBtn.parentElement;

  const moveButton = (pointerX, pointerY) => {
    if (!container) return;

    const bounds = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;
    const distance = Math.hypot(pointerX - btnCenterX, pointerY - btnCenterY);

    if (distance > 120) return;

    const maxX = bounds.width - btnRect.width;
    const maxY = bounds.height - btnRect.height;
    const nextX = Math.max(0, Math.min(maxX, Math.random() * maxX));
    const nextY = Math.max(0, Math.min(maxY, Math.random() * maxY));

    noBtn.style.transform = `translate(${nextX - (btnRect.left - bounds.left)}px, ${nextY - (btnRect.top - bounds.top)}px)`;
  };

  container.addEventListener("mousemove", (event) => {
    moveButton(event.clientX, event.clientY);
  });

  container.addEventListener("touchstart", () => {
    moveButton(window.innerWidth / 2, window.innerHeight / 2);
  });
}
