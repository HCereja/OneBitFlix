import { filterEpisodesByCourse } from "../helpers/filterEpisodesByCourse";
import { User } from "../models";
import { UserCreationAttributes } from "../models/User";

export const userService = {
  findByEmail: async (email: string) => {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    return user;
  },

  create: async (attributes: UserCreationAttributes) => {
    const user = await User.create(attributes);

    return user;
  },

  getKeepWatchingList: async (userId: number) => {
    const user = await User.findByPk(userId, {
      include: {
        association: "Episodes",
        attributes: [
          "id",
          "name",
          "synopsis",
          "order",
          ["video_url", "videoUrl"],
          ["seconds_long", "secondsLong"],
          ["course_id", "courseId"],
        ],
        include: [
          {
            association: "Course",
            attributes: [
              "id",
              "name",
              "synopsis",
              ["thumbnail_url", "thumbnailUrl"],
            ],
            as: "course",
          },
        ],
        through: {
          as: "watchTime",
          attributes: ["seconds", ["updated_at", "updatedAt"]],
        },
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const keepWatchingList = filterEpisodesByCourse(user.Episodes!);

    keepWatchingList.sort((a, b) =>
      //@ts-ignore
      a.watchTime!.updatedAt < b.watchTime!.updatedAt ? 1 : -1
    );

    return keepWatchingList;
  },
};
