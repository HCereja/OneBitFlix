import express from "express";
import { categoriesController } from "../controllers/categoriesController";

const categoryRouter = express.Router();

categoryRouter.get("/categories", categoriesController.index);

export { categoryRouter };
