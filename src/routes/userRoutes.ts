import express from "express";
import { authController } from "../controllers/authController";
import { ensureAuth } from "../middlewares/auth";
import { userController } from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/auth/register", authController.register);
userRouter.post("/auth/login", authController.login);
userRouter.get("/users/current/watching", ensureAuth, userController.watching);
userRouter.get("/users/current", ensureAuth, userController.show);

export { userRouter };
