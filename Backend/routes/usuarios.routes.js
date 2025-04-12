import { Router } from "express";
import {
  getUsuarios,
  createUsuario,
  deleteUsuario,
  loginUsuario,
} from "../controllers/usuarios.controller.js";
import { hashPassword, comparePassword } from "../middlewares/hashedPass.js";

const usuariosRouter = Router();

usuariosRouter.get("/", getUsuarios);

usuariosRouter.post("/login", comparePassword, loginUsuario);

usuariosRouter.post("/", hashPassword, createUsuario);

usuariosRouter.delete("/:id", deleteUsuario);

export default usuariosRouter;
