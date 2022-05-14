document.addEventListener("click", e => {
    const dropdown = document.querySelector(".dropdown-paper");
    const searchBar = document.querySelector(".searchbar-paper");
    if (
        dropdown.classList.contains("active") &&
        !searchBar.contains(e.target)
    ) {
        dropdown.classList.remove("active");
    }
});
