function search(
    input,
    selectedAppliance,
    selectedUstensiles,
    selectedIngredients
  ) {
    return recipes.filter((recipe) => {
      const hasValidInput =
        recipe.name.includes(input) || recipe.description.includes(input);
      const hasValidAppliance =
        selectedAppliance === "" || selectedAppliance === recipe.appliance;
      const hasValidUstensiles =
        selectedUstensiles.length === 0 ||
        selectedUstensiles.every((elt) => recipe.ustensils.includes(elt));
      const hasValidIngredients =
        selectedIngredients.length === 0 ||
        selectedIngredients.every((elt) =>
          recipe.ingredients.map((ing) => ing.ingredient).includes(elt)
        );
  
      return (
        hasValidInput &&
        hasValidAppliance &&
        hasValidUstensiles &&
        hasValidIngredients
      );
    });
  }

search('coco','Blender',['Verres'],['Jus de citron','Glaçons']);


// Visit this URL : https://jsben.ch/tFftk