import { Router } from "express";
import {
  getVehiculos,
  getVehiculo,
  createVehiculo,
  updateVehiculo,
  deleteVehiculo,
} from "../controllers/vehiculos.controller.js";
import upload from "../middlewares/multerConfig.js";

const vehiculosRouter = Router();

vehiculosRouter.get("/", getVehiculos);

vehiculosRouter.get("/:id", getVehiculo);

vehiculosRouter.post("/", upload.single("imgvehiculo"), createVehiculo);

vehiculosRouter.put("/:id", updateVehiculo);

vehiculosRouter.delete("/:id", deleteVehiculo);

export default vehiculosRouter;
