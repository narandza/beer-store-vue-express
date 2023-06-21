import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectToDatabase from "../db.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();
require("dotenv").config();
const jwtSecretKey = process.env.JWT_SECRET_KEY;

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const db = await connectToDatabase();
    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = uuidv4();

    const newUser = {
      id: userId,
      name,
      email,
      password: hashedPassword,
      cartItems: [],
      role: "user",
    };

    await db.collection("users").insertOne(newUser, { _id: 0 }); // Exclude _id field

    res.json(newUser);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Error registering user" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const db = await connectToDatabase();
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, jwtSecretKey);

    res.json({ token, user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Error logging in" });
  }
});

export default router;
