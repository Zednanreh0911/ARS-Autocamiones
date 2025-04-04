import { Router } from "express";
import {
  getRepuestos,
  getRepuesto,
  createRepuesto,
  updateRepuesto,
  deleteRepuesto,
} from "../controllers/repuestos.controller.js";
import upload from "../middlewares/multerConfig.js";

const repuestosRouter = Router();

repuestosRouter.get("/", getRepuestos);

repuestosRouter.get("/:id", getRepuesto);

repuestosRouter.post("/", upload.single("imgRepuesto"), createRepuesto);

repuestosRouter.put("/:id", updateRepuesto);

repuestosRouter.delete("/:id", deleteRepuesto);

export default repuestosRouter;
