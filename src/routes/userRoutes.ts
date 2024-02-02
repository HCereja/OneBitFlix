import express from "express";
import { authController } from "../controllers/authController";

const userRouter = express.Router();

userRouter.post("/auth/register", authController.register);
userRouter.post("/auth/login", authController.login);

export { userRouter };
