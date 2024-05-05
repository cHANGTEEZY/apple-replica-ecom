// document.addEventListener("DOMContentLoaded", function () {
//   const carousel = document.querySelector(".box-carousel");
//   const images = carousel.querySelectorAll("img");
//   const numImages = images.length;
//   let currentIndex = 0;

//   function moveCarousel(direction) {
//     if (direction === "next") {
//       currentIndex = (currentIndex + 1) % numImages;
//     } else if (direction === "prev") {
//       currentIndex = (currentIndex - 1 + numImages) % numImages;
//     }
//     carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
//   }

//   document
//     .querySelector(".what-is-in-the-box-carousel")
//     .addEventListener("click", function (event) {
//       if (event.target.classList.contains("next")) {
//         moveCarousel("next");
//       } else if (event.target.classList.contains("prev")) {
//         moveCarousel("prev");
//       }
//     });
// });
