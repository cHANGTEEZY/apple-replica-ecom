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
        const items = document.querySelector(
          ".dynamic-total-items"
        ).textContent;
        const total = document.querySelector(
          ".dynamic-total-price"
        ).textContent;
        const shipping = document.querySelector(
          ".shipping-third p:last-child"
        ).textContent;
        const delivery = document.querySelector(
          ".delivery p:last-child"
        ).textContent;
        const shippingLocation =
          document.querySelector(".shipping-location").textContent;
        const userDetail = document.querySelector(".user-detail").textContent;
        const paymentMethod =
          document.querySelector(".payment-method").textContent;

        // Alert with transaction details
        alert(
          `Transaction Successful. Transaction completed by ${details.payer.name.given_name}\n\n` +
            `Your Billing Information:\n` +
            `Order Total: ${total}\n` +
            `${items}\n` +
            `Shipping: ${shipping}\n` +
            `Delivers On: ${delivery}\n` +
            `Shipping Details: ${shippingLocation}\n` +
            `User Detail: ${userDetail}\n` +
            `Payment Method: ${paymentMethod}`
        );

        // Generate PDF with transaction details
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const lineHeight = 10;
        let currentHeight = 10;

        doc.text("Transaction Successful", 10, currentHeight);
        currentHeight += lineHeight;
        doc.text(
          `Transaction completed by ${details.payer.name.given_name}`,
          10,
          currentHeight
        );
        currentHeight += lineHeight;
        doc.text("Your Billing Information:", 10, currentHeight);
        currentHeight += lineHeight;
        doc.text(`Order Total: ${total}`, 10, currentHeight);
        currentHeight += lineHeight;
        doc.text(`${items}`, 10, currentHeight);
        currentHeight += lineHeight;
        doc.text(`Shipping: ${shipping}`, 10, currentHeight);
        currentHeight += lineHeight;
        doc.text(`Delivers On: ${delivery}`, 10, currentHeight);
        currentHeight += lineHeight;

        // Wrap long text if necessary
        const splitShippingLocation = doc.splitTextToSize(
          `Shipping Details: ${shippingLocation}`,
          180
        );
        splitShippingLocation.forEach((line) => {
          doc.text(line, 10, currentHeight);
          currentHeight += lineHeight;
        });

        const splitUserDetail = doc.splitTextToSize(
          `User Detail: ${userDetail}`,
          180
        );
        splitUserDetail.forEach((line) => {
          doc.text(line, 10, currentHeight);
          currentHeight += lineHeight;
        });

        const splitPaymentMethod = doc.splitTextToSize(
          `Payment Method: ${paymentMethod}`,
          180
        );
        splitPaymentMethod.forEach((line) => {
          doc.text(line, 10, currentHeight);
          currentHeight += lineHeight;
        });

        // Save the PDF
        doc.save("Billing_Information.pdf");

        // Redirect to the specified URL after 5 seconds
        setTimeout(function () {
          window.location.href =
            "http://127.0.0.1:5500/apple-replica-ecom/front-end/store.html";
        }, 5000);
      });
    },
    onError: function (err) {
      console.error("An error occurred:", err);
    },
  })
  .render("#paypal-button-container");
