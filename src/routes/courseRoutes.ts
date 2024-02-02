import express from "express";
import { coursesController } from "../controllers/courseController";

const courseRouter = express.Router();

courseRouter.get("/courses/featured", coursesController.featured);
courseRouter.get("/courses/newest", coursesController.newest);
courseRouter.get("/courses/search", coursesController.search);
courseRouter.get("/courses/:id", coursesController.show);

export { courseRouter };
