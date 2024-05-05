// window.onload = function () {
//   const carousel = document.querySelector(".carousel");
//   const items = document.querySelectorAll(".item");
//   const itemWidth = items[0].offsetWidth + 20; // Width of item including margin

//   // Clone the first and last items
//   const firstItemClone = items[0].cloneNode(true);
//   const lastItemClone = items[items.length - 1].cloneNode(true);

//   // Append cloned items to the carousel
//   carousel.appendChild(firstItemClone);
//   carousel.insertBefore(lastItemClone, carousel.firstChild);

//   // Set the width of carousel to contain all items
//   carousel.style.width = `${itemWidth * carousel.children.length}px`;

//   // Set initial scroll position to show the second item
//   carousel.scrollLeft = itemWidth;

//   // Handle scroll event
//   carousel.addEventListener("scroll", function () {
//     const scrollLeft = carousel.scrollLeft;

//     // If scrolled to the end, jump back to the beginning
//     if (scrollLeft >= itemWidth * (items.length + 1)) {
//       carousel.scrollLeft = itemWidth;
//     } else if (scrollLeft === 0) {
//       // If scrolled to the beginning, jump to the end
//       carousel.scrollLeft = itemWidth * items.length;
//     }
//   });
// };
