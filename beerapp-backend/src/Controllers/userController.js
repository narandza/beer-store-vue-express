import express from "express";
import connectToDatabase from "../db.js";
import { populateCartIds } from "./cartController.js";

const router = express.Router();

router.get("/:userId/cart", async (req, res) => {
  try {
    const userId = req.params.userId;
    const db = await connectToDatabase();
    const user = await db.collection("users").findOne({ id: userId });

    const existingUser = await db.collection("users").findOne({ id: userId });

    if (!existingUser) {
      await db.collection("users").insertOne({ id: userId, cartItems: [] });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const populatedCart = await populateCartIds(
      user?.cartItems.map(Number) || []
    );
    res.json(populatedCart);
  } catch (error) {
    console.error("Error fetching user cart:", error);
    res.status(500).json({ error: "Error fetching user cart" });
  }
});

router.post("/:userId/cart", async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = parseInt(req.body.productId);
    const db = await connectToDatabase();

    const existingUser = await db.collection("users").findOne({ id: userId });

    if (!existingUser) {
      await db.collection("users").insertOne({ id: userId, cartItems: [] });
    }

    await db.collection("users").updateOne(
      { id: userId },
      {
        $addToSet: { cartItems: productId },
      }
    );

    const user = await db.collection("users").findOne({ id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.cartItems) {
      return res.status(404).json({ error: "Cart items not found" });
    }

    const populatedCart = await populateCartIds(user?.cartItems || []);
    res.json(populatedCart);
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ error: "Error adding product to cart" });
  }
});

router.delete("/:userId/cart/:productId", async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    const userId = req.params.userId;
    const db = await connectToDatabase();

    await db.collection("users").updateOne(
      { id: userId },
      {
        $pull: { cartItems: productId },
      }
    );

    const user = await db.collection("users").findOne({ id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.cartItems) {
      return res.status(404).json({ error: "Cart items not found" });
    }

    const populatedCart = await populateCartIds(user?.cartItems || []);
    res.json(populatedCart);
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ error: "Error removing product from cart" });
  }
});

export default router;
