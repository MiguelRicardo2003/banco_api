import { TipoMovimiento } from "../models/index.js";

export const getAllTipoMovimientos = async (req, res) => {
  try {
    const tipos = await TipoMovimiento.findAll({
      order: [['TipoMovimiento', 'ASC']]
    });
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTipoMovimientoById = async (req, res) => {
  try {
    const { id } = req.params;
    const tipo = await TipoMovimiento.findByPk(id);

    if (!tipo) {
      return res.status(404).json({ error: "Tipo de movimiento no encontrado" });
    }

    res.json(tipo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTipoMovimiento = async (req, res) => {
  try {
    const { TipoMovimiento: nombreTipo } = req.body;

    if (!nombreTipo) {
      return res.status(400).json({ error: "El campo TipoMovimiento es requerido" });
    }

    const nuevoTipo = await TipoMovimiento.create({ TipoMovimiento: nombreTipo });
    res.status(201).json(nuevoTipo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateTipoMovimiento = async (req, res) => {
  try {
    const { id } = req.params;
    const { TipoMovimiento: nombreTipo } = req.body;

    if (!nombreTipo) {
      return res.status(400).json({ error: "El campo TipoMovimiento es requerido" });
    }

    const [updated] = await TipoMovimiento.update(
      { TipoMovimiento: nombreTipo },
      { where: { IdTipoMovimiento: id } }
    );

    if (updated) {
      const tipoActualizado = await TipoMovimiento.findByPk(id);
      res.json(tipoActualizado);
    } else {
      res.status(404).json({ error: "Tipo de movimiento no encontrado" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTipoMovimiento = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await TipoMovimiento.destroy({
      where: { IdTipoMovimiento: id }
    });

    if (deleted) {
      res.json({ message: "Tipo de movimiento eliminado exitosamente" });
    } else {
      res.status(404).json({ error: "Tipo de movimiento no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

