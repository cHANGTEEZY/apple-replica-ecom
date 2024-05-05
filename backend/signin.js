import pg from "pg";
import bcrypt from "bcrypt";

const pool = new pg.Pool({
  user: "changteezy",
  host: "localhost",
  database: "postgres",
  password: "changteezy",
  port: 5432,
});

export async function signInUser(req, res) {
  // Set CORS headers to allow requests from any origin
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const { emailOrPhone, password } = req.body;

  try {
    // Query the database to retrieve user details based on email or phone number
    const query =
      "SELECT * FROM user_details WHERE email = $1 OR user_phone = $1";
    const { rows } = await pool.query(query, [emailOrPhone]);

    if (rows.length === 0) {
      // If no user found with the provided email or phone number, return an error
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const user = rows[0];

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // If the password is invalid, return an error
      return res
        .status(401)
        .json({ success: false, error: "Invalid password" });
    }

    // If the email/phone and password match, return the user details
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({
      success: false,
      error: "An error occurred while signing in.",
    });
  }
}
