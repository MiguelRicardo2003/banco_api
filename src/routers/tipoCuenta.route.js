import express from "express";
import {
  getAllTipoCuentas,
  getTipoCuentaById,
  createTipoCuenta,
  updateTipoCuenta,
  deleteTipoCuenta,
} from "../controllers/tipoCuenta.controller.js";

const router = express.Router();

router.get("/", getAllTipoCuentas);
router.get("/:id", getTipoCuentaById);
router.post("/", createTipoCuenta);
router.put("/:id", updateTipoCuenta);
router.delete("/:id", deleteTipoCuenta);

export default router;

