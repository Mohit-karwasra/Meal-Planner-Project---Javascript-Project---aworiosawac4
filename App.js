const form = document.getElementById("userForm");
const breakfastCard = document.querySelector("#section-2 > div:nth-child(1) > .meal-card");
const lunchCard = document.querySelector("#section-2 > div:nth-child(2) > .meal-card");
const dinnerCard = document.querySelector("#section-2 > div:nth-child(3) > .meal-card");
const section3 = document.querySelector("#section-3");

form.addEventListener("submit", (event) => {
	event.preventDefault(); // Prevent form submission

	// Get user input values
	const height = parseFloat(document.querySelector("#input-row-1 input:nth-child(1)").value);
	const weight = parseFloat(document.querySelector("#input-row-1 input:nth-child(2)").value);
	const age = parseInt(document.querySelector("#input-row-1 input:nth-child(3)").value);
	const gender = document.querySelector("#gender").value;
	const activityLevel = getActivityLevelValue(document.querySelector("#input-row-2 select").value);

	function getActivityLevelValue(activityLevel) {
		switch (activityLevel) {
			case "low":
				return 1.2;
			case "medium":
				return 1.5;
			case "high":
				return 1.8;
			default:
				return 1.5; // Default to medium activity level if no match found
		}
	}

	// Calculate target calorie count
	let targetCalories;

	if (gender === "male") {
		targetCalories = Math.round(88.362 + 13.397 * weight + 4.799 * height - 5.677 * age);
	} else {
		targetCalories = Math.round(447.593 + 9.247 * weight + 3.098 * height - 4.33 * age);
	}

	targetCalories = Math.round(targetCalories * activityLevel);

	// Make API request to generate meals
	fetch(
		`https://api.spoonacular.com/mealplanner/generate?apiKey=7f1c356d65a84b2fa5b5901791ff99d5&timeFrame=day&targetCalories=${targetCalories}&diet=balanced&height=${height}&weight=${weight}&age=${age}&gender=${gender}&activityLevel=${activityLevel}`
	)
		.then((response) => response.json())
		.then((data) => {
			const breakfast = data.meals[0];
			const lunch = data.meals[1];
			const dinner = data.meals[2];

			// Update UI with generated meals
			updateMealCard(breakfastCard, breakfast, data.nutrients.calories);
			updateMealCard(lunchCard, lunch, data.nutrients.calories);
			updateMealCard(dinnerCard, dinner, data.nutrients.calories);
		})
		.catch((error) => console.log(error));
});

// Update the meal card with recipe details
function updateMealCard(card, meal, calories) {
	card.querySelector("h3").textContent = meal.title;
	card.querySelector("p").textContent = `Calories: ${calories}`;

	const recipeButton = card.querySelector(".getRecipe");

	// Make API request to get recipe details
	fetch(
		`https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=7f1c356d65a84b2fa5b5901791ff99d5`
	)
		.then((response) => response.json())
		.then((data) => {
			// Append image inside meal card of the dish
			card.querySelector("img").src = data.image;
			recipeButton.addEventListener("click", () => {
				section3.style.visibility = "visible";
				section3.textContent = "";
				const ingredients = data.extendedIngredients.map((ingredient) => ingredient.original);
				const steps = data.analyzedInstructions[0].steps.map((step) => step.step);
				const utensils = data.analyzedInstructions[0].steps[0].equipment.map(
					(equipment) => equipment.name
				);

				// Append ingredients, steps, and utensils in the UI

				const ingredientsList = document.createElement("ul");
				ingredients.forEach((ingredient) => {
					const listItem = document.createElement("li");
					listItem.textContent = ingredient;
					ingredientsList.appendChild(listItem);
				});

				const stepsList = document.createElement("ol");
				steps.forEach((step) => {
					const listItem = document.createElement("li");
					listItem.textContent = step;
					stepsList.appendChild(listItem);
				});

				const utensilsList = document.createElement("ul");
				utensils.forEach((utensil) => {
					const listItem = document.createElement("li");
					listItem.textContent = utensil;
					utensilsList.appendChild(listItem);
				});

				const recipeDetails = document.createElement("div");
				recipeDetails.appendChild(document.createElement("h1")).textContent = meal.title;
				recipeDetails.appendChild(document.createElement("h2")).textContent = "Ingredients";
				recipeDetails.appendChild(ingredientsList);
				recipeDetails.appendChild(document.createElement("h2")).textContent = "Steps";
				recipeDetails.appendChild(stepsList);
				recipeDetails.appendChild(document.createElement("h2")).textContent = "Utensils";
				recipeDetails.appendChild(utensilsList);

				const hideShowBtn = document.createElement("button");
				hideShowBtn.className = "hide-recipe";
				hideShowBtn.textContent = "Hide Recipe";
				recipeDetails.appendChild(hideShowBtn);

				section3.appendChild(recipeDetails);

				hideShowBtn.addEventListener("click", () => {
					section3.style.visibility = "hidden";
				});
			});
		})
		.catch((error) => console.log(error));
}
