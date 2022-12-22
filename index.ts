import express, { Application } from "express";
import cors from "cors";
import { connectDatabase } from "./database";

// Routes import
import AuthenticateRoute from "./routes/Authenticate";
import GondolasRoute from "./routes/Gondola";
import ImagesRoute from "./routes/Authenticate";
import UsersRoute from "./routes/Authenticate";

const App: Application = express();

// Middlewares
App.use(cors());
App.use(express.urlencoded({ extended: true }));
App.use(express.json());
App.use(express.static(__dirname + "/uploads"));

// Routes
App.use("/api/login", AuthenticateRoute);
App.use("/api/gondolas", GondolasRoute);
App.use("/api/imagem", ImagesRoute);
App.use("/api/usuarios", UsersRoute);

// Rota pra validar o status da API
App.get("/", (_, res) => {
   let response = JSON.stringify({
      "api-version": "v1",
      descricao: "API utilizada para o Back End do Planograma da PHC.",
   });
   res.status(200).send(response);
});

// Database and server initialization
connectDatabase();
App.listen(process.env.PORT || 9992, () => {
   console.log(
      `Servidor iniciado e rodando na porta: ${process.env.PORT || 9992}`
   );
});
