import pool from "../db.js";

export const getRepuestos = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM repuestos");
    if (response.rows.length === 0) {
      return res.status(404).json({ message: "Repuestos no encontrados" });
    }
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRepuesto = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query("SELECT * FROM repuestos WHERE id = $1", [
      id,
    ]);
    if (response.rows.length === 0) {
      return res.status(404).json({ message: "Repuesto no encontrado" });
    }
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createRepuesto = async (req, res) => {
  try {
    if (!req.savedFilename) {
      return res.status(400).json({ message: "No se ha subido una imagen" });
    }

    const img = `src/assets/${req.savedFilename}`; // Obtener el nombre del archivo guardado
    const { name, marca, cantidad, cat, precio } = req.body;
    const response = await pool.query(
      "INSERT INTO repuestos (name, marca, cantidad, cat, precio, img) VALUES ($1, $2, $3, $4, $5, $6)",
      [name, marca, cantidad, cat, precio, img]
    );
    res.status(200).json({
      message: "Repuesto creado",
      body: {
        repuesto: { name, marca, cantidad, precio, img },
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRepuesto = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, marca, cantidad, precio, img } = req.body;
    const response = await pool.query(
      "UPDATE repuestos SET name = $1, marca = $2, cantidad = $3, precio = $4, img = $5 WHERE id = $6",
      [name, marca, cantidad, precio, img, id]
    );
    res.status(200).json({
      message: "Repuesto actualizado",
      body: {
        repuesto: { name, marca, cantidad, precio, img },
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRepuesto = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query("DELETE FROM repuestos WHERE id = $1", [
      id,
    ]);
    if (response.rowCount === 0) {
      return res.status(404).json({ message: "Repuesto no encontrado" });
    }
    res.status(200).json({
      message: "Repuesto eliminado",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
