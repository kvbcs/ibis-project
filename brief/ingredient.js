let searchIngredient = document.querySelector("#ingredient-input");
let searchIngredientButton = document.querySelector("#submit-ingredient");
let body = document.querySelector("body");
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
		console.log("Success", result);

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
				console.log(getDetails(recipe.idMeal));
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
		const result = await res.json();
		console.log(result);
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
			alert("Entrez un nom d'ingrédient");
		} else {
			recipeContainer.innerHTML = "";
			getMealsByIngredient(searchIngredient.value);
		}
	} catch (error) {
		alert("servor error " + error);
	}
});
