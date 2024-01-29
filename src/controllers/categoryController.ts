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
};
