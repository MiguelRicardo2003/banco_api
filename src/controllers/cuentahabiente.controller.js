import { Op } from 'sequelize';
import { Cuentahabiente, TipoDocumento, Ciudad, Cuenta } from '../models/index.js';
import { validateCreateCuentahabiente, validateUpdateCuentahabiente } from '../validators/cuentahabiente.validator.js';
import { hashClave } from '../utils/password.js';

// Obtener todos los cuentahabientes
export const getAllCuentahabientes = async (req, res) => {
  try {
    const cuentahabientes = await Cuentahabiente.findAll({
      include: [
        { model: TipoDocumento, as: 'tipoDocumento' },
        { model: Ciudad, as: 'ciudad' }
      ]
    });
    
    // Remover la clave de todas las respuestas por seguridad
    const cuentahabientesSinClave = cuentahabientes.map(ch => {
      const data = ch.toJSON();
      delete data.Clave;
      return data;
    });
    
    res.json(cuentahabientesSinClave);
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
    
    // Remover la clave de la respuesta por seguridad
    const respuesta = cuentahabiente.toJSON();
    delete respuesta.Clave;
    
    res.json(respuesta);
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
    
    const { Documento, Clave } = req.body;
    
    // Validar que el documento no esté duplicado
    const existente = await Cuentahabiente.findOne({ where: { Documento } });
    if (existente) {
      return res.status(400).json({ error: 'Ya existe un cuentahabiente con este documento' });
    }
    
    // Hashear la clave antes de guardarla
    const claveHasheada = await hashClave(Clave);
    
    // Crear el cuentahabiente con la clave hasheada
    const datosCuentahabiente = {
      ...req.body,
      Clave: claveHasheada
    };
    
    const nuevoCuentahabiente = await Cuentahabiente.create(datosCuentahabiente);
    
    // No devolver la clave en la respuesta (ni hasheada ni en texto plano)
    const respuesta = nuevoCuentahabiente.toJSON();
    delete respuesta.Clave;
    
    res.status(201).json(respuesta);
  } catch (error) {
    console.error('Error al crear cuentahabiente:', error);
    res.status(400).json({ error: error.message });
  }
};

// Actualizar un cuentahabiente
export const updateCuentahabiente = async (req, res) => {
  try {
    const { id } = req.params;
    const { Documento, Clave } = req.body;
    
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
    
    // Preparar los datos para actualizar
    const datosActualizar = { ...req.body };
    
    // Si se está actualizando la clave (y no está vacía), hashearla antes de guardar
    // Si la clave está vacía o no viene, no se actualiza
    if (Clave && Clave.trim() !== '') {
      datosActualizar.Clave = await hashClave(Clave);
    } else {
      // Si la clave viene vacía, no actualizarla
      delete datosActualizar.Clave;
    }
    
    const [updated] = await Cuentahabiente.update(datosActualizar, {
      where: { IdCuentahabiente: id }
    });
    
    if (updated) {
      const cuentahabienteActualizado = await Cuentahabiente.findByPk(id);
      
      // No devolver la clave en la respuesta
      const respuesta = cuentahabienteActualizado.toJSON();
      delete respuesta.Clave;
      
      res.json(respuesta);
    } else {
      res.status(404).json({ error: 'Cuentahabiente no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar cuentahabiente:', error);
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
