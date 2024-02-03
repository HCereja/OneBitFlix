import express from "express";
import { episodesController } from "../controllers/episodeController";
import { ensureAuthViaQuery } from "../middlewares/auth";

const episodeRouter = express.Router();

episodeRouter.get(
  "/episodes/stream",
  ensureAuthViaQuery,
  episodesController.stream
);

export { episodeRouter };
