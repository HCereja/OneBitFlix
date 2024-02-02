import express from "express";
import { sequelize } from "./database";
import { adminJs, adminJsRouter } from "./adminjs";
import { categoryRouter } from "./routes/categoryRoutes";
import { courseRouter } from "./routes/courseRoutes";
import { episodeRouter } from "./routes/episodeRoutes";

const app = express();

app.use(express.static("public"));

//AdminJs
app.use(adminJs.options.rootPath, adminJsRouter);

//Rotas
app.use(categoryRouter);
app.use(courseRouter);
app.use(episodeRouter);

//Iniciando servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  sequelize.authenticate().then(() => {
    console.log("DB conectado com sucesso");
  });
  console.log(`Servidor rodando na porta ${PORT}`);
});
