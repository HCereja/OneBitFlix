import express from "express";
import { ensureAuth } from "../middlewares/auth";
import { likeController } from "../controllers/likeController";

const likeRouter = express.Router();

likeRouter.post("/likes", ensureAuth, likeController.save);
likeRouter.delete("/likes/:id", ensureAuth, likeController.delete);

export { likeRouter };
