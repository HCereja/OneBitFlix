import { Category } from "./Category";
import { Course } from "./Course";
import { Episode } from "./Episode";
import { User } from "./User";
import { Favorite } from "./Favorite";

Category.hasMany(Course, { as: "courses" });

Course.belongsTo(Category);
Course.hasMany(Episode, { as: "episodes" });
Course.belongsToMany(User, { through: Favorite });
Course.hasMany(Favorite, { as: "FavoriteUsers", foreignKey: "course_id" });

Episode.belongsTo(Course);

User.belongsToMany(Course, { through: Favorite });
User.hasMany(Favorite, { as: "FavoriteCourses", foreignKey: "course_id" });

Favorite.belongsTo(Course);
Favorite.belongsTo(User);

export { Category, Course, Episode, User, Favorite };
