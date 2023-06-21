import { connectToDatabase } from "../db.js";

async function populateCartIds(ids) {
  try {
    const validIds = ids.filter((id) => typeof id === "number" && !isNaN(id));
    const db = await connectToDatabase();
    return Promise.all(
      validIds.map(async (id) => {
        const product = await db
          .collection("products")
          .findOne({ id: parseInt(id) });
        return product;
      })
    );
  } catch (error) {
    console.error("Error populating cart items:", error);
    throw new Error("Failed to populate cart items");
  }
}

export { populateCartIds };
