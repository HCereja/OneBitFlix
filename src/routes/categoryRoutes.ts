import express from "express";
import { categoriesController } from "../controllers/categoryController";

const categoryRouter = express.Router();

categoryRouter.get("/categories", categoriesController.index);
categoryRouter.get("/categories/:id", categoriesController.show);

export { categoryRouter };
