import { TipoSucursal } from "../models/index.js";

export const getAllTipoSucursales = async (req, res) => {
  try {
    const tipos = await TipoSucursal.findAll({
      order: [['TipoSucursal', 'ASC']]
    });
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTipoSucursalById = async (req, res) => {
  try {
    const { id } = req.params;
    const tipo = await TipoSucursal.findByPk(id);

    if (!tipo) {
      return res.status(404).json({ error: "Tipo de sucursal no encontrado" });
    }

    res.json(tipo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTipoSucursal = async (req, res) => {
  try {
    const { TipoSucursal: nombreTipo } = req.body;

    if (!nombreTipo) {
      return res.status(400).json({ error: "El campo TipoSucursal es requerido" });
    }

    const nuevoTipo = await TipoSucursal.create({ TipoSucursal: nombreTipo });
    res.status(201).json(nuevoTipo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateTipoSucursal = async (req, res) => {
  try {
    const { id } = req.params;
    const { TipoSucursal: nombreTipo } = req.body;

    if (!nombreTipo) {
      return res.status(400).json({ error: "El campo TipoSucursal es requerido" });
    }

    const [updated] = await TipoSucursal.update(
      { TipoSucursal: nombreTipo },
      { where: { IdTipoSucursal: id } }
    );

    if (updated) {
      const tipoActualizado = await TipoSucursal.findByPk(id);
      res.json(tipoActualizado);
    } else {
      res.status(404).json({ error: "Tipo de sucursal no encontrado" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTipoSucursal = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await TipoSucursal.destroy({
      where: { IdTipoSucursal: id }
    });

    if (deleted) {
      res.json({ message: "Tipo de sucursal eliminado exitosamente" });
    } else {
      res.status(404).json({ error: "Tipo de sucursal no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

