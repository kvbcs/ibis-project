let countrySelect = document.querySelector("#search-country");

async function getCountries() {
	const url = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`;

	try {
		const res = await fetch(url);
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

getCountries();

const getCountryMeals = () => {
	recipeContainer.innerHTML = "";
	getMealsByCountry(countrySelect.value);
};
