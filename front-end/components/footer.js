document.addEventListener("DOMContentLoaded", function () {
  const footerItems = document.querySelectorAll(".footer-item");

  footerItems.forEach(function (item) {
    const caret = item.querySelector(".fa-caret-down");
    const menu = item.querySelector(".menu");
    const menuItems = menu.querySelectorAll("li");

    item.addEventListener("click", function () {
      // Close all open menus except the one clicked
      footerItems.forEach(function (otherItem) {
        if (otherItem !== item) {
          otherItem.querySelector(".menu").classList.remove("show");
          otherItem.querySelector(".fa-caret-down").classList.remove("rotated");
        }
      });

      // Toggle the menu of the clicked item
      menu.classList.toggle("show");

      // Toggle caret rotation
      caret.classList.toggle("rotated");

      // Check if the menu has less than 5 items
      if (menuItems.length < 5) {
        // Calculate the height of the menu
        menu.style.height = "auto"; // Set height to auto to calculate the content height
        const menuHeight = menu.clientHeight + 10; // Add 20 pixels
        menu.style.height = `${menuHeight}px`; // Set the calculated height
      } else {
        menu.style.height = "auto"; // Set height to auto to allow for natural expansion
      }
    });

    // Prevent menu from closing when clicking inside it
    menu.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  });
});
