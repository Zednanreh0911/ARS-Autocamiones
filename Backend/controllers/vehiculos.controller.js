export const getVehiculos = (req, res) => {
    res.json({ message: 'GET vehiculos' });
}

export const getVehiculo = (req, res) => {
    res.json({ message: 'GET vehiculo' });
}

export const createVehiculo = (req, res) => {
    res.json({ message: 'POST vehiculo' });
}

export const updateVehiculo = (req, res) => {
    res.json({ message: 'PUT vehiculo' });
}

export const deleteVehiculo = (req, res) => {
    res.json({ message: 'DELETE vehiculo' });
}
