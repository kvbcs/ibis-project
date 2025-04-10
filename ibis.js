let searchIngredient = document.querySelector("#ingredient-input");
let searchIngredientButton = document.querySelector("#submit-ingredient");
let body = document.querySelector("body");
let countrySelect = document.querySelector("#search-country");

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

async function getCategories() {
	const url = `https://www.themealdb.com/api/json/v1/1/list.php?c=list
`;

	try {
		const res = await fetch(url);
		console.log(res);
		if (!res.ok) {
			throw new Error(`Response status: ${res.status}`);
		}

		const result = await res.json();
		console.log("Success (categories) ", result);
		result.meals.forEach((country) => console.log(country.strCategory));
	} catch (error) {
		console.error("Error", error.message);
	}
}

async function getMealsByCategories(category) {
	const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;

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

async function getCountries() {
	const url = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`;

	try {
		const res = await fetch(url);
		console.log(res);
		if (!res.ok) {
			throw new Error(`Response status: ${res.status}`);
		}

		const result = await res.json();
		console.log("Success (countries)", result);

		result.meals.forEach((country) => {
			const newOption = document.createElement("option");
			newOption.value = country.strArea;
			newOption.textContent = country.strArea;
			countrySelect.appendChild(newOption);
		});
	} catch (error) {
		console.error("Error", error.message);
	}
}

async function getMealsByCountry(country) {
	const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}
`;

	try {
		const res = await fetch(url);
		console.log(res);
		if (!res.ok) {
			throw new Error(`Response status: ${res.status}`);
		}

		const result = await res.json();
		console.log("Success", result);
		result.forEach((meal) => {
			body.innerHTML = `<div>${meal.strMeal}</div>`;
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

getCategories();
getCountries();
