import express from "express";
import {
  getAllCuentahabientes,
  getCuentahabienteById,
  createCuentahabiente,
  updateCuentahabiente,
  deleteCuentahabiente,
} from "../controllers/cuentahabiente.controller.js";

const router = express.Router();

// GET /api/cuentahabientes - Obtener todos los cuentahabientes
router.get("/", getAllCuentahabientes);

// GET /api/cuentahabientes/:id - Obtener un cuentahabiente por ID
router.get("/:id", getCuentahabienteById);

// POST /api/cuentahabientes - Crear un nuevo cuentahabiente
router.post("/", createCuentahabiente);

// PUT /api/cuentahabientes/:id - Actualizar un cuentahabiente
router.put("/:id", updateCuentahabiente);

// DELETE /api/cuentahabientes/:id - Eliminar un cuentahabiente
router.delete("/:id", deleteCuentahabiente);

export default router;
