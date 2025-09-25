import pool from "../db.js";

// Crea un registro de auditoría
export const createAuditoria = async (req, res) => {
  try {
    const {
      usuario_id,
      accion,
      entidad_afectada,
      entidad_id = null,
      detalle_anterior = null,
      detalle_nuevo = null,
      ip_origen = null
    } = req.body;
    const query = `
      INSERT INTO registros_auditoria (
        usuario_id, accion, entidad_afectada, entidad_id, detalle_anterior, detalle_nuevo, fecha_hora, ip_origen
      ) VALUES ($1, $2, $3, $4, $5, $6, NOW(), $7)
      RETURNING *
    `;
    const values = [
      usuario_id,
      accion,
      entidad_afectada,
      entidad_id,
      detalle_anterior,
      detalle_nuevo,
      ip_origen
    ];
    const { rows } = await pool.query(query, values);
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener registros de auditoría (opcional)
export const getAuditoria = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM registros_auditoria ORDER BY fecha_hora DESC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
