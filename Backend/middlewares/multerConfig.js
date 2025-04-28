import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../Client/src/assets"));
  },
  filename: (req, file, cb) => {
    const uniqueFilename = `${Date.now()}-${file.originalname}`; // Crear un nombre único
    req.savedFilename = uniqueFilename; // Guardar el nombre del archivo en req
    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage });

export default upload;
