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

getCountries();
