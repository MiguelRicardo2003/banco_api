import { Sucursal, Ciudad, TipoSucursal } from '../models/index.js';
import { validateCreateSucursal, validateUpdateSucursal } from '../validators/sucursal.validator.js';

// Obtener todas las sucursales
export const getAllSucursales = async (req, res) => {
  try {
    const sucursales = await Sucursal.findAll({
      include: [
        { model: Ciudad, as: 'ciudad' },
        { model: TipoSucursal, as: 'tipoSucursal' }
      ]
    });
    res.json(sucursales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una sucursal por ID
export const getSucursalById = async (req, res) => {
  try {
    const { id } = req.params;
    const sucursal = await Sucursal.findByPk(id, {
      include: [
        { model: Ciudad, as: 'ciudad' },
        { model: TipoSucursal, as: 'tipoSucursal' }
      ]
    });
    
    if (!sucursal) {
      return res.status(404).json({ error: 'Sucursal no encontrada' });
    }
    
    res.json(sucursal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear una nueva sucursal
export const createSucursal = async (req, res) => {
  try {
    // Validar datos de entrada
    const validation = validateCreateSucursal(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ errors: validation.errors });
    }
    
    const nuevaSucursal = await Sucursal.create(req.body);
    res.status(201).json(nuevaSucursal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar una sucursal
export const updateSucursal = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validar datos de entrada
    const validation = validateUpdateSucursal(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ errors: validation.errors });
    }
    
    const [updated] = await Sucursal.update(req.body, {
      where: { IdSucursal: id }
    });
    
    if (updated) {
      const sucursalActualizada = await Sucursal.findByPk(id);
      res.json(sucursalActualizada);
    } else {
      res.status(404).json({ error: 'Sucursal no encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar una sucursal
export const deleteSucursal = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Sucursal.destroy({
      where: { IdSucursal: id }
    });
    
    if (deleted) {
      res.json({ message: 'Sucursal eliminada exitosamente' });
    } else {
      res.status(404).json({ error: 'Sucursal no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

