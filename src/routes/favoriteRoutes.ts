import express from "express";
import { ensureAuth } from "../middlewares/auth";
import { favoritesController } from "../controllers/favoriteController";

const favoriteRouter = express.Router();

favoriteRouter.post("/favorites", ensureAuth, favoritesController.save);
favoriteRouter.get("/favorites", ensureAuth, favoritesController.index);

export { favoriteRouter };
