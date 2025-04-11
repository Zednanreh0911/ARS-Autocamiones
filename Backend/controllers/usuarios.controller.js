import client from "../db.js";

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
    const { user, password } = req.body;
    const response = await client.query(
      "SELECT * FROM usuarios WHERE name = $1 AND password = $2",
      [user, password]
    );
    if (response.rows.length === 0) {
      return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
    }
    res.status(200).json({
      message: "Usuario autenticado",
      body: {
        usuario: response.rows[0],
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const createUsuario = async (req, res) => {
  try {
    const { name, password } = req.body;
    const response = await client.query(
      "INSERT INTO usuarios (name, password) VALUES ($1, $2)",
      [name, password]
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
    const response = await client.query("DELETE FROM usuarios WHERE id = $1", [
      id,
    ]);
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
