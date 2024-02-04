import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { userService } from "../services/userServices";

export const userController = {
  show: async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user!;

    try {
      return res.json(user);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  watching: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;

    try {
      const watching = await userService.getKeepWatchingList(userId);

      return res.json(watching);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
};
