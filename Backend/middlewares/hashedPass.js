import bcrypt from "bcryptjs";
import pool from "../db.js";

export const hashPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    if (password) {
      const saltRounds = 10;
      req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Error al hashear la contraseña", error });
  }
};

export const comparePassword = async (req, res, next) => {
  try {
    const { user, password } = req.body;
    console.log("Datos de inicio de sesión:", req.body);
    if (!user || !password) {
      return res
        .status(400)
        .json({ message: "Usuario y contraseña requeridos" });
    }

    const result = await pool.query(
      "SELECT contraseña FROM usuarios WHERE nombre = $1",
      [user]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const storedPassword = result.rows[0].contraseña;

    const isMatch = await bcrypt.compare(password, storedPassword);

    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    req.isMatch = isMatch;

    next();
  } catch (error) {
    res.status(500).json({ message: "Error al comparar la contraseña", error });
  }
};
