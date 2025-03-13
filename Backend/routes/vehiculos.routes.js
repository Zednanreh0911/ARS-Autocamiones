import { Router } from "express";

const vehiculosRouter = Router();

vehiculosRouter.get("/", (req, res) => {
  res.send("GET vehiculos");
});

vehiculosRouter.get("/:id", (req, res) => {
  res.send("GET vehiculos");
});

vehiculosRouter.post("/", (req, res) => {
  res.send("POST vehiculos");
});

vehiculosRouter.put("/:id", (req, res) => {
  res.send("PUT vehiculos");
});

vehiculosRouter.delete("/:id", (req, res) => {
  res.send("DELETE vehiculos");
});

export default vehiculosRouter;