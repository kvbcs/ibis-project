async function getCategories() {
	const url = `https://www.themealdb.com/api/json/v1/1/list.php?c=list
`;

	try {
		const res = await fetch(url);
		if (!res.ok) {
			throw new Error(`Response status: ${res.status}`);
		}

		const result = await res.json();
		console.log("Success (categories) ", result);
		result.meals.forEach((category) => {
			const newOption = document.createElement("option");
			newOption.value = category.strCategory;
			newOption.textContent = category.strCategory;
			categorySelect.appendChild(newOption);
		});
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

getCategories();
