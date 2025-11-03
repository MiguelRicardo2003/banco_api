import express from "express";
import {
  getAllTipoSucursales,
  getTipoSucursalById,
  createTipoSucursal,
  updateTipoSucursal,
  deleteTipoSucursal,
} from "../controllers/tipoSucursal.controller.js";

const router = express.Router();

router.get("/", getAllTipoSucursales);
router.get("/:id", getTipoSucursalById);
router.post("/", createTipoSucursal);
router.put("/:id", updateTipoSucursal);
router.delete("/:id", deleteTipoSucursal);

export default router;

