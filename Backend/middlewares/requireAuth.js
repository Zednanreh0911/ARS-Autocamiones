import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
  let token = null;
  // 1. Buscar token en cookie 'auth'
  if (req.cookies && req.cookies.auth) {
    token = req.cookies.auth;
  }
  // 2. Buscar token en header Authorization: Bearer <token>
  if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({ message: "No autenticado: token no encontrado" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecreto123");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
}
