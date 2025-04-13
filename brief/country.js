let countrySelect = document.querySelector("#search-country");

async function getCountries() {
	const url = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`;

	try {
		const res = await fetch(url);

		//Si erreur, affichage du statut
		if (!res.ok) {
			throw new Error(`Response status: ${res.status}`);
		}

		const data = await res.json();

		data.meals.forEach((country) => {
			const newOption = document.createElement("option");
			newOption.value = country.strArea;
			newOption.textContent = country.strArea;
			countrySelect.appendChild(newOption);
		});
	} catch (error) {
		console.error("Error", error.message);
	}
}

getCountries();

const getMealsByCountry = (country) => {
	const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}
`;

	try {
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				data.meals.forEach((recipe) => {
					const newDiv = document.createElement("div");
					const newImg = document.createElement("img");
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
			});
	} catch (error) {
		console.error("Error", error.message);
	}
};

//Fonction qui se joue onchange du select
const getCountryMeals = () => {
	recipeContainer.innerHTML = "";
	getMealsByCountry(countrySelect.value);
};
