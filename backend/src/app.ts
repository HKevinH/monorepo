import express, { Application } from "express";
import cors from "cors";
import { json } from "body-parser";
import dotenv from "dotenv";
import { registerRoutes } from "./registerRoutes";

dotenv.config();

const createApp = (): Application => {
  const app = express();

  app.use(cors());
  app.use(json());

  registerRoutes(app);
  return app;
};

export default createApp;
