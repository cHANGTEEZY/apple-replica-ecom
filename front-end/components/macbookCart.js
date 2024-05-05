// addtocart.js
document.addEventListener("DOMContentLoaded", function () {
  const selectBtns = document.querySelectorAll(".select-macbook-btn button");

  selectBtns.forEach((button) => {
    button.addEventListener("click", function (event) {
      const macbookItem = event.target.closest(".macbook-grid-items"); // Get parent product
      const productId = macbookItem.dataset.id; // Example: "m3-macbook-1"
      const productDetails = getProductDetails(macbookItem);

      addToCart(productDetails);

      window.location = "./cart.html";
    });
  });
});

function getProductDetails(macbookItem) {
  const price = macbookItem
    .querySelector(".macbook-price p:first-of-type")
    .textContent.substring(1);

  const imageUrl = macbookItem.querySelector(
    ".macbook-grid-image img:first-child"
  ).src;
  let displayName;
  if (imageUrl.includes("mbp-m3-icon")) {
    displayName = "M3 MacBook";
  } else if (imageUrl.includes("mbp-m3-pro-icon")) {
    displayName = "M3 MacBook Pro";
  } else if (imageUrl.includes("mbp-m3-max-icon")) {
    displayName = "M3 MacBook Max";
  } else {
    displayName = "14-inch M3 MacBook Pro";
  }

  return {
    name: displayName, // Updated to use displayName
    price,
    imageUrl,
  };
}

function addToCart(product) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || {};

  if (cartItems[product.name]) {
    cartItems[product.name].quantity++;
  } else {
    cartItems[product.name] = { ...product, quantity: 1 };
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
