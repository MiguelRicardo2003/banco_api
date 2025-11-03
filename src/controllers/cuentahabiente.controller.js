import { Op } from 'sequelize';
import { Cuentahabiente, TipoDocumento, Ciudad, Cuenta } from '../models/index.js';
import { validateCreateCuentahabiente, validateUpdateCuentahabiente } from '../validators/cuentahabiente.validator.js';

// Obtener todos los cuentahabientes
export const getAllCuentahabientes = async (req, res) => {
  try {
    const cuentahabientes = await Cuentahabiente.findAll({
      include: [
        { model: TipoDocumento, as: 'tipoDocumento' },
        { model: Ciudad, as: 'ciudad' }
      ]
    });
    res.json(cuentahabientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un cuentahabiente por ID
export const getCuentahabienteById = async (req, res) => {
  try {
    const { id } = req.params;
    const cuentahabiente = await Cuentahabiente.findByPk(id, {
      include: [
        { model: TipoDocumento, as: 'tipoDocumento' },
        { model: Ciudad, as: 'ciudad' },
        { model: Cuenta, as: 'cuentas' }
      ]
    });
    
    if (!cuentahabiente) {
      return res.status(404).json({ error: 'Cuentahabiente no encontrado' });
    }
    
    res.json(cuentahabiente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo cuentahabiente
export const createCuentahabiente = async (req, res) => {
  try {
    // Validar datos de entrada
    const validation = validateCreateCuentahabiente(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ errors: validation.errors });
    }
    
    const { Documento } = req.body;
    
    // Validar que el documento no esté duplicado
    const existente = await Cuentahabiente.findOne({ where: { Documento } });
    if (existente) {
      return res.status(400).json({ error: 'Ya existe un cuentahabiente con este documento' });
    }
    
    const nuevoCuentahabiente = await Cuentahabiente.create(req.body);
    res.status(201).json(nuevoCuentahabiente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar un cuentahabiente
export const updateCuentahabiente = async (req, res) => {
  try {
    const { id } = req.params;
    const { Documento } = req.body;
    
    // Validar datos de entrada
    const validation = validateUpdateCuentahabiente(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ errors: validation.errors });
    }
    
    // Validar documento duplicado si se está actualizando
    if (Documento) {
      const existente = await Cuentahabiente.findOne({ 
        where: { 
          Documento,
          IdCuentahabiente: { [Op.ne]: id }
        } 
      });
      if (existente) {
        return res.status(400).json({ error: 'Ya existe otro cuentahabiente con este documento' });
      }
    }
    
    const [updated] = await Cuentahabiente.update(req.body, {
      where: { IdCuentahabiente: id }
    });
    
    if (updated) {
      const cuentahabienteActualizado = await Cuentahabiente.findByPk(id);
      res.json(cuentahabienteActualizado);
    } else {
      res.status(404).json({ error: 'Cuentahabiente no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un cuentahabiente
export const deleteCuentahabiente = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Cuentahabiente.destroy({
      where: { IdCuentahabiente: id }
    });
    
    if (deleted) {
      res.json({ message: 'Cuentahabiente eliminado exitosamente' });
    } else {
      res.status(404).json({ error: 'Cuentahabiente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
