import { TipoDocumento } from "../models/index.js";

export const getAllTipoDocumentos = async (req, res) => {
  try {
    const tipos = await TipoDocumento.findAll({
      order: [['TipoDocumento', 'ASC']]
    });
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTipoDocumentoById = async (req, res) => {
  try {
    const { id } = req.params;
    const tipo = await TipoDocumento.findByPk(id);

    if (!tipo) {
      return res.status(404).json({ error: "Tipo de documento no encontrado" });
    }

    res.json(tipo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTipoDocumento = async (req, res) => {
  try {
    const { TipoDocumento: nombreTipo, Sigla } = req.body;

    if (!nombreTipo) {
      return res.status(400).json({ error: "El campo TipoDocumento es requerido" });
    }

    const nuevoTipo = await TipoDocumento.create({
      TipoDocumento: nombreTipo,
      Sigla: Sigla || null
    });
    res.status(201).json(nuevoTipo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateTipoDocumento = async (req, res) => {
  try {
    const { id } = req.params;
    const { TipoDocumento: nombreTipo, Sigla } = req.body;

    if (!nombreTipo) {
      return res.status(400).json({ error: "El campo TipoDocumento es requerido" });
    }

    const [updated] = await TipoDocumento.update(
      { TipoDocumento: nombreTipo, Sigla: Sigla || null },
      { where: { IdTipoDocumento: id } }
    );

    if (updated) {
      const tipoActualizado = await TipoDocumento.findByPk(id);
      res.json(tipoActualizado);
    } else {
      res.status(404).json({ error: "Tipo de documento no encontrado" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTipoDocumento = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await TipoDocumento.destroy({
      where: { IdTipoDocumento: id }
    });

    if (deleted) {
      res.json({ message: "Tipo de documento eliminado exitosamente" });
    } else {
      res.status(404).json({ error: "Tipo de documento no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

