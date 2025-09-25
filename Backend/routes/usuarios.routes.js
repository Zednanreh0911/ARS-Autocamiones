import { Router } from "express";
import {
  getUsuarios,
  createUsuario,
  deleteUsuario,
  loginUsuario,
  logoutUsuario,
} from "../controllers/usuarios.controller.js";
import { requireAuth } from "../middlewares/requireAuth.js";
import { hashPassword, comparePassword } from "../middlewares/hashedPass.js";

const usuariosRouter = Router();

usuariosRouter.get("/", getUsuarios);

usuariosRouter.post("/login", comparePassword, loginUsuario);

usuariosRouter.post("/", requireAuth, hashPassword, createUsuario);

usuariosRouter.delete("/:id", requireAuth, deleteUsuario);

usuariosRouter.post("/logout", logoutUsuario);

export default usuariosRouter;
