import { Router } from "express";
import {
  getRepuestos,
  getRepuesto,
  createRepuesto,
  updateRepuesto,
  deleteRepuesto,
  updateRepuestoNewImg,
} from "../controllers/repuestos.controller.js";
import upload from "../middlewares/multerConfig.js";
import { requireAuth } from "../middlewares/requireAuth.js";

const repuestosRouter = Router();

repuestosRouter.get("/", getRepuestos);

repuestosRouter.get("/:id", getRepuesto);

repuestosRouter.post(
  "/",
  requireAuth,
  upload.single("imgRepuesto"),
  createRepuesto
);

repuestosRouter.put("/:id", requireAuth, updateRepuesto);

repuestosRouter.put(
  "/:id/new",
  requireAuth,
  upload.single("imgRepuesto"),
  updateRepuestoNewImg
);

repuestosRouter.delete("/:id", requireAuth, deleteRepuesto);

export default repuestosRouter;
