import pkg from "pg";
import { DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT } from "./config.js";
import bcrypt from "bcryptjs";
const { Pool } = pkg;

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
});

// Intentar una conexión al iniciar para informar estado
(async () => {
  try {
    const client = await pool.connect();
    client.release();
    console.log("Conexión a la base de datos exitosa.");
    // Asegurarse de que exista la tabla `usuarios` con un esquema mínimo
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS usuarios (
          id_usuario SERIAL PRIMARY KEY,
          nombre TEXT UNIQUE NOT NULL,
          contraseña TEXT NOT NULL,
          rol TEXT NOT NULL DEFAULT 'consulta'
        );
      `);

      // Crear tabla `repuestos` si no existe (esquema mínimo usado por controladores)
      await pool.query(`
        CREATE TABLE IF NOT EXISTS repuestos (
          id_repuesto SERIAL PRIMARY KEY,
          nombre TEXT NOT NULL,
          marca TEXT,
          cantidad INTEGER DEFAULT 0,
          categoria TEXT,
          precio_unitario NUMERIC DEFAULT 0,
          imagen_url TEXT
        );
      `);

      // Crear tabla `vehiculos` si no existe (esquema mínimo usado por controladores)
      await pool.query(`
        CREATE TABLE IF NOT EXISTS vehiculos (
          id_vehiculo SERIAL PRIMARY KEY,
          marca TEXT,
          año INTEGER,
          tipo_vehiculo TEXT,
          tipo_transmision TEXT,
          tipo_combustible TEXT,
          modelo TEXT,
          cantidad INTEGER DEFAULT 0,
          imagen_url TEXT
        );
      `);

      // Crear tabla `registros_auditoria` si no existe (esquema mínimo usado por utilidades)
      await pool.query(`
        CREATE TABLE IF NOT EXISTS registros_auditoria (
          id_registro SERIAL PRIMARY KEY,
          usuario_id INTEGER REFERENCES usuarios(id_usuario),
          accion TEXT,
          entidad_afectada TEXT,
          entidad_id TEXT,
          detalle_anterior JSONB,
          detalle_nuevo JSONB,
          fecha_hora TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
          ip_origen TEXT
        );
      `);

      // Comprobar existencia del usuario por defecto 'gerente'
      const userRes = await pool.query(
        "SELECT id_usuario FROM usuarios WHERE nombre = $1",
        ["gerente"]
      );
      if (userRes.rows.length === 0) {
        const defaultPassword = "1234";
        const saltRounds = 10;
        const hashed = await bcrypt.hash(defaultPassword, saltRounds);
        await pool.query(
          "INSERT INTO usuarios (nombre, contraseña, rol) VALUES ($1, $2, $3)",
          ["gerente", hashed, "gerente"]
        );
        console.log(
          "Usuario por defecto 'gerente' creado con contraseña por defecto '1234'. Por seguridad, cámbiala después de iniciar sesión."
        );
      } else {
        console.log("Usuario 'gerente' ya existe en la base de datos.");
      }
    } catch (e) {
      console.error("Error asegurando tabla/usuario por defecto:", e.message);
    }
  } catch (err) {
    console.error("Error al conectar a la base de datos:", err.message);
    // Si prefieres que la aplicación termine cuando la BD no esté disponible,
    // descomenta la siguiente línea:
    // process.exit(1);
  }
})();

export default pool;
