import client from "../db.js";

export const getVehiculos = async (req, res) => {
  try {
    const response = await client.query("SELECT * FROM vehiculos");
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await client.query(
      "SELECT * FROM vehiculos WHERE id = $1",
      [id]
    );
    if (response.rows.length === 0) {
      return res.status(404).json({ message: "Vehiculo no encontrado" });
    }
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createVehiculo = async (req, res) => {
  try {
    const { marca, year, tipo, trans, combus, model } = req.body;

    if (!req.savedFilename) {
      return res.status(400).json({ message: "No se ha subido una imagen" });
    }
    const img = `src/assets/${req.savedFilename}`;
    const response = await client.query(
      "INSERT INTO vehiculos (marca, year, tipo, trans, combus, model, img) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [marca, year, tipo, trans, combus, model, img]
    );
    res.status(200).json({
      message: "Vehiculo creado",
      body: {
        vehiculo: {
          marca,
          year,
          tipo,
          trans,
          combus,
          model,
          img,
        },
      },
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "Vehiculo ya existe" });
    }
    res.status(500).json({ message: error.message });
  }
};

export const updateVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const { marca, year, tipo, desc, trans, combus, img } = req.body;
    const response = await client.query(
      "UPDATE vehiculos SET marca = $1, year = $2, tipo = $3, desc = 4$, trans = $5, combus = $6, img = $7 WHERE id = $8",
      [marca, year, tipo, desc, trans, combus, img, id]
    );
    res.status(200).json({
      message: "Vehiculo actualizado",
      body: {
        vehiculo: { marca, year, tipo, desc, trans, combus, img },
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await client.query("DELETE FROM vehiculos WHERE id = $1", [
      id,
    ]);
    if (response.rowCount === 0) {
      return res.status(404).json({ message: "Vehiculo no encontrado" });
    }
    res.status(200).json({
      message: "Vehiculo eliminado",
      body: {
        vehiculo: { id },
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
