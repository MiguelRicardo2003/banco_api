import express from "express";
import {
  getAllTipoDocumentos,
  getTipoDocumentoById,
  createTipoDocumento,
  updateTipoDocumento,
  deleteTipoDocumento,
} from "../controllers/tipoDocumento.controller.js";

const router = express.Router();

router.get("/", getAllTipoDocumentos);
router.get("/:id", getTipoDocumentoById);
router.post("/", createTipoDocumento);
router.put("/:id", updateTipoDocumento);
router.delete("/:id", deleteTipoDocumento);

export default router;

