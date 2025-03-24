import { Router } from "express";
import { getUsuarios, createUsuario, deleteUsuario } from "../controllers/usuarios.controller.js";

const usuariosRouter = Router();

usuariosRouter.get("/", getUsuarios);

usuariosRouter.post("/", createUsuario);

usuariosRouter.delete("/:id", deleteUsuario);

export default usuariosRouter;
