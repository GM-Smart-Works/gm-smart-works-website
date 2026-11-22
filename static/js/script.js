document.documentElement.classList.add("js");

const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const primaryNav = document.getElementById("primaryNav");

function updateHeader() {
  header.classList.toggle("is-compact", window.scrollY > 44);
}
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  primaryNav.classList.toggle("open", open);
  document.body.classList.toggle("menu-open", open);
});

primaryNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    primaryNav.classList.remove("open");
    document.body.classList.remove("menu-open");
  });
});

document.querySelectorAll(".service-toggle").forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".service-card");
    const details = document.getElementById(button.getAttribute("aria-controls"));
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    details.hidden = expanded;
    card.classList.toggle("is-open", !expanded);
    button.querySelector("span").textContent = expanded ? "READ MORE →" : "SHOW LESS ←";
  });
});

const tabButtons = [...document.querySelectorAll(".tab-btn")];
function activateTab(button) {
  tabButtons.forEach(tab => {
    const active = tab === button;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
    const panel = document.getElementById(tab.getAttribute("aria-controls"));
    panel.classList.toggle("active", active);
    panel.hidden = !active;
  });
  button.focus();
}
tabButtons.forEach((button, index) => {
  button.addEventListener("click", () => activateTab(button));
  button.addEventListener("keydown", event => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % tabButtons.length;
    if (event.key === "ArrowLeft") next = (index - 1 + tabButtons.length) % tabButtons.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabButtons.length - 1;
    activateTab(tabButtons[next]);
  });
});

const observer = "IntersectionObserver" in window
  ? new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 })
  : null;
document.querySelectorAll(".reveal").forEach(section => {
  if (observer) observer.observe(section);
  else section.classList.add("is-visible");
});

const form = document.getElementById("quoteForm");
const formStatus = document.getElementById("formStatus");
const thankYou = document.getElementById("thankYou");
form.addEventListener("submit", async event => {
  event.preventDefault();
  formStatus.textContent = "";
  let valid = true;
  form.querySelectorAll("[required]").forEach(field => {
    const fieldValid = field.checkValidity();
    field.setAttribute("aria-invalid", String(!fieldValid));
    if (!fieldValid) valid = false;
  });
  if (!valid) {
    formStatus.textContent = "Please complete all required fields with a valid email address.";
    form.querySelector("[aria-invalid='true']").focus();
    return;
  }
  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = "Sending...";
  try {
    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(new FormData(form)).toString()
    });
    if (!response.ok) throw new Error("Submission failed");
    form.hidden = true;
    thankYou.hidden = false;
  } catch (error) {
    submitButton.disabled = false;
    submitButton.textContent = "Send enquiry";
    formStatus.textContent = "We could not send your enquiry. Please try again or contact us directly.";
  }
});

const galleryItems = [...document.querySelectorAll(".gallery-item")];
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
let lightboxIndex = 0;
let touchStartX = 0;

function showLightbox(index) {
  lightboxIndex = (index + galleryItems.length) % galleryItems.length;
  const item = galleryItems[lightboxIndex];
  lightboxImage.src = item.dataset.full;
  lightboxImage.onerror = () => { lightboxImage.onerror = null; lightboxImage.src = item.dataset.fallback; };
  lightboxImage.alt = item.querySelector("img").alt;
  lightboxCaption.textContent = item.dataset.caption;
  if (!lightbox.open) lightbox.showModal();
}
galleryItems.forEach((item, index) => item.addEventListener("click", () => showLightbox(index)));
document.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
document.querySelector(".lightbox-prev").addEventListener("click", () => showLightbox(lightboxIndex - 1));
document.querySelector(".lightbox-next").addEventListener("click", () => showLightbox(lightboxIndex + 1));
lightbox.addEventListener("keydown", event => {
  if (event.key === "ArrowLeft") showLightbox(lightboxIndex - 1);
  if (event.key === "ArrowRight") showLightbox(lightboxIndex + 1);
});
lightbox.addEventListener("touchstart", event => { touchStartX = event.changedTouches[0].screenX; }, { passive: true });
lightbox.addEventListener("touchend", event => {
  const distance = event.changedTouches[0].screenX - touchStartX;
  if (Math.abs(distance) > 50) showLightbox(lightboxIndex + (distance < 0 ? 1 : -1));
}, { passive: true });

const waNumber = "27696359724";
const waMessage = "Hi GM Smart Works, I'd like to get a quote for a structural steel project.";
const waFab = document.getElementById("waFab");
const waPopup = document.getElementById("waPopup");
const waClose = document.getElementById("waClose");
document.getElementById("waStart").href = "https://wa.me/" + waNumber + "?text=" + encodeURIComponent(waMessage);

function setWhatsApp(open) {
  waPopup.classList.toggle("open", open);
  waPopup.setAttribute("aria-hidden", String(!open));
  waFab.setAttribute("aria-expanded", String(open));
  waFab.setAttribute("aria-label", open ? "Close WhatsApp chat" : "Open WhatsApp chat");
  if (open) waClose.focus();
}
waFab.addEventListener("click", () => setWhatsApp(!waPopup.classList.contains("open")));
waClose.addEventListener("click", () => { setWhatsApp(false); waFab.focus(); });
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && waPopup.classList.contains("open")) {
    setWhatsApp(false);
    waFab.focus();
  }
});

const quoteSection = document.getElementById("quote");
if ("IntersectionObserver" in window && quoteSection && window.matchMedia("(max-width: 640px)").matches) {
  new IntersectionObserver(entries => {
    const quoteVisible = entries[0].isIntersecting;
    waFab.classList.toggle("is-hidden", quoteVisible);
    if (quoteVisible) setWhatsApp(false);
  }, { threshold: 0.15 }).observe(quoteSection);
}
