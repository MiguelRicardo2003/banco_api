import express from "express";
import {
  getAllCiudades,
  getCiudadById,
  createCiudad,
  updateCiudad,
  deleteCiudad,
} from "../controllers/ciudad.controller.js";

const router = express.Router();

router.get("/", getAllCiudades);
router.get("/:id", getCiudadById);
router.post("/", createCiudad);
router.put("/:id", updateCiudad);
router.delete("/:id", deleteCiudad);

export default router;

