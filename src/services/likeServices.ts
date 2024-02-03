import { Like } from "../models";

export const likeService = {
  create: async (userId: number, courseId: number) => {
    const like = await Like.create({
      userId: userId,
      courseId: courseId,
    });

    return like;
  },

  delete: async (userId: number, courseId: number) => {
    await Like.destroy({
      where: { userId: userId, courseId: courseId },
    });
  },

  isLiked: async (userId: number, courseId: number) => {
    const like = await Like.findOne({
      where: { courseId: courseId, userId: userId },
    });

    return like ? true : false;
  },
};
