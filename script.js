const verdictStatus = document.querySelector(".verdict-status");
const verdictButtons = document.querySelectorAll("[data-verdict]");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox img");
const lightboxClose = document.querySelector(".lightbox button");
const evidenceButtons = document.querySelectorAll(".evidence-item button");

const sanctions = {
  severe: [
    "Current sanction: one round, a formal explanation, and advance table-booking duties.",
    "Current sanction: two rounds and a written apology in the group chat.",
    "Current sanction: lifetime obligation to share pub coordinates before kick-off."
  ],
  mercy: [
    "Current sanction: one round and a formal explanation.",
    "Current sanction: one pint, suspended pending improved behaviour.",
    "Current sanction: official warning, with snacks accepted as mitigation."
  ]
};

let severityIndex = 0;
let mercyIndex = 0;

verdictButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const type = button.dataset.verdict;

    if (type === "severe") {
      verdictStatus.textContent = sanctions.severe[severityIndex % sanctions.severe.length];
      severityIndex += 1;
      return;
    }

    verdictStatus.textContent = sanctions.mercy[mercyIndex % sanctions.mercy.length];
    mercyIndex += 1;
  });
});

evidenceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");
    lightboxImage.src = button.dataset.image;
    lightboxImage.alt = image.alt;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    lightboxClose.focus();
  });
});

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lightbox.hidden) {
    closeLightbox();
  }
});
