// utils/auditoriaUtils.js
import pool from "../db.js";

/**
 * Registra una acción de auditoría en la base de datos.
 * @param {Object} params
 * @param {string|null} usuario_nombre - Nombre del usuario responsable (puede ser null)
 * @param {string} accion - Acción realizada (ej: 'crear_vehiculo', 'editar_repuesto', etc)
 * @param {string} entidad_afectada - Nombre de la tabla o entidad
 * @param {number|string|null} entidad_id - ID de la entidad afectada
 * @param {any} detalle_anterior - Estado anterior (puede ser null)
 * @param {any} detalle_nuevo - Estado nuevo (puede ser null)
 * @param {string|null} ip_origen - IP de origen (puede ser null)
 */
export async function registrarAuditoria({
  usuario_nombre,
  accion,
  entidad_afectada,
  entidad_id,
  detalle_anterior,
  detalle_nuevo,
  ip_origen
}) {
  let usuario_id = null;
  if (usuario_nombre) {
    try {
      const userRes = await pool.query(
        "SELECT id_usuario FROM usuarios WHERE nombre = $1",
        [usuario_nombre]
      );
      usuario_id = userRes.rows[0]?.id_usuario || null;
    } catch (e) {
      // Si falla la búsqueda, dejar usuario_id en null
    }
  }
  try {
    await pool.query(
      `INSERT INTO registros_auditoria (usuario_id, accion, entidad_afectada, entidad_id, detalle_anterior, detalle_nuevo, fecha_hora, ip_origen)
       VALUES ($1, $2, $3, $4, $5, $6, NOW(), $7)`,
      [
        usuario_id,
        accion,
        entidad_afectada,
        entidad_id,
        detalle_anterior ? JSON.stringify(detalle_anterior) : null,
        detalle_nuevo ? JSON.stringify(detalle_nuevo) : null,
        ip_origen || null
      ]
    );
  } catch (err) {
    console.error('Error registrando auditoría:', err);
  }
}
