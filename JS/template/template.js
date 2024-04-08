import { recipes } from "../data/recipes.js"

// la fonction de recherche  en parallèle entre tag et barre principale avec la boucle for
export function search(
	input,
	selectedAppliance,
	selectedUstensiles,
	selectedIngredients
) {
	// console.log('selectedIngredients',selectedIngredients)
	const result = []
	if (
		input.length < 3 &&
    selectedIngredients.length === 0 &&
    selectedUstensiles.length === 0 &&
    selectedAppliance === ""
	) {
		return recipes
	}
	for (let i = 0; i < recipes.length; i++) {
		const recipe = recipes[i]
		// Appliance tag
		if (selectedAppliance === "" || selectedAppliance === recipe.appliance) {
			// Ustensiles tag
			if (
				selectedUstensiles.length === 0 ||
        selectedUstensiles.every((elt) => recipe.ustensils.includes(elt))
			) {
				// Ingredients tag
				const ingredients = recipe.ingredients.map((ing) => ing.ingredient)
				if (
					selectedIngredients.length === 0 ||
          selectedIngredients.every((elt) => ingredients.includes(elt))
				) {
					// la recherche dans la barre principale
					if (
						recipe.name.toUpperCase().includes(input.toUpperCase()) ||
            recipe.description.toUpperCase().includes(input.toUpperCase())
					) {
						result.push(recipe)
					} else {
						for (let j = 0; j < recipe.ingredients.length; j++) {
							if (
								recipe.ingredients[j].ingredient
									.toUpperCase()
									.includes(input.toUpperCase())
							) {
								result.push(recipe)
							}
						}
					}
				}
			}
		}
	}
	return result
}

// la fonction qui stoque les appliances dans result
export function getAppliances(recipes, selectedAppliance) {
	const result = []
	for (let i = 0; i < recipes.length; i++) {
		const recipe = recipes[i]
		if (
		// si le tableau result ne contient pas DEJA l'appareil ET cette appareil n'est pas DEJA selectioné
			!result.includes(recipe.appliance) &&
      selectedAppliance !== recipe.appliance
		) {
			result.push(recipe.appliance)
		}
	}
	return result
}

// la fonction qui stoque les ustensils dans result
export function getUstensils(recipes, selectedUstensiles) {
	const result = []
	for (let i = 0; i < recipes.length; i++) {
		const recipe = recipes[i]
		for (let j = 0; j < recipe.ustensils.length; j++) {
			const ustensil = recipe.ustensils[j]
			if (
			// si le tableau result ne contient pas DEJA l'ustensil ET cet ustensil n'est pas DEJA selectioné
				!result.includes(ustensil) &&
        !selectedUstensiles.includes(ustensil)
			) {
				result.push(recipe.ustensils[j])
			}
		}
	}
	return result
}

// la fonction qui stoque les ingredients dans result
export function getIngredients(recipes, selectedIngredients) {
	const result = []
	for (let i = 0; i < recipes.length; i++) {
		const recipe = recipes[i]
		for (let j = 0; j < recipe.ingredients.length; j++) {
			const { ingredient } = recipe.ingredients[j]
			if (
			// si le tableau result ne contient pas DEJA l'ingredient ET cet ungredient n'est pas DEJA selectioné
				!result.includes(ingredient) &&
        !selectedIngredients.includes(ingredient)
			) {
				result.push(ingredient)
			}
		}
	}
	return result
}

//   fct de recherche par TAG dans le dropdown ingredients
export function ingredientSearchByTag(ingredientsList, input) {
	const result = []
	for (let i = 0; i < ingredientsList.length; i++) {
		if (ingredientsList[i].includes(input)) {
			result.push(ingredientsList[i])
		}
	}
	return result
}

// fct de recherche par TAG dans les appliances

export function applianceSearchByTag(optionsList, input) {
	const result = []
	for (let i = 0; i < optionsList.length; i++) {
		if (optionsList[i].includes(input)) {
			result.push(optionsList[i])
		}
	}
	return result
}
// fct de recherche par TAG dans le dropdown ustensils

export function ustensileSearchByTag(ustensilsList, input) {
	const result = []
	for (let i = 0; i < ustensilsList.length; i++) {
		if (ustensilsList[i].includes(input)) {
			result.push(ustensilsList[i])
		}
	}
	return result
}
