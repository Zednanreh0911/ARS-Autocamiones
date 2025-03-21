import pool from "../db.js";

export const getRepuestos = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM repuestos");
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
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createRepuesto = async (req, res) => {
  try {
    const { name, marca, cantidad } = req.body;
    const response = await pool.query(
      "INSERT INTO repuestos (name, marca, cantidad) VALUES ($1, $2, $3)",
      [name, marca, cantidad]
    );
    res.status(200).json({
      message: "Repuesto creado",
      body: {
        repuesto: { name, marca, cantidad },
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRepuesto = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, marca, cantidad } = req.body;
    const response = await pool.query(
      "UPDATE repuestos SET name = $1, marca = $2, cantidad = $3 WHERE id = $4",
      [name, marca, cantidad, id]
    );
    res.status(200).json({
      message: "Repuesto actualizado",
      body: {
        repuesto: { name, marca, cantidad },
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
    res.status(200).json({
      message: "Repuesto eliminado",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
