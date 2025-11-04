import { TipoCuenta } from "../models/index.js";

export const getAllTipoCuentas = async (req, res) => {
  try {
    const tipos = await TipoCuenta.findAll({
      order: [['TipoCuenta', 'ASC']]
    });
    // Convertir a JSON plano para asegurar compatibilidad
    const tiposData = tipos.map(tipo => tipo.toJSON());
    res.json(tiposData);
  } catch (error) {
    console.error('Error al obtener tipos de cuenta:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getTipoCuentaById = async (req, res) => {
  try {
    const { id } = req.params;
    const tipo = await TipoCuenta.findByPk(id);

    if (!tipo) {
      return res.status(404).json({ error: "Tipo de cuenta no encontrado" });
    }

    res.json(tipo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTipoCuenta = async (req, res) => {
  try {
    const { TipoCuenta: nombreTipo, Sobregiro } = req.body;

    if (!nombreTipo) {
      return res.status(400).json({ error: "El campo TipoCuenta es requerido" });
    }

    const nuevoTipo = await TipoCuenta.create({
      TipoCuenta: nombreTipo,
      Sobregiro: Sobregiro || null
    });
    res.status(201).json(nuevoTipo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateTipoCuenta = async (req, res) => {
  try {
    const { id } = req.params;
    const { TipoCuenta: nombreTipo, Sobregiro } = req.body;

    if (!nombreTipo) {
      return res.status(400).json({ error: "El campo TipoCuenta es requerido" });
    }

    const [updated] = await TipoCuenta.update(
      { TipoCuenta: nombreTipo, Sobregiro: Sobregiro || null },
      { where: { IdTipoCuenta: id } }
    );

    if (updated) {
      const tipoActualizado = await TipoCuenta.findByPk(id);
      res.json(tipoActualizado);
    } else {
      res.status(404).json({ error: "Tipo de cuenta no encontrado" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTipoCuenta = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await TipoCuenta.destroy({
      where: { IdTipoCuenta: id }
    });

    if (deleted) {
      res.json({ message: "Tipo de cuenta eliminado exitosamente" });
    } else {
      res.status(404).json({ error: "Tipo de cuenta no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

