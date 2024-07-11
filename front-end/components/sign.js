document.addEventListener("DOMContentLoaded", () => {
  const signInButton = document.getElementById("sign-in");

  document
    .getElementById("continue-pwd")
    .addEventListener("click", async function (event) {
      event.preventDefault();

      const emailOrPhone = document.getElementById("emailOrPhone").value;
      const password = document.getElementById("signInPassword").value;

      try {
        const response = await fetch("http://localhost:3000/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emailOrPhone, password }),
        });

        if (response.ok) {
          const responseData = await response.json();

          // Display an alert for successful sign-in
          alert("Sign-in successful! User ID: " + responseData.user.user_id);

          // Create a popup notification for successful sign-in
          const notification = document.createElement("div");
          notification.classList.add("notification");
          notification.textContent =
            "Sign-in successful! User ID: " + responseData.user.user_id;
          document.body.appendChild(notification);

          // Hide the Sign In button
          if (signInButton) {
            signInButton.style.display = "none";
          }

          // Automatically redirect after a brief delay (e.g., 2 seconds)
          setTimeout(() => {
            window.location.href =
              "http://127.0.0.1:5500/apple-replica-ecom/front-end/cart.html";
          }, 2000); // Adjust delay as needed
        } else {
          const errorData = await response.json();
          alert("Sign-in failed: " + errorData.error);
        }
      } catch (error) {
        console.error("Error signing in:", error);
        alert("An error occurred while signing in.");
      }
    });
});
