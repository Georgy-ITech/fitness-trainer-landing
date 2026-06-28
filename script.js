const revealItems = document.querySelectorAll(".reveal");
const progressBar = document.getElementById("progressBar");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll('.nav a[href^="#"]');
const sections = document.querySelectorAll("section[id]");
const counters = document.querySelectorAll("[data-counter]");
const tiltCards = document.querySelectorAll("[data-tilt]");
const form = document.getElementById("signupForm");
const formNote = document.getElementById("formNote");
const heroImage = document.querySelector(".hero__image");
const baRange = document.getElementById("baRange");
const baOverlay = document.getElementById("baOverlay");
const baHandle = document.getElementById("baHandle");
const baBeforeImage = document.getElementById("baBeforeImage");
const baAfterImage = document.getElementById("baAfterImage");
const baCaption = document.getElementById("baCaption");
const baCaseButtons = document.querySelectorAll(".ba-case");
const faqButtons = document.querySelectorAll(".faq-question");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        entry.target.style.transitionDelay = `${delay}ms`;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

if (prefersReducedMotion) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  revealItems.forEach((item) => revealObserver.observe(item));
}

const animateCounter = (counter) => {
  const endValue = Number(counter.dataset.counter);
  const duration = 1400;
  let start = null;

  const tick = (time) => {
    if (!start) start = time;
    const progress = Math.min((time - start) / duration, 1);
    counter.textContent = Math.floor(progress * endValue);
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      counter.textContent = endValue;
    }
  };

  requestAnimationFrame(tick);
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => counterObserver.observe(counter));

const updateProgressBar = () => {
  if (!progressBar) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;
};

const updateActiveLink = () => {
  let currentId = "";
  sections.forEach((section) => {
    const top = section.offsetTop - 140;
    if (window.scrollY >= top) currentId = section.id;
  });

  navLinks.forEach((link) => {
    const target = link.getAttribute("href").slice(1);
    link.classList.toggle("is-active", target === currentId);
  });
};

let isTicking = false;
const onScroll = () => {
  if (isTicking) return;
  isTicking = true;
  window.requestAnimationFrame(() => {
    updateProgressBar();
    updateActiveLink();
    isTicking = false;
  });
};

window.addEventListener("scroll", onScroll, { passive: true });

updateProgressBar();
updateActiveLink();

const closeMenu = () => {
  if (!menuToggle || !navMenu) return;
  navMenu.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
};

menuToggle?.addEventListener("click", () => {
  if (!navMenu) return;
  const isOpen = navMenu.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

document.addEventListener("click", (event) => {
  if (!navMenu || !menuToggle) return;
  const target = event.target;
  if (target instanceof Node && !navMenu.contains(target) && !menuToggle.contains(target)) {
    closeMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

if (supportsHover && !prefersReducedMotion) {
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 8;
      const rotateX = (0.5 - y / rect.height) * 8;
      card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

if (heroImage && supportsHover && !prefersReducedMotion) {
  let heroFrame = null;
  window.addEventListener("mousemove", (event) => {
    if (heroFrame) cancelAnimationFrame(heroFrame);
    heroFrame = requestAnimationFrame(() => {
      const xShift = (event.clientX / window.innerWidth - 0.5) * 8;
      const yShift = (event.clientY / window.innerHeight - 0.5) * 8;
      heroImage.style.transform = `translate(${xShift}px, ${yShift}px)`;
    });
  });
}

const updateBeforeAfter = (value) => {
  if (!baOverlay || !baHandle) return;
  const numericValue = Math.min(100, Math.max(0, Number(value)));
  baOverlay.style.clipPath = `inset(0 ${100 - numericValue}% 0 0)`;
  baHandle.style.left = `${numericValue}%`;
};

if (baRange) {
  updateBeforeAfter(baRange.value);
  baRange.addEventListener("input", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;
    updateBeforeAfter(target.value);
  });
}

baCaseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!(button instanceof HTMLButtonElement)) return;
    if (!baBeforeImage || !baAfterImage || !baCaption) return;

    const beforeSrc = button.dataset.before;
    const afterSrc = button.dataset.after;
    const caption = button.dataset.caption;
    if (!beforeSrc || !afterSrc || !caption) return;

    baCaseButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");

    baBeforeImage.src = beforeSrc;
    baAfterImage.src = afterSrc;
    baCaption.textContent = caption;
  });
});

faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const answer = button.nextElementSibling;
    if (!(answer instanceof HTMLElement)) return;

    const isOpen = button.getAttribute("aria-expanded") === "true";

    const animateClose = (el) => {
      el.style.maxHeight = `${el.scrollHeight}px`;
      void el.offsetHeight;
      el.style.maxHeight = "0px";
      const onEnd = () => {
        el.hidden = true;
      };
      el.addEventListener("transitionend", onEnd, { once: true });
    };

    const animateOpen = (el) => {
      el.hidden = false;
      el.style.maxHeight = "0px";
      requestAnimationFrame(() => {
        el.style.maxHeight = `${el.scrollHeight}px`;
      });
    };

    faqButtons.forEach((otherButton) => {
      otherButton.setAttribute("aria-expanded", "false");
      const otherAnswer = otherButton.nextElementSibling;
      if (otherAnswer instanceof HTMLElement) {
        if (!otherAnswer.hidden) {
          animateClose(otherAnswer);
        }
      }
    });

    if (!isOpen) {
      button.setAttribute("aria-expanded", "true");
      animateOpen(answer);
    }
  });
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  formNote.textContent = "Заявка отправлена. Свяжусь с вами в ближайшее время.";
  formNote.style.color = "#0a7c60";
  form.reset();
});
