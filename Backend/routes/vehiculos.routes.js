import { Router } from "express";
import {
  getVehiculos,
  getVehiculo,
  createVehiculo,
  updateVehiculo,
  deleteVehiculo,
  updateVehiculoNewImg,
} from "../controllers/vehiculos.controller.js";
import upload from "../middlewares/multerConfig.js";
import { requireAuth } from "../middlewares/requireAuth.js";

const vehiculosRouter = Router();

vehiculosRouter.get("/", getVehiculos);

vehiculosRouter.get("/:id", getVehiculo);

vehiculosRouter.post(
  "/",
  requireAuth,
  upload.single("imgvehiculo"),
  createVehiculo
);

vehiculosRouter.put("/:id", requireAuth, updateVehiculo);

vehiculosRouter.put(
  "/:id/new",
  requireAuth,
  upload.single("imgvehiculo"),
  updateVehiculoNewImg
);

vehiculosRouter.delete("/:id", requireAuth, deleteVehiculo);

export default vehiculosRouter;
