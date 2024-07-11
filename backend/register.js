import pg from "pg";
import bcrypt from "bcrypt";

const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "changteezy",
  port: 5432,
});

async function hashPassword(plaintextPassword) {
  try {
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
  const { firstName, lastName, email, password, phoneNumber } = req.body;

  try {
    // Check if user with the same username or email already exists
    const checkQuery =
      "SELECT * FROM user_details WHERE username = $1 OR email = $2";
    const { rows: existingUsers } = await pool.query(checkQuery, [
      `${firstName} ${lastName}`,
      email,
    ]);

    if (existingUsers.length > 0) {
      return res.status(400).json({
        success: false,
        error: "User with the same username or email already exists.",
      });
    }

    // If no duplicate user found, proceed with registration
    const hashedPassword = await hashPassword(password);

    const insertQuery =
      "INSERT INTO user_details (username, email, password, user_phone) VALUES ($1, $2, $3, $4) RETURNING user_id";
    const { rows } = await pool.query(insertQuery, [
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
