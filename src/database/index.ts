import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  database: "onebitflix",
  username: "postgres",
  password: "senha123",
  define: {
    underscored: true,
  },
});
