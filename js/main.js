// ========= UTILITIES =========
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const yearSpan = document.getElementById("year");

// ========= SMOOTH SCROLL FOR NAV LINKS =========
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;
    const section = document.querySelector(targetId);
    if (!section) return;

    event.preventDefault();
    const yOffset = -72;
    const rect = section.getBoundingClientRect();
    const offsetTop = rect.top + window.pageYOffset + yOffset;

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });

    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.getElementById("navbarSupportedContent");
    if (navbarToggler && navbarCollapse && navbarCollapse.classList.contains("show")) {
      navbarToggler.click();
    }
  });
});

// ========= CONTACT FORM VALIDATION =========
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = form.querySelector("#name");
    const emailInput = form.querySelector("#email");
    const messageInput = form.querySelector("#message");

    let isValid = true;

    [nameInput, emailInput, messageInput].forEach((input) => {
      input.classList.remove("is-invalid");
    });

    if (!nameInput.value.trim()) {
      nameInput.classList.add("is-invalid");
      isValid = false;
    }

    if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
      emailInput.classList.add("is-invalid");
      isValid = false;
    }

    if (!messageInput.value.trim()) {
      messageInput.classList.add("is-invalid");
      isValid = false;
    }

    if (!isValid) {
      if (formStatus) {
        formStatus.textContent = "Please fix the highlighted fields.";
        formStatus.style.color = "#fca5a5";
      }
      return;
    }

    if (formStatus) {
      formStatus.textContent = "Thank you! Your message has been validated. You can now wire this form to a backend or email service.";
      formStatus.style.color = "#4ade80";
    }

    form.reset();
  });
}

// ========= SCROLL REVEAL FOR TIMELINE & CARDS =========
function handleScrollReveal() {
  const elements = document.querySelectorAll(".fade-in");
  const triggerBottom = window.innerHeight * 0.85;

  elements.forEach((el) => {
    const boxTop = el.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", handleScrollReveal);
window.addEventListener("load", handleScrollReveal);

// ========= FOOTER YEAR =========
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
