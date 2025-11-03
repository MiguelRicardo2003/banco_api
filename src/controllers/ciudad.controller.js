import { Ciudad } from "../models/index.js";

export const getAllCiudades = async (req, res) => {
  try {
    const ciudades = await Ciudad.findAll({
      order: [['Ciudad', 'ASC']]
    });
    res.json(ciudades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCiudadById = async (req, res) => {
  try {
    const { id } = req.params;
    const ciudad = await Ciudad.findByPk(id);

    if (!ciudad) {
      return res.status(404).json({ error: "Ciudad no encontrada" });
    }

    res.json(ciudad);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCiudad = async (req, res) => {
  try {
    const { Ciudad: nombreCiudad } = req.body;

    if (!nombreCiudad) {
      return res.status(400).json({ error: "El campo Ciudad es requerido" });
    }

    const nuevaCiudad = await Ciudad.create({ Ciudad: nombreCiudad });
    res.status(201).json(nuevaCiudad);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateCiudad = async (req, res) => {
  try {
    const { id } = req.params;
    const { Ciudad: nombreCiudad } = req.body;

    if (!nombreCiudad) {
      return res.status(400).json({ error: "El campo Ciudad es requerido" });
    }

    const [updated] = await Ciudad.update(
      { Ciudad: nombreCiudad },
      { where: { IdCiudad: id } }
    );

    if (updated) {
      const ciudadActualizada = await Ciudad.findByPk(id);
      res.json(ciudadActualizada);
    } else {
      res.status(404).json({ error: "Ciudad no encontrada" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteCiudad = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Ciudad.destroy({
      where: { IdCiudad: id }
    });

    if (deleted) {
      res.json({ message: "Ciudad eliminada exitosamente" });
    } else {
      res.status(404).json({ error: "Ciudad no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

