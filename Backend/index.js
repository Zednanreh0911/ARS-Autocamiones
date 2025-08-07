import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import vehiculosRouter from "./routes/vehiculos.routes.js";
import repuestosRouter from "./routes/repuestos.routes.js";
import usuariosRouter from "./routes/usuarios.routes.js";
import { PORT } from "./config.js";

const app = express();

const SERVER_PORT = PORT;

// Configuración CORS para permitir credenciales y origen específico
app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.0.103:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/vehiculos", vehiculosRouter);

app.use("/repuestos", repuestosRouter);

app.use("/usuarios", usuariosRouter);

app.listen(SERVER_PORT, () => {
  console.log("Server is running on http://localhost:" + SERVER_PORT);
});
