import { Favorite } from "../models";

export const favoriteServices = {
  create: async (userId: number, courseId: number) => {
    const favorite = Favorite.create({
      courseId: courseId,
      userId: userId,
    });

    return favorite;
  },
};
