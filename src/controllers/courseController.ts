import { Request, Response } from "express";
import { courseService } from "../services/courseServices";

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
};
