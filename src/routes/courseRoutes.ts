import express from "express";
import { coursesController } from "../controllers/courseController";
import { ensureAuth } from "../middlewares/auth";

const courseRouter = express.Router();

courseRouter.get("/courses/featured", ensureAuth, coursesController.featured);
courseRouter.get("/courses/newest", coursesController.newest);
courseRouter.get("/courses/search", ensureAuth, coursesController.search);
courseRouter.get("/courses/:id", ensureAuth, coursesController.show);

export { courseRouter };
