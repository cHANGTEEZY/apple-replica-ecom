document.addEventListener("DOMContentLoaded", function () {
  const addToCartButton = document.getElementById("add-vision-pro-to-cart");

  addToCartButton.addEventListener("click", function () {
    const productId = addToCartButton.dataset.id;
    const productDetails = getProductDetails(productId);

    if (productDetails) {
      addToCart(productDetails);
      // Redirect to cart.html
      window.open("./cart.html", "_blank");
    }
  });
});

function getProductDetails(productId) {
  if (productId === "vision-pro-1") {
    return {
      name: "Apple Vision Pro",
      price: 3499.0,
      imageUrl:
        "./public/assets-buy-menu/vision-pro-gallery-measure-hero-202401_PF1.jpeg",
    };
  }
  {
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
