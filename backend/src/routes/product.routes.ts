import { Router } from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../core/handlers/product/handlers";

export const productRoutes = Router();

productRoutes.post("/create", createProduct);
productRoutes.get("/get", getProducts);
productRoutes.put("/:id", updateProduct);
productRoutes.delete("/:id", deleteProduct);
