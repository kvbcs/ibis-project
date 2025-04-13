const getDetails = (id) => {
	const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
	try {
		fetch(url)
			.then((res) => res.json())
			.then((data) =>
				data.meals.forEach((detail) => {
					existingDiv = document.getElementById(id);
					existingDiv.innerHTML = "";

					newText = document.createElement("p");

					newText.classList.add("instructions");
					newText.textContent = detail.strInstructions;

					const ingredientsList = document.createElement("ul");
					const measuresList = document.createElement("li");

					ingredientsList.classList.add("ingredients-list");
					measuresList.classList.add("ingredients-list");

					//Boucle pour parcourir les ingrédients et mesures
					for (let i = 1; i <= 20; i++) {
						const measure = detail[`strMeasure${i}`];
						const ingredient = detail[`strIngredient${i}`];

						//Trie des champs null et vides
						if (ingredient && ingredient.trim() !== "") {
							const li = document.createElement("li");
							li.textContent = ingredient;

							//Affichage supplémentaire au survol
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
									li.removeChild(measureText);
								});
							});
							ingredientsList.appendChild(li);
						}
					}
					existingDiv.appendChild(newText);
					existingDiv.appendChild(ingredientsList);
				})
			);
	} catch (error) {
		alert("Error : ", error.message);
	}
};
