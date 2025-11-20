import { Prestamo, Cuenta, Cuentahabiente } from '../models/index.js';
import { validateCreatePrestamo, validateUpdatePrestamo } from '../validators/prestamo.validator.js';

// Obtener todos los préstamos
export const getAllPrestamos = async (req, res) => {
  try {
    const prestamos = await Prestamo.findAll({
      include: [
        { 
          model: Cuenta, 
          as: 'cuenta',
          attributes: ['Numero', 'Saldo'],
          include: [
            {
              model: Cuentahabiente,
              as: 'titulares',
              attributes: ['Nombre', 'Documento']
            }
          ]
        }
      ],
      order: [['Fecha', 'DESC']]
    });
    res.json(prestamos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener préstamos por cuenta
export const getPrestamosByCuenta = async (req, res) => {
  try {
    const { idCuenta } = req.params;
    const prestamos = await Prestamo.findAll({
      where: { IdCuenta: idCuenta },
      include: [
        { model: Cuenta, as: 'cuenta', attributes: ['Numero'] }
      ],
      order: [['Fecha', 'DESC']]
    });
    res.json(prestamos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un préstamo por ID
export const getPrestamoById = async (req, res) => {
  try {
    const { id } = req.params;
    const prestamo = await Prestamo.findByPk(id, {
      include: [
        { 
          model: Cuenta, 
          as: 'cuenta',
          include: [
            {
              model: Cuentahabiente,
              as: 'titulares'
            }
          ]
        }
      ]
    });
    
    if (!prestamo) {
      return res.status(404).json({ error: 'Préstamo no encontrado' });
    }
    
    res.json(prestamo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo préstamo
export const createPrestamo = async (req, res) => {
  try {
    // Validar datos de entrada
    const validation = validateCreatePrestamo(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ errors: validation.errors });
    }
    
    const { IdCuenta, Numero } = req.body;
    
    // Validar que la cuenta exista
    const cuenta = await Cuenta.findByPk(IdCuenta);
    if (!cuenta) {
      return res.status(404).json({ error: 'Cuenta no encontrada' });
    }
    
    // Validar que el número de préstamo no esté duplicado
    const existente = await Prestamo.findOne({ where: { Numero } });
    if (existente) {
      return res.status(400).json({ error: 'Ya existe un préstamo con este número' });
    }
    
    const nuevoPrestamo = await Prestamo.create(req.body);
    res.status(201).json(nuevoPrestamo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar un préstamo
export const updatePrestamo = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validar datos de entrada
    const validation = validateUpdatePrestamo(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ errors: validation.errors });
    }
    
    const [updated] = await Prestamo.update(req.body, {
      where: { IdPrestamo: id }
    });
    
    if (updated) {
      const prestamoActualizado = await Prestamo.findByPk(id);
      res.json(prestamoActualizado);
    } else {
      res.status(404).json({ error: 'Préstamo no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un préstamo
export const deletePrestamo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Prestamo.destroy({
      where: { IdPrestamo: id }
    });
    
    if (deleted) {
      res.json({ message: 'Préstamo eliminado exitosamente' });
    } else {
      res.status(404).json({ error: 'Préstamo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

