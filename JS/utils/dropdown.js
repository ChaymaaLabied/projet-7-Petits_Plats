export let filters = { ingredients: [] , appliances: [] , ustensils: []};

function openDropdown(dropdownEl) {
  // Little change of dropdown style when it's open
  dropdownEl.classList.toggle("dropdown--open");
  dropdownEl.querySelector(".dropdown__arrow").classList.toggle("dropdown__arrow--rotate");
  // Show or hide options content
  dropdownEl.querySelector(".dropdown__content").classList.toggle("dropdown__content--visible");
}

function calcDropWidth(dropdownList) {
  dropdownList.forEach((dropdownEl) => {
    const dropdownBtnWidth = dropdownEl
      .querySelector(".dropdown__btn")
      .offsetWidth.toString();
    dropdownEl.style.width = `${dropdownBtnWidth}px`;
  });
}


// Sets up the "unselect-btn" button functionality for a dropdown selected-option or selected-tag
function setUnselectBtn(parentOption, currentChild, otherChild, type) {
  currentChild.querySelector(".unselect-btn").addEventListener("click", () => {
    filters[type] = filters[type].filter((option) => option !== parentOption.textContent.toLowerCase());
    parentOption.classList.remove("selected");
    currentChild.parentNode.removeChild(currentChild);
    otherChild.parentNode.removeChild(otherChild);
    filterRecipes();
  });
}

// Hides the option clicked and creates the associated elements in .dropdown__selected-options and .filters-section__tags
function createSelectOption(dropdownEl, optionEl, type) {
  optionEl.classList.add("selected");
  // selctOption corresponds to the selected items visible in the drop-down menu
  const selctOption = document.createElement("li");
  // selctTag corresponds to the selected items visible outside the drop-down menu
  const selctTag = document.createElement("div");
  selctOption.innerHTML = selctTag.innerHTML = `
      ${optionEl.textContent}<div class="unselect-btn"></div>
  `;
  setUnselectBtn(optionEl, selctOption, selctTag, type);
  setUnselectBtn(optionEl, selctTag, selctOption, type);
  dropdownEl.querySelector(".dropdown__selected-options").append(selctOption);
  document.querySelector(".selected-tags").append(selctTag);
}

// Sets the dropdown options for a specific dropdown element with a specific tag list
function setDropdownOptions(dropdownEl, optionsList, type) {
  const dropdownOptionsEl = dropdownEl.querySelector(".dropdown__options");
  if (dropdownOptionsEl.children.length !== 0) {
    Array.from(dropdownOptionsEl.children).forEach((child) => {
      if (!child.classList.contains("selected")) {
        dropdownOptionsEl.removeChild(child);
      }
    });
  }
  // Create list item elements for tags
  const lstOptionsEl = optionsList.filter((option) => !filters[type].includes(option)).map((option) => {
    const liEl = document.createElement("li");
    liEl.textContent = option;
    liEl.addEventListener("click", (e) => {
      filters[type].push(option);
      createSelectOption(dropdownEl, e.currentTarget, type);
      // filterRecipes();
    });
    return liEl;
  });
  dropdownOptionsEl.append(...lstOptionsEl);
}

function setDropdownBtn(dropdownEl) {
  // Add click event listener to open dropdown
  dropdownEl.querySelector(".dropdown__btn").addEventListener("click", () => {
    openDropdown(dropdownEl);
  });
}

// Initialize all dropdowns
function initDropdown(dropdownEl, optionsList, type) {
  // Set dropdown options
  setDropdownOptions(dropdownEl, optionsList, type);
  dropdownEl.querySelector(".dropdown__search input").addEventListener("input", (e) => {
    // const optionsFind = searchOptions(optionsList, e.currentTarget.value.toLowerCase());
    const optionsFind = ['TEST1','TEST2']
    setDropdownOptions(dropdownEl, optionsFind, type);
  });
}

export { initDropdown, calcDropWidth, setDropdownBtn };