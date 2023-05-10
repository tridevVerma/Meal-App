const API_URL = "https://www.themealdb.com/api/json/v1/1/";
let favoriteMealsList = [];
let mealsData = [];

// Add and Remove favorite meals from list of favorite meals
const toggleFavoriteMeals = (refBtn) => {
  // if localstorage has favorite meals list
  let list = JSON.parse(window.localStorage.getItem("favoriteMealsList"));
  if (list) {
    favoriteMealsList = list;
  }

  const ref = document.querySelectorAll(`.meal-${refBtn.id}`);

  // toggle class "selected" on click
  ref.forEach((btn) => {
    if (btn.classList.contains("selected")) {
      // already selected --> remove selected and remove that meal from favorite list
      btn.innerHTML = `<i class="fa-regular fa-heart"></i>`;
      btn.classList.remove("selected");
      favoriteMealsList = favoriteMealsList.filter(
        (meal) => meal.idMeal !== btn.id
      );
      window.location.replace(`./favoritePage.html`);
    } else {
      // not selected --> add selected and add that meal to favorite list
      btn.innerHTML = `<i class="fa-solid fa-heart"></i>`;
      btn.classList.add("selected");
      const index = mealsData.findIndex((meal) => meal.idMeal === btn.id);
      favoriteMealsList = [...favoriteMealsList, mealsData[index]];
    }
  });

  // Add new favorite meals list to localstorage
  window.localStorage.setItem(
    "favoriteMealsList",
    JSON.stringify(favoriteMealsList)
  );
};

// View home page
const homeBtn = document.querySelector(".home-btn");
homeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.replace(`./index.html`);
});

// View favorite meals page
const favoritePageBtn = document.querySelector(".favorite-meals-page");
favoritePageBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.replace(`./favoritePage.html`);
});

// View details page
const showDetails = (e, link) => {
  e.preventDefault();
  window.location.replace(`./detailsPage.html?id=${link.id}`);
};

// search new meal from navbar
if (
  window.location.pathname.substring(location.pathname.length - 10) !==
  "index.html"
) {
  const searchInput = document.querySelector("#search-meal");
  searchInput.addEventListener("click", () => {
    window.location.replace(`./index.html`);
  });
}
