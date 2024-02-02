import express from "express";
import { categoriesController } from "../controllers/categoryController";
import { ensureAuth } from "../middlewares/auth";

const categoryRouter = express.Router();

categoryRouter.get("/categories", ensureAuth, categoriesController.index);
categoryRouter.get("/categories/:id", ensureAuth, categoriesController.show);

export { categoryRouter };
