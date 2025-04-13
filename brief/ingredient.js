let searchIngredient = document.querySelector("#ingredient-input");
let searchIngredientButton = document.querySelector("#submit-ingredient");
const recipeContainer = document.querySelector("#recipe-container");

const getMealsByIngredient = (ingredient) => {
	const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
	try {
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				if (data.meals === null) {
					return alert(
						"Ingrédient invalide ou inexistant, écrivez en anglais"
					);
				}
				data.meals.forEach((recipe) => {
					//Création d'éléments
					newDiv = document.createElement("div");
					newImg = document.createElement("img");
					newDiv.textContent = recipe.strMeal;
					newDiv.id = recipe.idMeal;
					newDiv.classList.add("recipe-div");
					newImg.src = `${recipe.strMealThumb}/medium`;
					newDiv.appendChild(newImg);
					recipeContainer.appendChild(newDiv);

					//Fonction d'affichage des détails
					newDiv.addEventListener("click", async () => {
						getDetails(recipe.idMeal);
					});
				});
			});
	} catch (error) {
		console.error("Error", error.message);
	}
};

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
		alert("servor error " + error.message);
	}
});
