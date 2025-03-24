import { Router } from "express";
import { getRepuestos, getRepuesto, createRepuesto, updateRepuesto, deleteRepuesto } from "../controllers/repuestos.controller.js";

const repuestosRouter = Router();

repuestosRouter.get("/", getRepuestos);

repuestosRouter.get("/:id", getRepuesto);

repuestosRouter.post("/", createRepuesto);

repuestosRouter.put("/:id", updateRepuesto);

repuestosRouter.delete("/:id", deleteRepuesto);

export default repuestosRouter;