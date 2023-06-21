import express from "express";
import cors from "cors";
import productController from "./Controllers/productController";
import userController from "./Controllers/userController";
import authController from "./Controllers/authController";
import path from "path";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "../assets/")));

app.use("/api/auth", authController);
app.use("/api/products", productController);
app.use("/api/users", userController);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
