import express from "express";
import pg from "pg";

import { registerUser } from "./register.js";
import { signInUser } from "./signin.js";
// import chargePayment from "./stripCheckout.js";

const app = express();
const port = 3000;

const pool = new pg.Pool({
  user: "changteezy",
  host: "localhost",
  database: "postgres",
  password: "changteezy",
  port: 5432,
});

// Middleware to enable CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  ); // Allow the specified HTTP methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow the specified headers
  if (req.method === "OPTIONS") {
    res.sendStatus(200); // Respond to preflight requests
  } else {
    next();
  }
});

app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Endpoint to handle user registration
app.post("/register", registerUser);

// Endpoint to handle user sign-in
app.post("/signin", signInUser);

app.post("/charge", async (req, res) => {
  const { paymentMethodId, amount, receiptEmail } = req.body;

  try {
    const result = await chargePayment(paymentMethodId, amount, receiptEmail);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
