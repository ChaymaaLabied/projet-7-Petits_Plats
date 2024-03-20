import { recipes } from "../data/recipes.js"

function getRecipeCard(dataRecipe) {
    // la creation des elements DOM des cartes des recettes
  const articleRecipeCard = document.createElement("article")
  articleRecipeCard.setAttribute("class", "recipe-card")
  const recipeTime = document.createElement("div")
  recipeTime.setAttribute("class", "recipe-card__time") // setatrr a changer b classlist push
  recipeTime.textContent = `${dataRecipe.time}min`
  const recipeDivImg = document.createElement("div")
  recipeDivImg.setAttribute("class", "recipe-card__img")
  const recipeImg = document.createElement("img")
  recipeImg.setAttribute("src", `assets/Recettes/${dataRecipe.image}`)
  recipeImg.setAttribute("alt", `la recette : ${dataRecipe.name}`)

  recipeDivImg.appendChild(recipeImg)//  ajout au dom de l'image

  const recipeDivContent = document.createElement("div")
  recipeDivContent.setAttribute("class", "recipe-card__content")
  const RecipeName = document.createElement("h2")
  RecipeName.setAttribute('class','recipe-card__name')
  RecipeName.textContent = dataRecipe.name
  const recipeSubtitleRecette = document.createElement("h3")
  recipeSubtitleRecette.setAttribute('class',"recipe-card__subtitle")
  const recipeDivRecette = document.createElement("div")
  recipeDivRecette.setAttribute('class','recipe-card__recipe')
  const recipeTexte = document.createElement('p')

  recipeDivRecette.appendChild(recipeTexte)

  const recipeSubtitleIngredients = document.createElement("h3")
  recipeSubtitleIngredients.setAttribute('class',"recipe-card__subtitle")

  const recipeDivIngredientsList = document.createElement("div")
  recipeDivIngredientsList.setAttribute('class','recipe-card__list')
// peut etre il fallait une boucle car il ya plusieurs ingredients je vais creer l'elements html quand mm
  const recipeIngredients = document.createElement('div')
  recipeIngredients.setAttribute('class','recipe-card__ingredient')
  const recipeIngrName = document.createElement('p')
  recipeIngrName.setAttribute('class','name')
  const recipeIngrQuantity = document.createElement('p')
  recipeIngrQuantity.setAttribute('class','quantity')
  
  recipeIngredients.appendChild(recipeIngrName)
  recipeIngredients.appendChild(recipeIngrQuantity)


  recipeDivIngredientsList.appendChild(recipeIngredients)

  recipeDivContent.appendChild(RecipeName)
  recipeDivContent.appendChild(recipeSubtitleRecette)
  recipeDivContent.appendChild(recipeDivRecette)
  recipeDivContent.appendChild(recipeSubtitleIngredients)
  recipeDivContent.appendChild(recipeDivIngredientsList)


  articleRecipeCard.appendChild(recipeTime)
  articleRecipeCard.appendChild(recipeDivImg)
  articleRecipeCard.appendChild(recipeDivContent)

  return articleRecipeCard
}
export function displayMediaRecipeCard(recipeList){
    const recipeSection = document.querySelector('.recipe-section')
    recipeList.forEach((elt)=>{
        recipeSection.appendChild(getRecipeCard(elt))
    })
    
 }
 displayMediaRecipeCard(recipes)