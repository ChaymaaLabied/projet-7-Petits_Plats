
import { displayMediaRecipeCard } from "../page/index.js"
import { recipes } from "../data/recipes.js"


  function search(input) {
    const result = [];
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      if (recipe.name.includes(input) || recipe.description.includes(input)) {
        result.push(recipe);
      } else {
        for (let j = 0; j < recipe.ingredients.length; j++) {
          if (recipe.ingredients[j].ingredient.includes(input)) {
            result.push(recipe);
          }
        }
      }
    }
    return result;
  }
  
  console.log(search("coco"));
  
  const input = document.getElementById("input");
  
  input.addEventListener("input", (e) => {
    const searchInput = e.target.value;
    console.log(searchInput)
    if (searchInput.length >= 3) {
      const result = search(searchInput);
      displayMediaRecipeCard(result)
    }
  })