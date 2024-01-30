import express from "express";
import { coursesController } from "../controllers/courseController";

const courseRouter = express.Router();

courseRouter.get("/courses/:id", coursesController.show);

export { courseRouter };
