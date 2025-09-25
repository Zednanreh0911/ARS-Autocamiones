import client from "../db.js";
import jwt from "jsonwebtoken";
import { registrarAuditoria } from "../utils/auditoriaUtils.js";

export const logoutUsuario = (req, res) => {
  res.clearCookie("auth", {
    httpOnly: true,
    sameSite: "lax",
    // secure: true, // Descomenta si usas HTTPS
  });
  res.status(200).json({ code: 200, message: "Logout exitoso" });
};

export const getUsuarios = async (req, res) => {
  try {
    const response = await client.query("SELECT * FROM usuarios");
    if (response.rows.length === 0) {
      return res.status(404).json({ message: "Usuarios no encontrados" });
    }
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUsuario = async (req, res) => {
  try {
    const isMatch = req.isMatch;
    const { user } = req.body;
    if (!isMatch) {
      return res
        .status(401)
        .json({ code: 401, message: "Credenciales incorrectas" });
    }
    const result = await client.query(
      "SELECT rol FROM usuarios WHERE nombre = $1",
      [user]
    );
    const rol = result.rows[0]?.rol || "consulta";

    const token = jwt.sign(
      { user, rol },
      process.env.JWT_SECRET || "supersecreto123",
      { expiresIn: "1d" }
    );

    res.cookie("auth", token, {
      //httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 día en ms
      sameSite: "lax",
      // secure: true,
    });

    res.status(200).json({ code: 200, message: "Login exitoso", rol, token });
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
};

export const createUsuario = async (req, res) => {
  try {
    const { name } = req.body;
    const password = req.body.password;

    const response = await client.query(
      "INSERT INTO usuarios (nombre, contraseña, rol) VALUES ($1, $2, $3) RETURNING *",
      [name, password, "admin"]
    );
    // Auditoría: registrar acción (si hay usuario autenticado)
    await registrarAuditoria({
      usuario_nombre: req.user?.user || null,
      accion: "crear_usuario",
      entidad_afectada: "usuarios",
      entidad_id: response.rows[0]?.id_usuario,
      detalle_anterior: null,
      detalle_nuevo: response.rows[0],
      ip_origen: req.ip || null,
    });
    res.status(200).json({
      message: "Usuario creado",
      body: {
        usuario: { name, password },
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    // Obtener estado anterior para auditoría
    const prevRes = await client.query(
      "SELECT * FROM usuarios WHERE id_usuario = $1",
      [id]
    );
    if (prevRes.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const usuarioAnterior = prevRes.rows[0];

    const response = await client.query(
      "DELETE FROM usuarios WHERE id_usuario = $1",
      [id]
    );
    if (response.rowCount === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Auditoría: registrar acción de eliminación
    await registrarAuditoria({
      usuario_nombre: req.user?.user || null,
      accion: "eliminar_usuario",
      entidad_afectada: "usuarios",
      entidad_id: id,
      detalle_anterior: usuarioAnterior,
      detalle_nuevo: null,
      ip_origen: req.ip || null,
    });

    res.status(200).json({
      message: "Usuario eliminado",
      body: {
        usuario: { id },
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
