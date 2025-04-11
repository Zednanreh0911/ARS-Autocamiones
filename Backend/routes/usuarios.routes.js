import { Router } from "express";
import {
  getUsuarios,
  createUsuario,
  deleteUsuario,
  loginUsuario,
} from "../controllers/usuarios.controller.js";

const usuariosRouter = Router();

usuariosRouter.get("/", getUsuarios);

usuariosRouter.post("/login", loginUsuario);

usuariosRouter.post("/", createUsuario);

usuariosRouter.delete("/:id", deleteUsuario);

export default usuariosRouter;
