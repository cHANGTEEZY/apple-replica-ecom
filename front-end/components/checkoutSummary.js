const orderSummaryButton = document.querySelector(".checkout-summary button");
const checkoutBilling = document.querySelector(".checkout-billing");
const closeButton = document.querySelector(".close-button");

orderSummaryButton.addEventListener("click", () => {
  checkoutBilling.classList.add("active");
});

closeButton.addEventListener("click", () => {
  checkoutBilling.classList.remove("active");
});

document.addEventListener("DOMContentLoaded", function () {
  const shippingAddressInput = document.querySelector(
    'input[placeholder="Shipping Address"]'
  );
  const cityInput = document.querySelector('input[placeholder="City"]');
  const stateInput = document.querySelector('input[placeholder="State"]');
  const postalCodeInput = document.querySelector(
    'input[placeholder="Zip/Postal Code"]'
  );
  const shippingLocation = document.querySelector(".shipping-location");

  // Event listener to update shipping details when input changes
  shippingAddressInput.addEventListener("input", updateShippingDetails);
  cityInput.addEventListener("input", updateShippingDetails);
  stateInput.addEventListener("input", updateShippingDetails);
  postalCodeInput.addEventListener("input", updateShippingDetails);

  function updateShippingDetails() {
    const shippingDetails = `
        <p>Shipping Address: ${shippingAddressInput.value}</p>
        <p>City: ${cityInput.value}</p>
        <p>State: ${stateInput.value}</p>
        <p>Postal Code: ${postalCodeInput.value}</p>
    `;
    shippingLocation.innerHTML = shippingDetails;
  }

  const usernameInput = document.querySelector(
    'input[placeholder="Enter your Full name"]'
  );
  const emailInput = document.querySelector(
    'input[placeholder="Enter your Email"]'
  );
  const phoneInput = document.querySelector(
    'input[placeholder="Enter your Phone number"]'
  );
  const userDetail = document.querySelector(".user-detail");

  usernameInput.addEventListener("input", () => {
    updateUserDetail();
  });

  emailInput.addEventListener("input", () => {
    updateUserDetail();
  });

  phoneInput.addEventListener("input", () => {
    updateUserDetail();
  });

  function updateUserDetail() {
    const userDetails = `
        <p>User Name: ${usernameInput.value}</p>
        <p>Email: ${emailInput.value}</p>
        <p>Phone No: ${phoneInput.value}</p>
    `;
    userDetail.innerHTML = userDetails;
  }

  const cardNumberInput = document.querySelector(".number");
  const paymentMethodContainer = document.querySelector(".payment-method");

  cardNumberInput.addEventListener("input", function () {
    const cardNumber = cardNumberInput.value;
    let paymentMethod = "";

    if (cardNumber.startsWith("4")) {
      paymentMethod = "VISA";
    } else if (
      cardNumber.startsWith("51") ||
      cardNumber.startsWith("52") ||
      cardNumber.startsWith("53") ||
      cardNumber.startsWith("54") ||
      cardNumber.startsWith("55")
    ) {
      paymentMethod = "MasterCard";
    } else if (
      cardNumber.startsWith("36") ||
      cardNumber.startsWith("38") ||
      cardNumber.startsWith("39")
    ) {
      paymentMethod = "DinersClub";
    } else if (
      cardNumber.startsWith("34") ||
      cardNumber.startsWith("34") ||
      cardNumber.startsWith("36")
    ) {
      paymentMethod = "American Express";
    } else if (cardNumber.startsWith("65")) {
      paymentMethod = "Discover";
    } else if (cardNumber.startsWith("5019")) {
      paymentMethod = "Dankort";
    }

    // Update the payment method display
    paymentMethodContainer.textContent = `Payment Method: ${paymentMethod}`;
  });
});
