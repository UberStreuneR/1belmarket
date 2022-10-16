document.addEventListener("click", e => {
  const dropdown = document.querySelector(".dropdown-paper");
  const searchBar = document.querySelector(".searchbar-paper");
  if (
    (dropdown.classList.contains("active") && !searchBar.contains(e.target)) ||
    e.target.classList.contains("dropdown-subcategory-link")
  ) {
    dropdown.classList.remove("active");
  }
});
