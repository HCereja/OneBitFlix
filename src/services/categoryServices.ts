import { Category } from "../models";

export const categoryService = {
  findAllPaginated: async (page: number, perPage: number) => {
    const offset = (page - 1) * perPage;

    const { count, rows } = await Category.findAndCountAll({
      attributes: ["id", "name"],
      order: [["position", "ASC"]],
      limit: perPage,
      offset: offset,
    });

    const totalPages = Math.ceil(count / perPage);

    return {
      categories: rows,
      page: page,
      perPage: perPage,
      total: count,
      totalPages: totalPages,
    };
  },

  findByIdWithCourses: async (id: string) => {
    const categoryWithCourses = await Category.findByPk(id, {
      attributes: ["id", "name"],
      include: {
        association: "courses",
        attributes: [
          "id",
          "name",
          "synopsis",
          ["thumbnail_url", "thumbnailUrl"],
        ],
      },
    });

    return categoryWithCourses;
  },
};
