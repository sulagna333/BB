// DARK MODE TOGGLE
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Start with light mode, but remember previous choice if you want later
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  const isDark = body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
});

// PLANT SEARCH + HIDDEN MONEY PLANT
const searchInput = document.getElementById("plantSearch");
const searchBtn = document.getElementById("searchBtn");
const cards = document.querySelectorAll(".plant-card");
const moneyPlantCard = document.getElementById("moneyPlantCard");
const searchMessage = document.getElementById("searchMessage");

function performSearch() {
  const query = searchInput.value.trim().toLowerCase();
  let anyVisible = false;

  cards.forEach(card => {
    const name = card.dataset.name.toLowerCase();

    if (card.classList.contains("secret")) {
      // Hide secret card by default
      card.classList.add("hidden");
      card.classList.remove("found");

      if (query.includes("money plant") || query === "moneyplant") {
        card.classList.remove("hidden");
        card.classList.add("found");
        anyVisible = true;
        searchMessage.textContent = "You discovered the hidden Money Plant!";
      }
      return;
    }

    if (!query || name.includes(query)) {
      card.classList.remove("hidden");
      anyVisible = true;
    } else {
      card.classList.add("hidden");
    }
  });

  if (!query) {
    searchMessage.textContent = "";
  } else if (!anyVisible && !query.includes("money plant")) {
    searchMessage.textContent = "No plants matched your search. Try another name.";
  } else if (anyVisible && !query.includes("money plant")) {
    searchMessage.textContent = "";
  }
}

searchBtn.addEventListener("click", performSearch);
searchInput.addEventListener("keyup", event => {
  if (event.key === "Enter") {
    performSearch();
  }
});
