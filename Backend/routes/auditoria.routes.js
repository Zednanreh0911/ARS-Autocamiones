import { Router } from "express";
import {
  getAuditoria,
  createAuditoria,
} from "../controllers/auditoria.controller.js";
import { requireAuth } from "../middlewares/requireAuth.js";

const auditoriaRouter = Router();

auditoriaRouter.get("/", requireAuth, getAuditoria);
auditoriaRouter.post("/", requireAuth, createAuditoria);

export default auditoriaRouter;
