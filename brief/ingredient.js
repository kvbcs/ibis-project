let searchIngredient = document.querySelector("#ingredient-input");
let searchIngredientButton = document.querySelector("#submit-ingredient");
let body = document.querySelector("body");
let countrySelect = document.querySelector("#search-country");
let categorySelect = document.querySelector("#search-category");
const recipeContainer = document.querySelector("#recipe-container");

async function getMealsByIngredient(ingredient) {
	const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;

	try {
		const res = await fetch(url);
		console.log(res);
		if (!res.ok) {
			throw new Error(`Response status: ${res.status}`);
		}

		const result = await res.json();
		console.log("Success", result);

		result.meals.forEach((recipe) => {
			const newDiv = document.createElement("div");
			const newImg = document.createElement("img");
			newDiv.textContent = recipe.strMeal;
			newDiv.id = recipe.idMeal;
			newDiv.classList.add("recipe-div");
			newImg.src = `${recipe.strMealThumb}/preview`;
			newDiv.appendChild(newImg);
			recipeContainer.appendChild(newDiv);
		});
	} catch (error) {
		console.error("Error", error.message);
	}
}

searchIngredientButton.addEventListener("click", async () => {
	try {
		if (
			searchIngredient.value === "" ||
			searchIngredient.value === null ||
			searchIngredient.value === undefined
		) {
			alert("Entrez un nom d'ingrédient");
		} else {
			getMealsByIngredient(searchIngredient.value);
		}
	} catch (error) {
		alert("servor error " + error);
	}
});
