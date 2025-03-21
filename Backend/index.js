import express from "express";
import vehiculosRouter from "./routes/vehiculos.routes.js";
import repuestosRouter from "./routes/repuestos.routes.js";
import usuariosRouter from "./routes/usuarios.routes.js";

const app = express();

app.use(express.json());

//Endpoints
app.use("/vehiculos", vehiculosRouter);

app.use("/repuestos", repuestosRouter);

app.use("/usuarios", usuariosRouter);

// await client.connect();
// const res = await client.query("SELECT * FROM repuestos");
// console.log(res.rows);
// await client;

//Puerto
app.listen(6969, () => {
  console.log("Server is running on http://localhost:6969");
});
