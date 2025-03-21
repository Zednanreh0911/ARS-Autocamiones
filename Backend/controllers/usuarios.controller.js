import client from "../db.js";

export const getUsuarios = (req, res) => {
    res.json({ message: 'GET usuarios' });
}

export const createUsuario = (req, res) => {
    res.json({ message: 'POST usuario' });
}

export const deleteUsuario = (req, res) => {
    res.json({ message: 'DELETE usuario' });
}