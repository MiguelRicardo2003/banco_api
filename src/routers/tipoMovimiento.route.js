import express from "express";
import {
  getAllTipoMovimientos,
  getTipoMovimientoById,
  createTipoMovimiento,
  updateTipoMovimiento,
  deleteTipoMovimiento,
} from "../controllers/tipoMovimiento.controller.js";

const router = express.Router();

router.get("/", getAllTipoMovimientos);
router.get("/:id", getTipoMovimientoById);
router.post("/", createTipoMovimiento);
router.put("/:id", updateTipoMovimiento);
router.delete("/:id", deleteTipoMovimiento);

export default router;

