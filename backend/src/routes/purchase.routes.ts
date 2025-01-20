import { Router } from "express";
import {
  createPurchase,
  getPurchases,
  updatePurchase,
  deletePurchase,
  getPurchasesByUserId,
} from "../core/handlers/purchase/handlers";

export const purchaseRouter = Router();

purchaseRouter.post("/create", createPurchase);
purchaseRouter.get("/get", getPurchases);
purchaseRouter.put("/:id", updatePurchase);
purchaseRouter.delete("/delete/:id", deletePurchase);
purchaseRouter.get("/user/:userId", getPurchasesByUserId);
