import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function deleteImageFile(imagenUrl) {
  if (!imagenUrl) return;
  const imagePath = path.join(__dirname, "../../Client", imagenUrl);
  fs.unlink(imagePath, (err) => {
    if (err) {
      // Solo loguea el error, no detiene la ejecución
      console.error("Error al eliminar la imagen:", err);
    }
  });
}
