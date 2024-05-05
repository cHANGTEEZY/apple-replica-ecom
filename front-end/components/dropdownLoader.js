document.addEventListener("DOMContentLoaded", function () {
  const dropdownMenus = document.querySelectorAll(".dropdown-menu");

  // Initially remove active class from all dropdown menus
  dropdownMenus.forEach((menu) => {
    menu.classList.remove("active");
  });

  const dropdownLinks = document.querySelectorAll(".dropdown .link");

  dropdownLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      const dropdown = this.closest(".dropdown");
      const dropdownMenu = dropdown.querySelector(".dropdown-menu");
      const isActive = dropdownMenu.classList.contains("active");

      // Close all dropdown menus
      dropdownMenus.forEach((menu) => {
        menu.classList.remove("active");
      });

      // Toggle the clicked dropdown menu
      if (!isActive) {
        dropdownMenu.classList.add("active");
      }

      event.stopPropagation(); // Stop the event from bubbling up to the document
    });
  });

  // Close dropdown menus when clicking outside
  document.addEventListener("click", function () {
    dropdownMenus.forEach((menu) => {
      menu.classList.remove("active");
    });
  });

  // Prevent closing the dropdown menu when clicking inside
  dropdownMenus.forEach((menu) => {
    menu.addEventListener("click", function (event) {
      event.stopPropagation(); // Stop the event from bubbling up to the document
    });
  });

  // Toggle the visibility of the search input when clicking on the search icon
  const searchIcon = document.querySelector(".fa-magnifying-glass");
  const searchInput = document.querySelector(".dropdown-links.search input");

  searchInput.style.display = "none"; // Initially hide the search input field

  searchIcon.parentElement.addEventListener("click", function (event) {
    searchInput.style.display =
      searchInput.style.display === "none" ? "block" : "none";

    event.stopPropagation(); // Stop the event from bubbling up to the document
  });

  // Close the search input when clicking outside
  document.addEventListener("click", function () {
    searchInput.style.display = "none";
  });

  // Prevent closing the dropdown menu when clicking inside the search input
  searchInput.addEventListener("click", function (event) {
    event.stopPropagation(); // Stop the event from bubbling up to the document
  });

  // Toggle mobile navigation menu
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");

  hamburger.addEventListener("click", function () {
    mobileNav.classList.toggle("open");
  });

  // Toggle the visibility of the hamburger dropdown when clicking the hamburger button
  const hamburgerButton = document.querySelector(".hamburger");
  const hamburgerDropdown = document.querySelector(".hamburger-dropdown");

  hamburgerDropdown.classList.remove("active"); // Initially hide the hamburger dropdown

  hamburgerButton.addEventListener("click", function (event) {
    hamburgerDropdown.classList.toggle("active");

    event.stopPropagation(); // Stop the event from bubbling up to the document
  });

  // Close the hamburger dropdown when clicking outside
  document.addEventListener("click", function () {
    hamburgerDropdown.classList.remove("active");
  });

  // Prevent closing the dropdown menu when clicking inside the hamburger dropdown
  hamburgerDropdown.addEventListener("click", function (event) {
    event.stopPropagation(); // Stop the event from bubbling up to the document
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const hamburgerDropdown = document.querySelector(".hamburger-dropdown");

  hamburger.addEventListener("click", function () {
    // Toggle the active class on the hamburger dropdown
    hamburgerDropdown.classList.toggle("active");

    // Toggle the open class on the hamburger icon
    hamburger.classList.toggle("open");
  });

  // Close the hamburger dropdown when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !hamburger.contains(event.target) &&
      !hamburgerDropdown.contains(event.target)
    ) {
      hamburgerDropdown.classList.remove("active");
      hamburger.classList.remove("open");
    }
  });
});
