import { recipes } from "../data/recipes.js"

// la fonction de recherche dans en parallèle entre tag et barre principale avec la méthode filter()
export function search(
	input,
	selectedAppliance,
	selectedUstensiles,
	selectedIngredients
) {
	// Check if input.length > 3
	if (
		input.length < 3 &&
    selectedAppliance.length === 0 && // repetition
    selectedUstensiles.length === 0 &&
    selectedIngredients.length === 0
	) {
		return recipes
	}
	return recipes.filter((recipe) => {
		const hasValidInput =
      recipe.name.includes(input) || recipe.description.includes(input)
		const hasValidAppliance =
      selectedAppliance.length === 0 || // voila ce quoi je parle
      selectedAppliance.every((elt) => recipe.appliance === elt)
		const hasValidUstensiles =
      selectedUstensiles.length === 0 ||
      selectedUstensiles.every((elt) => recipe.ustensils.includes(elt))
		const hasValidIngredients =
      selectedIngredients.length === 0 ||
      selectedIngredients.every((elt) =>
      	recipe.ingredients.map((ing) => ing.ingredient).includes(elt)
      )

		return (
			hasValidInput &&
      hasValidAppliance &&
      hasValidUstensiles &&
      hasValidIngredients
		)
	})
}

// la fonction qui stoque les appliances dans result
export function getAppliances(recipes, selectedAppliance) {
	const result = recipes
		.map((recipe) => recipe.appliance)
		.filter((appliance) => !selectedAppliance.includes(appliance))
	return [...new Set(result)]
}

// la fonction qui stoque les ustensils dans result
export function getUstensils(recipes, selectedUstensiles) {
	const ustensilsList = recipes
		.flatMap((recipe) => recipe.ustensils)
		.filter((ustensil) => !selectedUstensiles.includes(ustensil))

	const result = []
	ustensilsList.forEach((element) => {
		if (
			!result.map((elt) => elt.toUpperCase()).includes(element.toUpperCase())
		) {
			result.push(element)
		}
	})
	return result
}

// la fonction qui stoque les ingredients dans result

export function getIngredients(recipes, selectedIngredients) {
	const ingredientsList = recipes.flatMap((recipe) =>
		recipe.ingredients
			.map((ing) => ing.ingredient)
			.filter(
				(ing) =>
					!selectedIngredients
						.map((i) => i.toUpperCase())
						.includes(ing.toUpperCase())
			)
	)
	// Supprimer les doublons
	const result = []
	ingredientsList.forEach((element) => {
		if (
			!result.map((elt) => elt.toUpperCase()).includes(element.toUpperCase())
		) {
			result.push(element)
		}
	})
	return result
}

// fct de recherche par TAG dans les 3 dropdown
export function searchByTag(optionsList, input) {
	return optionsList.filter((option) =>
		option.toUpperCase().includes(input.toUpperCase())
	)
}
