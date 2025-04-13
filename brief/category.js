async function getCategories() {
	const url = `https://www.themealdb.com/api/json/v1/1/list.php?c=list`;

	try {
		const res = await fetch(url);
		if (!res.ok) {
			throw new Error(`Response status: ${res.status}`);
		}

		const data = await res.json();
		data.meals.forEach((category) => {
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
				console.log("Success", data);
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

getCategories();

const getCategoryMeals = () => {
	recipeContainer.innerHTML = "";
	getMealsByCategories(categorySelect.value);
};
