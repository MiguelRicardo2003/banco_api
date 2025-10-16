import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";

dotenv.config();

const app = express();

// Middlewares básico
app.use(express.json());

// Ruta Base
app.get("/", (req, res) => {
  res.json({ message: "API Banco funcionando correctamente 🚀" });
});

// Conectar BD
connectDB();

export default app;
