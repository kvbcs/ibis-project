let searchIngredient = document.querySelector("#ingredient-input");
let searchIngredientButton = document.querySelector("#submit-ingredient");
let body = document.querySelector("body");
let countrySelect = document.querySelector("#search-country");
let categorySelect = document.querySelector("#search-category");

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


