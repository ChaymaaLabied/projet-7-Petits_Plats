import { recipes } from "../data/recipes.js";
import {
  getAppliances,
  getIngredients,
  getUstensils,
  search,
  searchByTag
} from "../template/template.js";
import { setDropdownBtn } from "../utils/dropdown.js";

let recettes = recipes;
let selectedAppliance = [];
let selectedUstensiles = [];
let selectedIngredients = [];
let allAppliances;
let allUstensiles;
let allIngredients;
let searchInput = "";
const inputMainReseach = document.getElementById("input");

const divFoundRecipes = document.querySelector(
  ".filters-section__recipes-found"
);
divFoundRecipes.textContent = `${recipes.length} Recettes`;

// creation des cartes en important les données du fichier recipes.js
function getRecipeCard(dataRecipe) {
  const { image, name, ingredients, time, description } = dataRecipe;
  // la creation des elements DOM des cartes des recettes
  const articleRecipeCard = document.createElement("article");
  articleRecipeCard.classList.add("recipe-card");
  const recipeTime = document.createElement("div");
  recipeTime.classList.add("recipe-card__time"); 
  recipeTime.textContent = `${time}min`;
  const recipeDivImg = document.createElement("div");
  recipeDivImg.classList.add("recipe-card__img");
  const recipeImg = document.createElement("img");
  recipeImg.setAttribute("src", `assets/Recettes/${image}`);
  recipeImg.setAttribute("alt", `la recette : ${name}`);

  recipeDivImg.appendChild(recipeImg); //  ajout au dom de l'image

  const recipeDivContent = document.createElement("div");
  recipeDivContent.classList.add("recipe-card__content");
  const RecipeName = document.createElement("h2");
  RecipeName.classList.add("recipe-card__name");
  RecipeName.textContent = name;
  const recipeSubtitleRecette = document.createElement("h3");
  recipeSubtitleRecette.classList.add("recipe-card__subtitle");
  recipeSubtitleRecette.textContent = "Recette";
  const recipeDivRecette = document.createElement("div");
  recipeDivRecette.classList.add("recipe-card__recipe");
  recipeDivRecette.textContent = description;
  const recipeTexte = document.createElement("p");

  recipeDivRecette.appendChild(recipeTexte);

  const recipeSubtitleIngredients = document.createElement("h3");
  recipeSubtitleIngredients.classList.add("recipe-card__subtitle");
  recipeSubtitleIngredients.textContent = "Ingredients";

  const recipeDivIngredientsList = document.createElement("div");
  recipeDivIngredientsList.classList.add("recipe-card__list");

  ingredients.forEach((elt) => {
    const recipeIngredients = document.createElement("div");
    recipeIngredients.classList.add("recipe-card__ingredient");
    const recipeIngrName = document.createElement("p");
    recipeIngrName.textContent = elt.ingredient;
    recipeIngrName.classList.add("name");
    const recipeIngrQuantity = document.createElement("p");
    recipeIngrQuantity.classList.add("quantity");
    recipeIngrQuantity.textContent = elt.quantity;

    recipeIngredients.appendChild(recipeIngrName);
    recipeIngredients.appendChild(recipeIngrQuantity);
    recipeDivIngredientsList.appendChild(recipeIngredients);
  });

  recipeDivContent.appendChild(RecipeName);
  recipeDivContent.appendChild(recipeSubtitleRecette);
  recipeDivContent.appendChild(recipeDivRecette);
  recipeDivContent.appendChild(recipeSubtitleIngredients);
  recipeDivContent.appendChild(recipeDivIngredientsList);

  articleRecipeCard.appendChild(recipeTime);
  articleRecipeCard.appendChild(recipeDivImg);
  articleRecipeCard.appendChild(recipeDivContent);

  return articleRecipeCard;
}

// affichage des cartes dans le DOM , en traitant le cas ou on a aucune carte issue de la recherche

function displayMediaRecipeCard() {
  const recipeSection = document.querySelector(".recipe-section");
  recipeSection.innerHTML = "";
  
  if (recettes.length === 0) {
    const noResult = document.createElement("p");
    noResult.textContent = `Aucune recette ne contient "${inputMainReseach.value}" vous pouvez chercher «tarte aux pommes», «poisson», etc`;
    recipeSection.appendChild(noResult);
  } else {
    recettes.map(getRecipeCard).forEach(recipeCard => recipeSection.appendChild(recipeCard));
  }
}

//  version 2 de tt ces 3 fct 
function displayOptions(options, containerSelector, selectedOptionsArray, refreshFunction) {
  const optionsList = document.querySelector(containerSelector + " .dropdown__options");
  optionsList.innerHTML = "";

  options.forEach((option) => {
    const li = document.createElement("li");
    li.textContent = option;
    optionsList.appendChild(li);

    li.addEventListener("click", () => {
      const selectedOption = document.createElement("li");
      const value = li.textContent;
      selectedOption.textContent = value;

      const unselectButton = document.createElement("div");
      unselectButton.classList.add("unselect-btn");
      unselectButton.addEventListener("click", unselectTag);
      selectedOption.appendChild(unselectButton);

      li.classList.toggle("selected");
      document.querySelector(containerSelector + " .dropdown__selected-options").appendChild(selectedOption);

      // Ajouter à Selected-tags
      const selectedTags = document.querySelector(".selected-tags");
      const tag = document.createElement("div");
      tag.textContent = value;
      const unselectTagButton = unselectButton.cloneNode(true);
      unselectTagButton.addEventListener("click", unselectTag);
      tag.appendChild(unselectTagButton);
      selectedTags.appendChild(tag);
      selectedOptionsArray.push(value);
      refreshFunction();

      function unselectTag() {
        selectedOption.classList.toggle("selected");
        document.querySelector(containerSelector + " .dropdown__selected-options").removeChild(selectedOption);
        selectedTags.removeChild(tag);
        const index = selectedOptionsArray.indexOf(value);
        selectedOptionsArray.splice(index, 1);

        refreshFunction();
      }
    });
  });
}

// // Usage
function displayAppliances(appliances) {
  displayOptions(appliances, "#appliances", selectedAppliance, refreshSearch);
}

function displayIngredients(ingredients) {
  displayOptions(ingredients, "#ingredients", selectedIngredients, refreshSearch);
}

function displayUstensils(ustensils) {
  displayOptions(ustensils, "#ustensils", selectedUstensiles, refreshSearch);
}



// l'appel des fct d'affichage
function refreshSearch() {
  //utiliser opérateur ternaire
  recettes = search(
    searchInput,
    selectedAppliance,
    selectedUstensiles,
    selectedIngredients
  );
  divFoundRecipes.textContent = `${recettes.length} Recettes`;
  displayMediaRecipeCard();
  // This is nice
  allAppliances = getAppliances(recettes, selectedAppliance);
  allUstensiles = getUstensils(recettes, selectedUstensiles);
  allIngredients = getIngredients(recettes, selectedIngredients);
  displayAppliances(allAppliances);
  displayUstensils(allUstensiles);
  displayIngredients(allIngredients)
}

// Affichage initial
refreshSearch();

//  le listener principale pour effectuer la recherche dans la barre pricipale

inputMainReseach.addEventListener("input", (e) => {
  searchInput = e.target.value;
  refreshSearch();
});

//  ouverture du dropdown
const appliancesDropdown = document.getElementById("appliances");
const ingredientsDropdown = document.getElementById("ingredients");
const ustensilsDropdown = document.getElementById("ustensils");

setDropdownBtn(ingredientsDropdown);
setDropdownBtn(appliancesDropdown);
setDropdownBtn(ustensilsDropdown);

// recherche par tag dans appareils

const inputSearchAppliances = document.getElementById("TAGsearch_Appliances");

inputSearchAppliances.addEventListener("input", (e) => {
  const TAGsearchInput = e.target.value;
  displayAppliances(searchByTag(allAppliances, TAGsearchInput));
});

// recherche par tag dans ustensils

const inputSearchUstensils = document.getElementById("TAGsearch_ustensils");
inputSearchUstensils.addEventListener("input", (e) => {
  const TAGsearchInput = e.target.value; // est ce que je doischanger le nom de la variable
  displayUstensils(searchByTag(allUstensiles, TAGsearchInput));
});
// recherche par tag dans ustensils

const inputSearchIngredients = document.getElementById("TAGsearch_ingredients");
inputSearchIngredients.addEventListener("input", (e) => {
  const TAGsearchInput = e.target.value; // est ce que je dois changer le nom de la variable
 displayIngredients(searchByTag(allIngredients, TAGsearchInput))
});
