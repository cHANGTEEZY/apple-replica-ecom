document.addEventListener("DOMContentLoaded", function () {
  const continueButton = document.getElementById("continue-button-ip");

  continueButton.addEventListener("click", function () {
    const productId = this.getAttribute("data-id");
    const productName = this.getAttribute("data-name");
    const productPrice = parseFloat(this.getAttribute("data-price"));
    const productImage = this.getAttribute("data-image");

    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || {};

    if (!cartItems[productId]) {
      cartItems[productId] = {
        id: productId,
        name: productName,
        price: productPrice,
        quantity: 1,
        imageUrl: productImage,
      };
    } else {
      cartItems[productId].quantity += 1;
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    window.location.href = "cart.html";
  });
});
