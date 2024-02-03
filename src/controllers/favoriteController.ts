import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { favoriteServices } from "../services/favoriteServices";

export const favoritesController = {
  save: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    const { courseId } = req.body;

    try {
      const favorite = await favoriteServices.create(userId, Number(courseId));

      return res.status(201).json(favorite);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  index: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;

    try {
      const favorites = await favoriteServices.findByUserId(userId);

      return res.json(favorites);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
};
