document.addEventListener("DOMContentLoaded", function () {
  const sliders = document.querySelectorAll(".slider");
  const displayImages = document.querySelectorAll(".ap-display-img");

  sliders.forEach((slider, index) => {
    slider.addEventListener("click", () => {
      displayImages.forEach((displayImage) => {
        displayImage.style.display = "none";
      });
      displayImages[index].style.display = "block";
    });
  });

  sliders.forEach((slider) => {
    slider.addEventListener("click", () => {
      // Remove 'active' class from all sliders
      sliders.forEach((s) => s.classList.remove("border"));
      // Add 'active' class to the clicked slider
      slider.classList.add("border");
    });
  });
});
