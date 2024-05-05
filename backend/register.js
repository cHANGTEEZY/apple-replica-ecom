import pg from "pg";
import bcrypt from "bcrypt";

const pool = new pg.Pool({
  user: "changteezy",
  host: "localhost",
  database: "postgres",
  password: "changteezy",
  port: 5432,
});

async function hashPassword(plaintextPassword) {
  try {
    if (!plaintextPassword) {
      throw new Error("Password is empty or undefined");
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(plaintextPassword, salt);
    return hash;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
}

export async function registerUser(req, res) {
  // Set CORS headers to allow requests from any origin
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const { firstName, lastName, email, password, phoneNumber } = req.body;

  try {
    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Insert user details into the database
    const query =
      "INSERT INTO user_details (username, email, password, user_phone) VALUES ($1, $2, $3, $4) RETURNING user_id";
    const { rows } = await pool.query(query, [
      `${firstName} ${lastName}`,
      email,
      hashedPassword,
      phoneNumber,
    ]);
    const userId = rows[0].user_id;

    res.status(201).json({ success: true, userId });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      success: false,
      error: "An error occurred while registering the user.",
    });
  }
}
