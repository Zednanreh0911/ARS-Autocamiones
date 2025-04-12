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

    const result = await pool.query(
      "SELECT password FROM usuarios WHERE name = $1",
      [user]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const storedPassword = result.rows[0].password;

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
