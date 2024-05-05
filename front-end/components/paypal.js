function extractNumericValue(str) {
  return parseFloat(str.replace(/[^\d.]/g, ""));
}

// Initialize PayPal Buttons with createOrder and onApprove functions
paypal
  .Buttons({
    createOrder: function (data, actions) {
      // Get the dynamic total price
      const dynamicTotalPriceElement = document.querySelector(
        ".dynamic-total-price"
      );
      const dynamicTotalPriceValue = extractNumericValue(
        dynamicTotalPriceElement.textContent
      );

      // Set the amount to the dynamic total price
      const amountElement = {
        value: dynamicTotalPriceValue.toFixed(2),
      };

      return actions.order.create({
        purchase_units: [
          {
            amount: amountElement,
          },
        ],
      });
    },
    onApprove: function (data, actions) {
      return actions.order.capture().then(function (details) {
        alert(
          "Transaction Successful. Transaction completed by " +
            details.payer.name.given_name
        );
      });
    },
    onError: function (err) {
      console.error("An error occurred:", err);
    },
  })
  .render("#paypal-button-container");
