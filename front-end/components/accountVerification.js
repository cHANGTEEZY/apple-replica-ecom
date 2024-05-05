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

    //  Validate fields
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.phoneNumber
    ) {
      alert("Please fill in all fields.");
      // ... (your error indication logic)
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Handle both registration and sign-in (modify URLs if needed)
    const isRegistration = event.submitter.id === "registerBtn"; // Identify if it's register or sign-in
    const url = isRegistration
      ? "http://localhost:3000/register"
      : "http://localhost:3000/signin";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.success) {
          if (isRegistration) {
            alert("Registration successful! User ID: " + responseData.userId);
            console.log("redirecting ");
            window.location.href = "http://127.0.0.1:5500/front-end/index.html";
            return; // Exit the function to prevent further execution
          }
        } else {
          alert(
            (isRegistration ? "Registration" : "Sign-in") +
              " failed: " +
              responseData.error
          );
        }
      } else {
        // Handle general errors
        alert("An error occurred.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
  });
