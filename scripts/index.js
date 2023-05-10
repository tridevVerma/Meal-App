{
  // IIFE
  (function () {
    const mealsContainer = document.querySelector(
      ".meals-display-container > .meals-container"
    );

    // If not searched anything
    if (mealsData.length == 0) {
      mealsContainer.style.display = "block";
      mealsContainer.innerHTML = `<div class="no-content"><h1>Search Meals...</h1></div>`;
    }

    // On change of input box
    const searchInput = document.querySelector("#search-meal");
    searchInput.focus();
    searchInput.addEventListener("input", (e) =>
      searchByName(e, e.target.value)
    );

    // On hitting enter or submitting form
    const searchForm = document.querySelector(".search-meal-form");
    searchForm.addEventListener("submit", (e) =>
      handleSubmit(e, searchInput.value)
    );
  })();

  // handle search form submission
  const handleSubmit = (e, query) => {
    e.preventDefault();
    searchByName(e, query);
  };

  // Get data from API corresponding to searched query
  const searchByName = async (e, query) => {
    try {
      if (query.length > 0) {
        const response = await fetch(API_URL + `search.php?s=${query}`);
        const data = await response.json();
        mealsData = data.meals; // array from script.js
      } else {
        mealsData = [];
      }
      populateMeals(); // populate meals as we get results from API
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const populateMeals = () => {
    const mealsContainer = document.querySelector(
      ".meals-display-container > .meals-container"
    );
    let meals = "";
    if (mealsData && mealsData.length > 0) {
      // If meals found
      mealsData.forEach((meal) => {
        // extract tags of each meal
        let tags = [];
        if (meal.strTags) {
          tags = meal.strTags.split(",");
          tags = tags.slice(0, 3);
        }

        let tagsHTML = "";
        tags.forEach((tag) => {
          tagsHTML += `<span class="tags">${tag}</span>`;
        });

        if (tagsHTML === "") {
          tagsHTML += `<span class="no-tags">No Tags</span>`;
        }

        // Count no of ingredients required for each meal
        let noOfIngredients = 0;
        let pattern = /^strIngredient\d{1,2}/;
        for (let prop in meal) {
          if (prop.match(pattern) && meal[prop]) {
            noOfIngredients++;
          }
        }

        // create card for each meal with appropriate meal-data
        meals += `<div class="meal-card">
          <div class="meal-image">
            <img
              src=${meal.strMealThumb}
              alt="recipe"
            />
          </div>
          <div class="meal-content">
          <div class="meal-heading"><h1>${meal.strMeal}</h1><button id="${meal.idMeal}" class="add-to-favorite meal-${meal.idMeal}"><i class="fa-regular fa-heart"></i></button></div>
            <hr/>
            <div class="tags-container">${tagsHTML}</div>
            <p>Category: <span>${meal.strCategory}</span></p>
            <p>Origin: <span>${meal.strArea}</span></p>
            <p>No of Ingredients: <span>${noOfIngredients}</span></p>
          </div>
          <a href="#" id="${meal.idMeal}" class="more-about-meal-btn">Show More</a>
        </div>`;
      });

      // Add found meals to home page
      mealsContainer.style.display = "grid";
      mealsContainer.innerHTML = meals;

      // Attach listeners to each favorite btn
      const toggleFavoriteBtns = document.querySelectorAll(".add-to-favorite");
      toggleFavoriteBtns.forEach((btn) => {
        btn.addEventListener("click", () => toggleFavoriteMeals(btn));
      });

      // Attach listener to each show more btn
      const detailsBtns = document.querySelectorAll(".more-about-meal-btn");
      detailsBtns.forEach((link) => {
        link.addEventListener("click", (e) => showDetails(e, link));
      });
    } else {
      mealsContainer.style.display = "block";
      mealsContainer.innerHTML = `<div class="no-content"><h1>Search Meals...</h1></div>`;
    }
  };
}
