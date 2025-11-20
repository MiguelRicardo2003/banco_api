import express from 'express';
import { getTitularesConCuentas } from '../controllers/titular.controller.js';

const router = express.Router();

router.get('/', getTitularesConCuentas);

export default router;
