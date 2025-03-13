import express from 'express';
import vehiculosRouter from './routes/vehiculos.routes.js';

const app = express();

app.listen(6969, () => {
  console.log('Server is running on http://localhost:6969');
});