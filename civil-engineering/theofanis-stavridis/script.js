/* ============================= */
/* Mobile menu                   */
/* ============================= */

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  mainNav.id = mainNav.id || "main-nav";
  menuToggle.setAttribute("aria-controls", mainNav.id);
  menuToggle.setAttribute("aria-expanded", "false");

  function openMenu() {
    mainNav.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Κλείσιμο μενού");
  }

  function closeMenu() {
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Άνοιγμα μενού");
  }

  menuToggle.addEventListener("click", function (event) {
    event.stopPropagation();
    if (mainNav.classList.contains("is-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Κλείνει όταν πατάς κάπου έξω από το μενού
  document.addEventListener("click", function (event) {
    if (!menuToggle.contains(event.target) && !mainNav.contains(event.target)) {
      closeMenu();
    }
  });

  // Κλείνει όταν πατάς κάποιο link του μενού
  mainNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  // Κλείνει με το πλήκτρο Esc
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && mainNav.classList.contains("is-open")) {
      closeMenu();
      menuToggle.focus();
    }
  });
}

/* ============================= */
/* Contact form (Formspree)      */
/* ============================= */

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const formNote = contactForm.querySelector(".form-note");
  const defaultButtonText = submitButton ? submitButton.textContent : "";

  function showNote(message, state) {
    if (!formNote) return;
    formNote.textContent = message;
    formNote.classList.remove("is-success", "is-error");
    if (state) formNote.classList.add(state);
  }

  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Αποστολή...";
    }

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        contactForm.reset();
        showNote(
          "Ευχαριστούμε! Το μήνυμά σας στάλθηκε και θα επικοινωνήσουμε σύντομα.",
          "is-success",
        );
      } else {
        showNote(
          "Κάτι πήγε στραβά. Δοκιμάστε ξανά ή καλέστε μας στο τηλέφωνο.",
          "is-error",
        );
      }
    } catch (error) {
      showNote("Δεν υπάρχει σύνδεση. Δοκιμάστε ξανά σε λίγο.", "is-error");
    }

    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = defaultButtonText;
    }
  });
}
