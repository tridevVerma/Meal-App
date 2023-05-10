{
  (function () {
    let meals = "";

    // Get favorite meals list from localstorage
    const favoriteMealsList = JSON.parse(
      window.localStorage.getItem("favoriteMealsList")
    );

    favoriteMealsList.forEach((meal) => {
      // extract tags of each meal
      let tags = [];
      if (meal.strTags) {
        tags = meal.strTags.split(",");
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

      // create card for each favorite meal with appropriate meal-data
      meals += `<div class="meal-card">
              <div class="meal-image">
                <img
                  src=${meal.strMealThumb}
                  alt="recipe"
                />
              </div>
              <div class="meal-content">
              <div class="meal-heading"><h1>${meal.strMeal}</h1><button id="${meal.idMeal}" class="add-to-favorite selected meal-${meal.idMeal}"><i class="fa-solid fa-heart"></i></button></div>
                <hr/>
                <div class="tags-container">${tagsHTML}</div>
                <p>Category: <span>${meal.strCategory}</span></p>
                <p>Origin: <span>${meal.strArea}</span></p>
                <p>No of Ingredients: <span>${noOfIngredients}</span></p>
              </div>
              <a href="#" id="${meal.idMeal}" class="more-about-meal-btn">Show More</a>
            </div>`;
    });

    const favoriteMealsContainer = document.querySelector(
      ".favorite-meals-container > .meals-container"
    );

    if (favoriteMealsList.length == 0) {
      // if favorite meals list is empty
      favoriteMealsContainer.style.display = "block";
      favoriteMealsContainer.innerHTML = `<div class="no-content"><h1>Add meals to your favorites...</h1></div>`;
    } else {
      // show favorite meals on favorite Page
      favoriteMealsContainer.style.display = "grid";
      favoriteMealsContainer.innerHTML = meals;
    }

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
  })();
}
