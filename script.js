const WHATSAPP_NUMBER = "919876543210";

const CONFIG = {
  whatsappNumber: "919876543210",
  whatsappMessage: "Hello, I would like to inquire about your CA services.",
  firmName: "CA Sharma & Associates",
  phone: "+91 98765 43210",
  email: "info@casharma.in",
  address: "302, Finance Tower, MG Road, Ahmedabad, Gujarat - 380001",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117073.57962268872!2d72.530062!3d23.022505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd2a9%3A0x4fcedd11614f9a6c!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
};

document.addEventListener("DOMContentLoaded", () => {
  initWhatsAppLinks();
  initStickyNav();
  initSmoothScroll();
  initActiveNav();
  initScrollReveal();
  initMobileMenu();
  initAccordion();
  initContactForm();
  initCounterAnimation();
});

function getWhatsAppUrl() {
  const text = encodeURIComponent(CONFIG.whatsappMessage);
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${text}`;
}

function initWhatsAppLinks() {
  const url = getWhatsAppUrl();
  const whatsappBtn = document.getElementById("whatsappBtn");
  if (whatsappBtn) whatsappBtn.href = url;

  document.querySelectorAll(".whatsapp-faq-link, .whatsapp-inline-link").forEach((link) => {
    link.href = url;
  });
}

function initStickyNav() {
  const header = document.getElementById("header");
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      const nav = document.querySelector(".nav");
      if (nav && nav.classList.contains("menu-open")) {
        nav.classList.remove("menu-open");
        const toggle = document.getElementById("navToggle");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}

function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");

  revealElements.forEach((el) => {
    const delay = el.dataset.delay;
    if (delay) {
      el.style.transitionDelay = `${parseInt(delay, 10) * 0.15}s`;
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => observer.observe(el));

  document.querySelectorAll(".timeline-connector").forEach((connector, index) => {
    connector.style.transitionDelay = `${index * 0.15}s`;
    const stepObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.5 }
    );
    stepObserver.observe(connector);
  });
}

function initMobileMenu() {
  const toggle = document.getElementById("navToggle");
  const nav = document.querySelector(".nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

function initAccordion() {
  const items = document.querySelectorAll(".accordion-item");

  items.forEach((item) => {
    const question = item.querySelector(".accordion-question");
    if (!question) return;

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      items.forEach((other) => {
        other.classList.remove("active");
        const btn = other.querySelector(".accordion-question");
        if (btn) btn.setAttribute("aria-expanded", "false");
      });

      if (!isActive) {
        item.classList.add("active");
        question.setAttribute("aria-expanded", "true");
      }
    });
  });
}

function initContactForm() {
  const form = document.getElementById("contactForm");
  const successEl = document.getElementById("formSuccess");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullName = form.fullName.value.trim();
    const mobile = form.mobile.value.trim();
    const email = form.email.value.trim();
    const service = form.service.value;
    const message = form.message.value.trim();

    if (!fullName || !mobile || !email || !service || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(mobile.replace(/\s/g, ""))) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (successEl) {
      successEl.classList.add("show");
      setTimeout(() => successEl.classList.remove("show"), 5000);
    }

    form.reset();
  });
}

function initCounterAnimation() {
  const statsRow = document.getElementById("statsRow");
  if (!statsRow) return;

  let animated = false;

  const animateCounter = (el, target, suffix, duration) => {
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      el.textContent = `${value}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = `${target}${suffix}`;
      }
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          statsRow.querySelectorAll(".stat-number").forEach((el) => {
            const target = parseInt(el.dataset.target, 10);
            const suffix = el.dataset.suffix || "";
            animateCounter(el, target, suffix, 2000);
          });
          observer.unobserve(statsRow);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(statsRow);
}
