import express from "express";
import { episodesController } from "../controllers/episodeController";
import { ensureAuth, ensureAuthViaQuery } from "../middlewares/auth";

const episodeRouter = express.Router();

episodeRouter.get(
  "/episodes/stream",
  ensureAuthViaQuery,
  episodesController.stream
);
episodeRouter.get(
  "/episodes/:id/watchTime",
  ensureAuth,
  episodesController.getWatchTime
);
episodeRouter.post(
  "/episodes/:id/watchTime",
  ensureAuth,
  episodesController.setWatchTime
);

export { episodeRouter };
