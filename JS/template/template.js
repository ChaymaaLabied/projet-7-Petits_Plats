import { recipes } from "../data/recipes.js"


// la fonction de recherche dans la barre principale avec la boucle for 
export function search(recipes, input,selectedAppliances) {
    const result = []
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i]
      if (recipe.name.includes(input) || recipe.description.includes(input)) {
        result.push(recipe)
      } else {
        for (let j = 0; j < recipe.ingredients.length; j++) {
          if (recipe.ingredients[j].ingredient.includes(input)) {
            result.push(recipe)
          }
        }
      }
    }
    return result
  }

// la fonction qui stoque les appliances dans result
export function getAppliances(recipes, selectedAppliances) {
    const result = []
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i]
      if (!result.includes(recipe.appliance) && !selectedAppliances.includes(recipe.appliance)) {
        result.push(recipe.appliance)
      }
    }
    return result
  }

   // la fonction qui stoque les ustensils dans result
export function getUstensils(recipes) {
    const result = []
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i]
      for (let j = 0; j < recipe.ustensils.length; j++) {
        if (!result.includes(recipe.ustensils[j])) {
          result.push(recipe.ustensils[j])
        }
      }
    }
    return result
  }
  
  // la fonction qui stoque les ingredients dans result
  export function getIngredients(recipes) {
    const result = []
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i]
      for (let j = 0; j < recipe.ingredients.length; j++) {
        const ingredient = recipe.ingredients[j].ingredient
        if (!result.includes(ingredient)) {
          result.push(ingredient)
        }
      }
    }
    return result
  }

  //   fct de recherche par TAG dans le dropdown ingredients
export function ingredientSearchByTag(ingredient, input){
    const result = []
    for (let i = 0; i < getIngredients(recipes).length; i++) {

    }
}
// fct de recherche par TAG dans les 3 dropdown 

export function applianceSearchByTag(optionsList, input){
    let result = []
    for (let i = 0; i < optionsList.length; i++) {
        if (optionsList[i].includes(input)){
            result.push(optionsList[i]) 
        }
    }
    return result
}
// // fct de recherche par TAG dans le dropdown ustensils

// export function ustensileSearchByTag(ustensilsList, input){
//     let result = []
//     for (let i = 0; i < ustensilsList.length; i++) {
//         if (ustensilsList[i].includes(input)){
//             result.push(ustensilsList[i]) 
//         }
//     }
//     return result
// }
