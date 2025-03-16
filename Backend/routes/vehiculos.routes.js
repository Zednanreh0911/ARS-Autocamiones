import { Router } from "express";
import { getVehiculos, getVehiculo, createVehiculo, updateVehiculo, deleteVehiculo  } from "../controllers/vehiculos.controller.js";

const vehiculosRouter = Router();

vehiculosRouter.get("/", getVehiculos);

vehiculosRouter.get("/:id", getVehiculo);

vehiculosRouter.post("/", createVehiculo);

vehiculosRouter.put("/:id", updateVehiculo);

vehiculosRouter.delete("/:id", deleteVehiculo);

export default vehiculosRouter;