function search(
  input,
  selectedAppliance,
  selectedUstensiles,
  selectedIngredients
) {
    // console.log('selectedIngredients',selectedIngredients)
  const result = [];
  if(input.length < 3 && selectedIngredients.length === 0 && selectedUstensiles.length === 0  &&  selectedAppliance === ""){
    return recipes;
  }
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    // Appliance tag
    if (selectedAppliance ==='' || selectedAppliance === recipe.appliance) {
      // Ustensiles tag
      if (
        selectedUstensiles.length === 0 ||
        selectedUstensiles.every((elt) => recipe.ustensils.includes(elt))
      ) {
        // Ingredients tag
        const ingredients = recipe.ingredients.map(ing => ing.ingredient)
        if (
            selectedIngredients.length === 0 ||
            selectedIngredients.every((elt) => ingredients.includes(elt))
        ) {
            // la recherche dans la barre principale
          if (
            recipe.name.includes(input) ||
            recipe.description.includes(input)
          ) {
            result.push(recipe);
          } else {
            for (let j = 0; j < recipe.ingredients.length; j++) {
              if (recipe.ingredients[j].ingredient.includes(input)) {
                result.push(recipe);
              }
            }
          }
        }
      }
    }
  }
  return result;
}

search('coco','Blender',['Verres'],['Jus de citron','Glaçons']);


// Visit this URL : https://jsben.ch/tFftk