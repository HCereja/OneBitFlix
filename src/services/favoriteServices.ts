import { Favorite } from "../models";

export const favoriteServices = {
  create: async (userId: number, courseId: number) => {
    const favorite = Favorite.create({
      courseId: courseId,
      userId: userId,
    });

    return favorite;
  },

  findByUserId: async (userId: number) => {
    const favorites = await Favorite.findAll({
      where: { userId: userId },
      include: {
        association: "Course",
        attributes: [
          "id",
          "name",
          "synopsis",
          ["thumbnail_url", "thumbnailUrl"],
        ],
      },
      attributes: ["user_id", "userId"],
    });

    return { userId, courses: favorites.map((fav) => fav.Course) };
  },

  delete: async (userId: number, courseId: number) => {
    await Favorite.destroy({
      where: { userId: userId, courseId: courseId },
    });
  },

  isFavorited: async (userId: number, courseId: number) => {
    const favorite = await Favorite.findOne({
      where: { courseId: courseId, userId: userId },
    });

    return favorite ? true : false;
  },
};
