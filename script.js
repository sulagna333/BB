// Basic plant search filter
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("plantSearch");
  const cards = document.querySelectorAll(".plant-card");
  const noResults = document.getElementById("noResults");

  if (!searchInput || !cards.length) return;

  const filterPlants = () => {
    const term = searchInput.value.trim().toLowerCase();
    let anyVisible = false;

    cards.forEach((card) => {
      const name = card.getAttribute("data-name")?.toLowerCase() || "";
      const tags = card.getAttribute("data-tags")?.toLowerCase() || "";

      const match = !term || name.includes(term) || tags.includes(term);
      card.style.display = match ? "" : "none";
      if (match) anyVisible = true;
    });

    if (noResults) {
      noResults.classList.toggle("hidden", anyVisible);
    }
  };

  searchInput.addEventListener("input", filterPlants);

  // small UX: click chips to fill search
  document.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      searchInput.value = chip.textContent.trim();
      searchInput.focus();
      filterPlants();
    });
  });
});
