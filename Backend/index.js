import express from "express";
import cors from "cors";
import vehiculosRouter from "./routes/vehiculos.routes.js";
import repuestosRouter from "./routes/repuestos.routes.js";
import usuariosRouter from "./routes/usuarios.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

//Endpoints
app.use("/vehiculos", vehiculosRouter);

app.use("/repuestos", repuestosRouter);

app.use("/usuarios", usuariosRouter);

//Puerto
app.listen(6969, () => {
  console.log("Server is running on http://localhost:6969");
});
