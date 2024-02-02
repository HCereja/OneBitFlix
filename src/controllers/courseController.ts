import { Request, Response } from "express";
import { courseService } from "../services/courseServices";
import { getPaginationParams } from "../helpers/getPaginationParams";

export const coursesController = {
  show: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const course = await courseService.findByIdWithEpisodes(id);

      return res.json(course);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  featured: async (req: Request, res: Response) => {
    try {
      const course = await courseService.getFeaturedCourses();

      return res.json(course);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  newest: async (req: Request, res: Response) => {
    try {
      const course = await courseService.getTopTenNewest();

      return res.json(course);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  search: async (req: Request, res: Response) => {
    const [pageNumber, perPageNumber] = getPaginationParams(req.query);
    const { name } = req.query;

    try {
      if (typeof name !== "string") {
        throw new Error("name param must be a string");
      }

      const course = await courseService.findByName(
        name,
        pageNumber,
        perPageNumber
      );
      return res.json(course);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
};
