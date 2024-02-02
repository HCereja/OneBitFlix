import express from "express";
import { episodesController } from "../controllers/episodeController";

const episodeRouter = express.Router();

episodeRouter.get("/episodes/stream", episodesController.stream);

export { episodeRouter };
