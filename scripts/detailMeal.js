{
  // IIFE
  (async function () {
    // Get meal id from url params
    const urlParams = new URLSearchParams(window.location.search);
    const mealId = urlParams.get("id");

    // Link to get specific meal data
    const mealLink = `${API_URL}/lookup.php?i=${mealId}`;

    try {
      // fetch data
      const response = await fetch(mealLink);
      const mealsData = await response.json();

      if (mealsData.meals && mealsData.meals.length === 1) {
        // If meal found
        details = mealsData.meals[0];

        // extract tags for each meal
        let tags = [];
        if (details.strTags) {
          tags = details.strTags.split(",");
        }

        let tagsHTML = "";
        tags.forEach((tag) => {
          tagsHTML += `<span class="tags">${tag}</span>`;
        });

        // generate list of ingredients for object keys
        let ingredientsList = document.createElement("ul");
        ingredientsList.classList.add("ingredients-list");

        let pattern = /^strIngredient\d{1,2}/;
        for (let prop in details) {
          if (prop.match(pattern) && details[prop]) {
            // if ingredient found add it to ingredients list
            let num = prop.substring(13);

            const newIngredient = document.createElement("li");
            newIngredient.innerHTML = `<span>${details[prop]}</span> - ${
              details["strMeasure" + num]
            }`;

            ingredientsList.append(newIngredient);
          }
        }

        // Add detailed meal section to container
        let detailsHTML = `<div class="detail-img">
              <img src="${details.strMealThumb}" alt="${details.strMeal}" />
            </div>
            <div class="detail-heading">
              <h1>${details.strMeal}</h1>
              <a href="${details.strYoutube}">Youtube</a>
            </div>
            <div class="tags-container">${tagsHTML}</div>
            <div class="ingredients-container">
              <h1>Ingredients Required</h1>
              ${ingredientsList.outerHTML}
            </div>
            <div class="instructions-container">
              <h1>Instructions</h1>
              <p>${details.strInstructions}</p>
            </div>`;

        const detailsContainer = document.querySelector(".details-container");
        detailsContainer.innerHTML = detailsHTML;
      } else {
        // if meal not found
        throw new Error("Meal not found");
      }
    } catch (err) {
      console.log("Error:", err);
    }
  })();
}
