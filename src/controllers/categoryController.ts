import { Request, Response } from "express";
import { categoryService } from "../services/categoryServices";
import { getPaginationParams } from "../helpers/getPaginationParams";

export const categoriesController = {
  index: async (req: Request, res: Response) => {
    const [pageNumber, perPageNumber] = getPaginationParams(req.query);

    try {
      const categories = await categoryService.findAllPaginated(
        pageNumber,
        perPageNumber
      );

      return res.json(categories);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  show: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const category = await categoryService.findByIdWithCourses(id);

      return res.json(category);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
};
