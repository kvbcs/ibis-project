let categorySelect = document.querySelector("#search-category");

async function getCategories() {
	const url = `https://www.themealdb.com/api/json/v1/1/list.php?c=list`;

	try {
		const res = await fetch(url);

		//Si erreur, affichage du statut
		if (!res.ok) {
			throw new Error(`Response status: ${res.status}`);
		}

		const data = await res.json();
		data.meals.forEach((category) => {
			//Création d'éléments

			const newOption = document.createElement("option");
			newOption.value = category.strCategory;
			newOption.textContent = category.strCategory;
			categorySelect.appendChild(newOption);
		});
	} catch (error) {
		console.error("Error", error.message);
	}
}

const getMealsByCategories = (category) => {
	const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;

	try {
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				data.meals.forEach((recipe) => {
					//Création d'éléments

					const newDiv = document.createElement("div");
					const newImg = document.createElement("img");
					newDiv.textContent = recipe.strMeal;
					newDiv.id = recipe.idMeal;
					newDiv.classList.add("recipe-div");
					newImg.src = `${recipe.strMealThumb}/medium`;
					newDiv.appendChild(newImg);
					recipeContainer.appendChild(newDiv);

					//Fonction d'affichage de détails
					newDiv.addEventListener("click", () => {
						getDetails(recipe.idMeal);
					});
				});
			});
	} catch (error) {
		console.error("Error", error.message);
	}
};

getCategories();

//Fonction qui joue onchange du select
const getCategoryMeals = () => {
	recipeContainer.innerHTML = "";
	getMealsByCategories(categorySelect.value);
};
