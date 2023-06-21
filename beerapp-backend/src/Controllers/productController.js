import express from "express";
import connectToDatabase from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const products = await db.collection("products").find({}).toArray();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
});

router.get("/:productId", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const productId = parseInt(req.params.productId);
    const product = await db.collection("products").findOne({ id: productId });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error fetching product" });
  }
});

router.put("/:productId", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const productId = parseInt(req.params.productId);
    const { name, price, description } = req.body;

    const product = await db
      .collection("products")
      .findOneAndUpdate(
        { id: productId },
        { $set: { name, price, description } },
        { returnOriginal: false }
      );

    if (!product.value) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product.value);
  } catch (error) {
    res.status(500).json({ error: "Error updating product" });
  }
});

export default router;
