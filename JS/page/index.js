import { recipes } from "../data/recipes.js"
import {
  applianceSearchByTag,
  getAppliances,
  getIngredients,
  getUstensils,
  search,
} from "../template/template.js"
import { initDropdown, setDropdownBtn } from "../utils/dropdown.js"

let recettes = recipes
let selectedAppliances = []
let allAppliances;
const inputMainReseach = document.getElementById("input")


// creation des cartes en important les données du fichier recipes.js
function getRecipeCard(dataRecipe) {
  const { image, name, ingredients, time, description } = dataRecipe
  // la creation des elements DOM des cartes des recettes
  const articleRecipeCard = document.createElement("article")
  articleRecipeCard.setAttribute("class", "recipe-card")
  const recipeTime = document.createElement("div")
  recipeTime.setAttribute("class", "recipe-card__time") // setatrr a changer b classlist push
  recipeTime.textContent = `${time}min`
  const recipeDivImg = document.createElement("div")
  recipeDivImg.setAttribute("class", "recipe-card__img")
  const recipeImg = document.createElement("img")
  recipeImg.setAttribute("src", `assets/Recettes/${image}`)
  recipeImg.setAttribute("alt", `la recette : ${name}`)

  recipeDivImg.appendChild(recipeImg); //  ajout au dom de l'image

  const recipeDivContent = document.createElement("div")
  recipeDivContent.setAttribute("class", "recipe-card__content")
  const RecipeName = document.createElement("h2")
  RecipeName.setAttribute("class", "recipe-card__name")
  RecipeName.textContent = name
  const recipeSubtitleRecette = document.createElement("h3")
  recipeSubtitleRecette.setAttribute("class", "recipe-card__subtitle")
  recipeSubtitleRecette.textContent = "Recette"
  const recipeDivRecette = document.createElement("div")
  recipeDivRecette.setAttribute("class", "recipe-card__recipe")
  recipeDivRecette.textContent = description;
  const recipeTexte = document.createElement("p")

  recipeDivRecette.appendChild(recipeTexte)

  const recipeSubtitleIngredients = document.createElement("h3")
  recipeSubtitleIngredients.setAttribute("class", "recipe-card__subtitle")
  recipeSubtitleIngredients.textContent = "Ingredients"

  const recipeDivIngredientsList = document.createElement("div")
  recipeDivIngredientsList.setAttribute("class", "recipe-card__list")

  ingredients.forEach((elt) => {
    const recipeIngredients = document.createElement("div")
    recipeIngredients.setAttribute("class", "recipe-card__ingredient")
    const recipeIngrName = document.createElement("p")
    recipeIngrName.textContent = elt.ingredient
    recipeIngrName.setAttribute("class", "name")
    const recipeIngrQuantity = document.createElement("p")
    recipeIngrQuantity.setAttribute("class", "quantity")
    recipeIngrQuantity.textContent = elt.quantity

    recipeIngredients.appendChild(recipeIngrName)
    recipeIngredients.appendChild(recipeIngrQuantity)
    recipeDivIngredientsList.appendChild(recipeIngredients)
  })

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

// affichage des cartes dans le DOM , en traitant le cas ou on a aucune carte issue de la recherche
function displayMediaRecipeCard() {
  const recipeSection = document.querySelector(".recipe-section")
  recipeSection.innerHTML = ""
  if (recettes.length === 0) {
    const noResult = document.createElement("p")
    noResult.textContent = `Aucune recette ne contient "${inputMainReseach.value}" vous pouvez chercher «tarte aux pommes», «poisson», etc`;
    recipeSection.appendChild(noResult)
  }
  recettes.forEach((elt) => {
    recipeSection.appendChild(getRecipeCard(elt))
  });
}


// affichage des appareils dans le dropdown
function displayAppliances(){
  const appliancesList = document.querySelector(
    "#appliances .dropdown__options")
    appliancesList.innerHTML = "" // pour eviter le cumul des resultats d'affichage a chaque fois , on efface the old one..
    allAppliances.forEach((elt) =>{
      const li = document.createElement("li")
      li.textContent = elt
      appliancesList.appendChild(li)
      li.addEventListener("click",(e)=>{
        console.log('TOTA')
        const selectedOption = document.createElement('li');
        const value = li.textContent
        selectedOption.textContent= value
        selectedOption.addEventListener('click',(e)=>{
          console.log('ANNULEEEE')
          selectedOption.classList.toggle("selected")
          document.querySelector("#appliances .dropdown__selected-options").removeChild(selectedOption)
          // remove from selectedApplicances
          selectedAppliances = selectedAppliances.filter(app => app !== value)
          // refacto
          allAppliances = getAppliances(recettes,selectedAppliances)
          displayAppliances()
        })
        selectedAppliances.push(value)
        li.classList.toggle("selected")
        document.querySelector("#appliances .dropdown__selected-options").appendChild(selectedOption)
      })
    })
}
// affichage des ingredients dans le dropdown
function displayIngredients() {
  const ingredientsList = document.querySelector(
    "#ingredients .dropdown__options"
  )
  ingredientsList.innerHTML = ""
  const ingredients = getIngredients(recettes)
  ingredients.forEach((elt) => {
    const li = document.createElement("li")
    li.textContent = elt
    ingredientsList.appendChild(li)
  })
}

// affichage des ustensils dans le dropdown
function displayUstensils() {
  const ustensilsList = document.querySelector(
    "#ustensils .dropdown__options"
  )
  ustensilsList.innerHTML = ""
  const ustentiles = getUstensils(recettes)
  ustentiles.forEach((elt) => {
    const li = document.createElement("li")
    li.textContent = elt
    ustensilsList.appendChild(li)
  })
}

// l'appel des fct d'affichage 
function refreshDisplay() {
  displayMediaRecipeCard()
  // This is nice
  allAppliances = getAppliances(recettes,selectedAppliances)
  displayAppliances()
  displayIngredients()
  displayUstensils()
}

// Affichage initial
refreshDisplay()


//  le listener principale pour effectuer la recherche dans la barre pricipale

const divFoundRecipes = document.querySelector(".filters-section__recipes-found")
divFoundRecipes.textContent = `${recipes.length} Recettes`
inputMainReseach.addEventListener("input", (e) => {
  const searchInput = e.target.value
  //utiliser opérateur ternaire 
  if (searchInput.length >= 3) {
    console.log('searchInput',searchInput)
    console.log('search(recettes, searchInput)',search(recettes, searchInput))
    recettes = search(recettes, searchInput)

  } else {
    recettes = recipes
  }
  divFoundRecipes.textContent = `${recettes.length} Recettes`
  refreshDisplay()
})

//  ouverture du dropdown
const appliancesDropdown = document.getElementById("appliances")
const ingredientsDropdown = document.getElementById("ingredients")
const ustensilsDropdown = document.getElementById("ustensils")

setDropdownBtn(ingredientsDropdown)
setDropdownBtn(appliancesDropdown)
setDropdownBtn(ustensilsDropdown)

// recherche par tag dans appareils

const inputSearchAppliances = document.getElementById("TAGsearch_Appliances")

inputSearchAppliances.addEventListener("input", (e) => {
  const TAGsearchInput = e.target.value
  // let resultGetAppliance = getAppliances(recettes)
  const availableAppliances = getAppliances(recettes, selectedAppliances)
  if(TAGsearchInput!== ""){
    allAppliances = applianceSearchByTag(availableAppliances, TAGsearchInput)
  }
  else{
    allAppliances = availableAppliances
  }
  // console.log(resultApplianceSearch)
  // const appliances = document.querySelector(
  //   "#appliances .dropdown__options")
  //   appliancesList.innerHTML = ""
  //   resultGetAppliance.forEach((elt) =>{
  //     const li = document.createElement("li")
  //     li.textContent = elt
  //     appliancesList.appendChild(li)
  //   }) 
  displayAppliances()
})



// recherche par tag dans ustensils

const inputSearchUstensils = document.getElementById("TAGsearch_ustensils")

inputSearchUstensils.addEventListener("input", (e) => {
  const TAGsearchInput = e.target.value // est ce que je doischanger le nom de la variable
  const resultGetUstensils = getUstensils(recettes)
  const resultApplianceSearch = applianceSearchByTag(resultGetUstensils, TAGsearchInput)
  const ustensilsList = document.querySelector(
    "#ustensils .dropdown__options"
  )
    ustensilsList.innerHTML = ""
    resultApplianceSearch.forEach((elt) =>{
      const li = document.createElement("li")
      li.textContent = elt
      ustensilsList.appendChild(li)
    })


})
// recherche par tag dans ustensils

const inputSearchIngredients = document.getElementById("TAGsearch_ingredients")

inputSearchIngredients.addEventListener("input", (e) => {
  const TAGsearchInput = e.target.value // est ce que je dois changer le nom de la variable
  const resultGetIngredients = getIngredients(recettes) // had la variable doit etre initialiser par la valeur dial kolshi apres atakhad le resulta dial la recherche 
  const resultApplianceSearch = applianceSearchByTag(resultGetIngredients, TAGsearchInput)
  const ingredientsList = document.querySelector(
    "#ingredients .dropdown__options"
  )
  ingredientsList.innerHTML = ""
  resultApplianceSearch.forEach((elt) => {
    const li = document.createElement("li")
    li.textContent = elt
    ingredientsList.appendChild(li)
  })

})
// console.log(recettes.length)
