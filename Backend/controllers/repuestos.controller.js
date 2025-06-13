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
    const response = await pool.query(
      "SELECT * FROM repuestos WHERE id_repuesto = $1",
      [id]
    );
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

    const imagen = `src/assets/${req.savedFilename}`; // Obtener el nombre del archivo guardado
    const { nombre, marca, cantidad, categoria, precio_unitario } = req.body;

    const response = await pool.query(
      "INSERT INTO repuestos (nombre, marca, cantidad, categoria, precio_unitario, imagen_url) VALUES ($1, $2, $3, $4, $5, $6)",
      [nombre, marca, cantidad, categoria, precio_unitario, imagen]
    );
    res.status(200).json({
      message: "Repuesto creado",
      body: {
        repuesto: {
          nombre,
          marca,
          cantidad,
          categoria,
          precio_unitario,
          imagen,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRepuesto = async (req, res) => {
  try {
    const { id } = req.params;

    const { nombre, marca, cantidad, categoria, precio_unitario, imagen_url } =
      req.body;

    const response = await pool.query(
      `UPDATE repuestos 
       SET nombre = $1, marca = $2, cantidad = $3, categoria = $4, precio_unitario = $5, imagen_url = $6
       WHERE id_repuesto = $7 RETURNING *`,
      [nombre, marca, cantidad, categoria, precio_unitario, imagen_url, id]
    );

    if (response.rowCount === 0) {
      return res.status(404).json({ message: "Repuesto no encontrado" });
    }

    res.status(200).json({
      message: "Repuesto actualizado",
      body: {
        Repuesto: response.rows[0],
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRepuestoNewImg = async (req, res) => {
  try {
    const { nombre, marca, cantidad, categoria, precio_unitario } = req.body;
    const { id } = req.params;

    if (!req.savedFilename) {
      return res.status(400).json({ message: "No se ha subido una imagen" });
    }
    const imagen = `src/assets/${req.savedFilename}`;

    const response = await pool.query(
      `UPDATE repuestos 
       SET nombre = $1, marca = $2, cantidad = $3, categoria = $4, precio_unitario = $5, imagen_url = $6
       WHERE id_repuesto = $7 RETURNING *`,
      [nombre, marca, cantidad, categoria, precio_unitario, imagen, id]
    );

    if (response.rowCount === 0) {
      return res.status(404).json({ message: "Repuesto no encontrado" });
    }

    res.status(200).json({
      message: "Repuesto actualizado con nueva imagen",
      body: {
        repuesto: response.rows[0],
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error.message " });
  }
};

export const deleteRepuesto = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query(
      "DELETE FROM repuestos WHERE id_repuesto = $1",
      [id]
    );
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
