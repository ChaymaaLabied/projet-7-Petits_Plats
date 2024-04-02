function setDropdownBtn(dropdownEl) {
  // Add click event listener to open dropdown
  dropdownEl.querySelector(".dropdown__btn").addEventListener("click", () => {
    dropdownEl.classList.toggle("dropdown--open");
    dropdownEl
      .querySelector(".dropdown__arrow")
      .classList.toggle("dropdown__arrow--rotate");
    // Show or hide options content
    dropdownEl
      .querySelector(".dropdown__content")
      .classList.toggle("dropdown__content--visible");
  });
}

export { setDropdownBtn };
