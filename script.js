"use strict";

const menuButton = document.querySelector(".hamburger");
const siteMenu = document.querySelector(".menu");

if (menuButton && siteMenu) {
  const setMenuOpen = (isOpen) => {
    siteMenu.classList.toggle("acik", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Menüyü kapat" : "Menüyü aç");
  };

  menuButton.addEventListener("click", () => {
    setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
  });

  siteMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.addEventListener("click", (event) => {
    if (!siteMenu.contains(event.target) && !menuButton.contains(event.target)) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      menuButton.focus();
    }
  });

  window.matchMedia("(min-width: 641px)").addEventListener("change", () => setMenuOpen(false));
}

const contactForm = document.querySelector("#iletisim-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      return;
    }

    const name = document.querySelector("#ad").value.trim();
    const email = document.querySelector("#eposta").value.trim();
    const subject = document.querySelector("#konu").value.trim() || "Kapadokya turu hakkında bilgi";
    const message = document.querySelector("#mesaj").value.trim();
    const body = `Ad Soyad: ${name}\nE-posta: ${email}\n\n${message}`;
    const status = document.querySelector("#form-mesaj");

    status.textContent = "E-posta uygulamanız açılıyor. Mesajı göndermek için e-postanızı onaylayın.";
    status.hidden = false;
    window.location.href = `mailto:kapadokyatur@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
