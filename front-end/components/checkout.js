document.addEventListener("DOMContentLoaded", function () {
  // Get the truck element
  const truckElement = document.querySelector(".shipping-animation i");

  // Check if the element is 20% away from the top of the viewport
  function isElement20PercentFromTop(element) {
    const elementTop = element.getBoundingClientRect().top;
    const viewportHeight = window.innerHeight;
    return elementTop <= 0.6 * viewportHeight;
  }

  // Animate the truck element left to right
  function animateTruck() {
    gsap.to(truckElement, {
      left: "45%", // Move to the right edge of the container
      duration: 2, // Animation duration
      ease: "linear", // Linear easing
    });
  }

  // Check if the element is 20% from the top on initial page load
  if (isElement20PercentFromTop(truckElement)) {
    animateTruck();
  } else {
    // Add a scroll event listener to start the animation when the element is 20% from the top
    window.addEventListener("scroll", function () {
      if (isElement20PercentFromTop(truckElement)) {
        animateTruck();
        // Remove the scroll event listener once the animation starts
        window.removeEventListener("scroll", arguments.callee);
      }
    });
  }
});
