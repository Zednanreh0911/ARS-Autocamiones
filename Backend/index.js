import express from "express";
import cors from "cors";
import vehiculosRouter from "./routes/vehiculos.routes.js";
import repuestosRouter from "./routes/repuestos.routes.js";
import usuariosRouter from "./routes/usuarios.routes.js";
import { PORT } from "./config.js";

const app = express();

const SERVER_PORT = PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Endpoints
app.use("/vehiculos", vehiculosRouter);

app.use("/repuestos", repuestosRouter);

app.use("/usuarios", usuariosRouter);

//Puerto
app.listen(SERVER_PORT, () => {
  console.log("Server is running on http://localhost:" + SERVER_PORT);
});
