const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalImages = document.getElementById("modal-images");
const modalDescription = document.getElementById("modal-description");

// Build the squares for one row
function buildGrid(gridId, list) {
  const grid = document.getElementById(gridId);

  list.forEach(function (project) {
    const card = document.createElement("button");
    card.className = "card";

    const img = document.createElement("img");
    img.src = project.thumbnail;
    img.alt = project.title;

    const title = document.createElement("span");
    title.textContent = project.title;

    card.appendChild(img);
    card.appendChild(title);
    card.addEventListener("click", function () {
      openModal(project);
    });

    grid.appendChild(card);
  });
}

function openModal(project) {
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;

  modalImages.innerHTML = "";
  project.images.forEach(function (src) {
    const img = document.createElement("img");
    img.src = src;
    img.alt = project.title;
    modalImages.appendChild(img);
  });

  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
}

document.getElementById("modal-close").addEventListener("click", closeModal);

// Close when clicking the dark area outside the pop-up
modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !modal.hidden) {
    closeModal();
  }
});

// Tabs: show only the clicked section
const tabs = document.querySelectorAll(".tab");

tabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    tabs.forEach(function (other) {
      other.classList.toggle("active", other === tab);
      document.getElementById(other.dataset.section).hidden = other !== tab;
    });
  });
});

buildGrid("personal-projects", projects.personal);
buildGrid("team-product", projects.teamProduct);
buildGrid("my-contribution", projects.myContribution);
