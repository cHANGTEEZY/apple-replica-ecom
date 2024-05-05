document.addEventListener("DOMContentLoaded", function () {
  const addToBagBtns = document.querySelectorAll(".ap-add-to-bag-btn button");

  addToBagBtns.forEach((button) => {
    button.addEventListener("click", function () {
      const productId = button.dataset.id;
      const productDetails = getProductDetails(productId);

      addToCart(productDetails);
      // Redirect to cart.html
      window.open("./cart.html", "_blank");
    });
  });
});

function getProductDetails(productId) {
  // Replace with your logic to get product details
  if (productId === "ap-pro-1") {
    return {
      name: "AirPods Pro (2nd generation) with MagSafe Charging Case (USB‑C)",
      price: 249.0,
      imageUrl: "./public/assets-airpods/MTJV3.jpeg",
    };
  } else {
    return null;
  }
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
