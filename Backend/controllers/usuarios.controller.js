import client from "../db.js";
import jwt from "jsonwebtoken";

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
      "INSERT INTO usuarios (nombre, contraseña, rol) VALUES ($1, $2, $3) RETURNING id_usuario",
      [name, password, "admin"]
    );
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
    const response = await client.query(
      "DELETE FROM usuarios WHERE id_usuario = $1",
      [id]
    );
    if (response.rowCount === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
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
