let searchIngredient = document.querySelector("#ingredient-input");
let searchIngredientButton = document.querySelector("#submit-ingredient");
let categorySelect = document.querySelector("#search-category");
const recipeContainer = document.querySelector("#recipe-container");

async function getMealsByIngredient(ingredient) {
	const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;

	try {
		const res = await fetch(url);
		if (!res.ok) {
			throw new Error(`Response status: ${res.status}`);
		}

		const result = await res.json();

		result.meals.forEach((recipe) => {
			newDiv = document.createElement("div");
			newImg = document.createElement("img");
			newDiv.textContent = recipe.strMeal;
			newDiv.id = recipe.idMeal;
			newDiv.classList.add("recipe-div");
			newImg.src = `${recipe.strMealThumb}/medium`;
			newDiv.appendChild(newImg);
			recipeContainer.appendChild(newDiv);
			newDiv.addEventListener("click", () => {
				getDetails(recipe.idMeal);
			});
		});
	} catch (error) {
		console.error("Error", error.message);
	}
}

async function getDetails(id) {
	const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
	try {
		const res = await fetch(url);
		if (!res.ok) {
			throw new Error(`Response status: ${res.status}`);
		}
		const result = await res.json();

		result.meals.forEach((detail) => {
			existingDiv = document.getElementById(id);
			newText = document.createElement("p");
			newText.classList.add("instructions");
			newText.textContent = detail.strInstructions;

			const ingredientsList = document.createElement("ul");
			const measuresList = document.createElement("ul");

			ingredientsList.classList.add("ingredients-list");
			measuresList.classList.add("ingredients-list");

			for (let i = 1; i <= 20; i++) {
				const measure = detail[`strMeasure${i}`];

				const ingredient = detail[`strIngredient${i}`];
				if (ingredient && ingredient.trim() !== "") {
					const li = document.createElement("li");
					li.textContent = ingredient;
					li.title = measure;
					li.addEventListener("mouseenter", () => {
						ingredientImg = document.createElement("img");
						measureText = document.createElement("p");
						measureText.innerHTML = measure;
						li.appendChild(measureText);

						ingredientImg.style.height = "100px";
						ingredientImg.src = `https://www.themealdb.com/images/ingredients/${ingredient}.png`;
						li.appendChild(ingredientImg);

						li.addEventListener("mouseleave", () => {
							li.removeChild(ingredientImg);
						});
					});

					ingredientsList.appendChild(li);
				}
			}
			existingDiv.appendChild(newText);

			existingDiv.appendChild(ingredientsList);
		});
	} catch (error) {
		alert(error);
	}
}

searchIngredientButton.addEventListener("click", async () => {
	try {
		if (
			searchIngredient.value === "" ||
			searchIngredient.value === null ||
			searchIngredient.value === undefined
		) {
			alert("Entrez un nom d'ingrédient en anglais");
		} else {
			recipeContainer.innerHTML = "";
			getMealsByIngredient(searchIngredient.value);
		}
	} catch (error) {
		alert("servor error " + error);
	}
});
