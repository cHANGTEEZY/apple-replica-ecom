document
  .getElementById("continue-pwd")
  .addEventListener("click", async function (event) {
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
        alert("Sign-in successful! User ID: " + responseData.user.user_id);
        // You can perform further actions here, such as redirecting the user to another page
      } else {
        const errorData = await response.json();
        alert("Sign-in failed: " + errorData.error);
      }
    } catch (error) {
      console.error("Error signing in:", error);
      alert("An error occurred while signing in.");
    }
  });
