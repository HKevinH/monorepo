import { Router } from "express";
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../core/handlers/user/handlers";

export const usersRouter = Router();

usersRouter.post("/create", createUser);
usersRouter.get("/get", getUsers);
usersRouter.put("/:id", updateUser);
usersRouter.delete("/:id", deleteUser);
