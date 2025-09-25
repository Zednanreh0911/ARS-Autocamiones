import client from "../db.js";
import { deleteImageFile } from "../utils/fileUtils.js";
import pool from "../db.js";
import { registrarAuditoria } from "../utils/auditoriaUtils.js";

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
      "SELECT * FROM vehiculos WHERE id_vehiculo = $1",
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
    const {
      marca,
      anno,
      tipo_vehiculo,
      tipo_transmision,
      tipo_combustible,
      modelo,
      cantidad,
    } = req.body;

    if (!req.savedFilename) {
      return res.status(400).json({ message: "No se ha subido una imagen" });
    }
    const imagen = `src/assets/${req.savedFilename}`;
    const response = await client.query(
      "INSERT INTO vehiculos (marca, año, tipo_vehiculo, tipo_transmision, tipo_combustible, modelo, cantidad, imagen_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        marca,
        anno,
        tipo_vehiculo,
        tipo_transmision,
        tipo_combustible,
        modelo,
        cantidad,
        imagen,
      ]
    );
    // Auditoría: registrar acción
    await registrarAuditoria({
      usuario_nombre: req.user?.user || null,
      accion: "crear_vehiculo",
      entidad_afectada: "vehiculos",
      entidad_id: response.rows[0]?.id_vehiculo,
      detalle_anterior: null,
      detalle_nuevo: response.rows[0],
      ip_origen: req.ip || null,
    });
    res.status(200).json({
      message: "Vehiculo creado",
      body: {
        vehiculo: {
          marca,
          anno,
          tipo_vehiculo,
          tipo_transmision,
          tipo_combustible,
          modelo,
          imagen,
        },
      },
    });
  } catch (error) {
    console.log(error);
    if (error.code === "23505") {
      return res.status(409).json({ message: "Vehiculo ya existe" });
    }
    res.status(500).json({ message: error.message });
  }
};

export const updateVehiculo = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      marca,
      anno,
      tipo_vehiculo,
      tipo_transmision,
      tipo_combustible,
      modelo,
      img_url,
      cantidad,
    } = req.body;

    // Obtener estado anterior para auditoría
    const prevRes = await client.query(
      "SELECT * FROM vehiculos WHERE id_vehiculo = $1",
      [id]
    );
    const vehiculoAnterior = prevRes.rows[0] || null;

    const response = await client.query(
      `UPDATE vehiculos 
       SET marca = $1, año = $2, tipo_vehiculo = $3, tipo_transmision = $4, tipo_combustible = $5, modelo = $6, imagen_url = $7, cantidad = $8
       WHERE id_vehiculo = $9 RETURNING *`,
      [
        marca,
        anno,
        tipo_vehiculo,
        tipo_transmision,
        tipo_combustible,
        modelo,
        img_url,
        cantidad,
        id,
      ]
    );

    if (response.rowCount === 0) {
      return res.status(404).json({ message: "Vehiculo no encontrado" });
    }

    // Auditoría: registrar acción de edición
    await registrarAuditoria({
      usuario_nombre: req.user?.user || null,
      accion: "editar_vehiculo",
      entidad_afectada: "vehiculos",
      entidad_id: id,
      detalle_anterior: vehiculoAnterior,
      detalle_nuevo: response.rows[0],
      ip_origen: req.ip || null,
    });

    res.status(200).json({
      message: "Vehiculo actualizado",
      body: {
        vehiculo: response.rows[0],
      },
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "Vehiculo ya existe" });
    }
    res.status(500).json({ message: error.message });
  }
};

export const updateVehiculoNewImg = async (req, res) => {
  try {
    const {
      marca,
      anno,
      tipo_vehiculo,
      tipo_transmision,
      tipo_combustible,
      modelo,
      cantidad,
    } = req.body;

    const { id } = req.params;

    if (!req.savedFilename) {
      return res.status(400).json({ message: "No se ha subido una imagen" });
    }
    const img = `src/assets/${req.savedFilename}`;

    // Obtener estado anterior para auditoría
    const prevRes = await client.query(
      "SELECT * FROM vehiculos WHERE id_vehiculo = $1",
      [id]
    );
    const vehiculoAnterior = prevRes.rows[0] || null;

    const response = await client.query(
      `UPDATE vehiculos 
       SET marca = $1, año = $2, tipo_vehiculo = $3, tipo_transmision = $4, tipo_combustible = $5, modelo = $6, imagen_url = $7, cantidad = $8 
        WHERE id_vehiculo = $9 RETURNING *`,
      [
        marca,
        anno,
        tipo_vehiculo,
        tipo_transmision,
        tipo_combustible,
        modelo,
        img,
        cantidad,
        id,
      ]
    );

    if (response.rowCount === 0) {
      return res.status(404).json({ message: "Vehiculo no encontrado" });
    }

    // Auditoría: registrar acción de edición con nueva imagen
    await registrarAuditoria({
      usuario_nombre: req.user?.user || null,
      accion: "editar_vehiculo",
      entidad_afectada: "vehiculos",
      entidad_id: id,
      detalle_anterior: vehiculoAnterior,
      detalle_nuevo: response.rows[0],
      ip_origen: req.ip || null,
    });

    res.status(200).json({
      message: "Vehiculo actualizado con nueva imagen",
      body: {
        vehiculo: response.rows[0],
      },
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "Vehiculo ya existe" });
    }
    res.status(500).json({ message: error.message });
  }
};

export const deleteVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    // Obtener estado anterior para auditoría
    const vehiculoResult = await client.query(
      "SELECT * FROM vehiculos WHERE id_vehiculo = $1",
      [id]
    );
    if (vehiculoResult.rows.length === 0) {
      return res.status(404).json({ message: "Vehiculo no encontrado" });
    }
    const vehiculoAnterior = vehiculoResult.rows[0];
    const imagenUrl = vehiculoAnterior.imagen_url;

    const response = await client.query(
      "DELETE FROM vehiculos WHERE id_vehiculo = $1",
      [id]
    );
    if (response.rowCount === 0) {
      return res.status(404).json({ message: "Vehiculo no encontrado" });
    }

    // Auditoría: registrar acción de eliminación
    await registrarAuditoria({
      usuario_nombre: req.user?.user || null,
      accion: "eliminar_vehiculo",
      entidad_afectada: "vehiculos",
      entidad_id: id,
      detalle_anterior: vehiculoAnterior,
      detalle_nuevo: null,
      ip_origen: req.ip || null,
    });

    deleteImageFile(imagenUrl);

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
