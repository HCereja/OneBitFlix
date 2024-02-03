import express from "express";
import { episodesController } from "../controllers/episodeController";
import { ensureAuth, ensureAuthViaQuery } from "../middlewares/auth";
import { favoritesController } from "../controllers/favoriteController";

const episodeRouter = express.Router();

episodeRouter.get(
  "/episodes/stream",
  ensureAuthViaQuery,
  episodesController.stream
);
episodeRouter.post("/favorites", ensureAuth, favoritesController.save);

export { episodeRouter };
