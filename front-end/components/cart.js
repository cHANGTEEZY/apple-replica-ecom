document.addEventListener("DOMContentLoaded", function () {
  const checkoutHeader = document.querySelector(".checkout-header");
  const checkoutSubHeader = document.getElementById("check-signed-in");
  const cartItemsSection = document.querySelector(".cart-items");
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  const dynamicTotalPrice = document.querySelector(".dynamic-total-price");

  console.log(dynamicTotalPrice); // Debugging statement

  if (!cartItems || Object.keys(cartItems).length === 0) {
    checkoutHeader.innerText = "Your bag is empty.";
    checkoutSubHeader.innerText =
      "Sign in to see if you have any saved items. Or continue shopping.";
  } else {
    checkoutHeader.innerText = "Review your bag.";
    checkoutSubHeader.innerText = "Free delivery and free returns.";
  }

  function updateCartDisplay() {
    cartItemsSection.innerHTML = "";
    let totalPrice = 0;

    if (cartItems && Object.keys(cartItems).length > 0) {
      for (const productName in cartItems) {
        const product = cartItems[productName];

        const productItem = document.createElement("div");
        productItem.classList.add("cart-item");
        productItem.innerHTML = `
          <img src="${product.imageUrl}" alt="${product.name}">
          <div class="cart-item-description">
            <div class="cart-item-description-left">
              <h3 class="cart-product-name">${product.name}</h3>
            </div>
            <div class="cart-item-quantity">
              <select class="quantity-selector">
                <option value="1" ${
                  product.quantity === 1 ? "selected" : ""
                }>1</option>
                <option value="2" ${
                  product.quantity === 2 ? "selected" : ""
                }>2</option>
                <option value="3" ${
                  product.quantity === 3 ? "selected" : ""
                }>3</option>
                <option value="4" ${
                  product.quantity === 4 ? "selected" : ""
                }>4</option>
                <option value="5" ${
                  product.quantity >= 5 ? "selected" : ""
                }>5+</option>
              </select>
            </div>
            <div class="cart-item-description-right">
              <p>$${(product.price * product.quantity).toFixed(2)}</p> 
              <button class="remove-btn">Remove</button>
            </div>
          </div>
        `;
        cartItemsSection.appendChild(productItem);

        const removeBtn = productItem.querySelector(".remove-btn");
        removeBtn.addEventListener("click", function () {
          const confirmed = confirm(
            "Are you sure you want to remove this item from your bag?"
          );
          if (confirmed) {
            delete cartItems[product.name];
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            updateCartDisplay(); // Update cart display after removing item
          }
        });

        const quantitySelector =
          productItem.querySelector(".quantity-selector");
        quantitySelector.addEventListener("change", function () {
          product.quantity = parseInt(quantitySelector.value);
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
          updateCartDisplay(); // Update cart display after changing quantity
        });

        totalPrice += product.price * product.quantity;
      }
    }

    // Display total price
    console.log(totalPrice);
    const totalPriceElement = document.createElement("div");
    totalPriceElement.classList.add("cart-total-price");
    totalPriceElement.style.textAlign = "right"; // Add this line
    totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
    cartItemsSection.appendChild(totalPriceElement);
    const installmentPrice = totalPrice / 12;

    //Display checkout
    const checkoutArea = document.createElement("div");
    cartItemsSection.appendChild(checkoutArea);
    checkoutArea.innerHTML = `
       <div class="checkout-area">
          <div class="checkout-header">How would you like to check out?</div>
          <div class="checkout-type-area">
            <div class="installment-checkout">
                  <p class="head">Pay Monthly 
						with <br>Apple Card <br>
						$${installmentPrice.toFixed(2)}/mo.at 0%  </p>

                <button class="checkout-button">
                  Check Out with Apple Card <br> Monthly Installments
                </button>
                <p><span class="head">$0.00 due today</span>, which includes <br>applicable one time payment items,<br> down payments, shipping, and <br>taxes.</p>
            </div>
            <div class="normal-checkout">
              <p class="head">Pay in Full <br> $${totalPrice.toFixed(2)} </p>
              <button class="checkout-button">Check Out</button>                                                  
            </div>
          </div>
        </div>`;

    const checkoutRedirect = document.querySelector(
      ".normal-checkout .checkout-button"
    );
    checkoutRedirect.addEventListener("click", () => {
      window.location.href = "checkout.html";
    });
  }
  updateCartDisplay();
});
