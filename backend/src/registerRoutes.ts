import { Application } from "express";
import { usersRouter } from "./routes/user.routes";
import { productRoutes } from "./routes/product.routes";
import { purchaseRouter } from "./routes/purchase.routes";
export const registerRoutes = (app: Application) => {
  app.get("/api", (req, res) => {
    res.send("Hello, world!");
  });

  app.use("/api/users", usersRouter);
  app.use("/api/products", productRoutes);
  app.use("/api/purchases", purchaseRouter);
};
