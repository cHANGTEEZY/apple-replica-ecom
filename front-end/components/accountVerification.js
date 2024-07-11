document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("registrationForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      const formData = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        confirmPassword: document.getElementById("confirmPassword").value,
        phoneNumber: document.getElementById("phoneNumber").value,
      };

      // Validate fields
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword ||
        !formData.phoneNumber
      ) {
        alert("Please fill in all fields.");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      try {
        const url = "http://localhost:3000/register";
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const responseData = await response.json();
          if (responseData.success) {
            alert("Registration successful! User ID: " + responseData.userId);
            window.location.href =
              "http://127.0.0.1:5500/apple-replica-ecom/front-end/signIn.html";
          } else {
            alert("Registration failed: " + responseData.error);
          }
        } else {
          const errorResponse = await response.json();
          if (
            errorResponse.error.includes(
              "User with the same username or email already exists."
            )
          ) {
            alert("User with the same username or email already exists.");
          } else {
            alert("An error occurred during registration.");
          }
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred during registration.");
      }
    });
});
