import { Movimiento, Cuenta, Sucursal, TipoMovimiento, sequelize } from '../models/index.js';
import { validateCreateMovimiento } from '../validators/movimiento.validator.js';

// Obtener todos los movimientos
export const getAllMovimientos = async (req, res) => {
  try {
    const movimientos = await Movimiento.findAll({
      include: [
        { model: Cuenta, as: 'cuenta', attributes: ['Numero', 'Saldo'] },
        { model: Sucursal, as: 'sucursal', attributes: ['Sucursal'] },
        { model: TipoMovimiento, as: 'tipoMovimiento' }
      ],
      order: [['Fecha', 'DESC'], ['IdMovimiento', 'DESC']]
    });
    res.json(movimientos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener movimientos por cuenta
export const getMovimientosByCuenta = async (req, res) => {
  try {
    const { idCuenta } = req.params;
    const movimientos = await Movimiento.findAll({
      where: { IdCuenta: idCuenta },
      include: [
        { model: Sucursal, as: 'sucursal', attributes: ['Sucursal'] },
        { model: TipoMovimiento, as: 'tipoMovimiento' }
      ],
      order: [['Fecha', 'DESC'], ['IdMovimiento', 'DESC']]
    });
    res.json(movimientos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo movimiento (depósito o retiro)
export const createMovimiento = async (req, res) => {
  const t = await sequelize.transaction();
  
  try {
    const { IdCuenta, Valor, IdTipoMovimiento, IdSucursal, Fecha, Descripcion } = req.body;
    
    // Validar datos de entrada
    const validation = validateCreateMovimiento(req.body);
    if (!validation.isValid) {
      await t.rollback();
      return res.status(400).json({ errors: validation.errors });
    }
    
    // Validar que la cuenta exista
    const cuenta = await Cuenta.findByPk(IdCuenta);
    if (!cuenta) {
      await t.rollback();
      return res.status(404).json({ error: 'Cuenta no encontrada' });
    }
    
    // Validar tipo de movimiento
    const tipoMov = await TipoMovimiento.findByPk(IdTipoMovimiento);
    if (!tipoMov) {
      await t.rollback();
      return res.status(404).json({ error: 'Tipo de movimiento no encontrado' });
    }
    
    // Calcular nuevo saldo basado en el tipo de movimiento
    let nuevoSaldo = parseFloat(cuenta.Saldo);
    const valorMovimiento = parseFloat(Valor);
    const tipoMovimientoNombre = tipoMov.TipoMovimiento?.toLowerCase() || '';
    
    if (tipoMovimientoNombre.includes('depósito') || tipoMovimientoNombre.includes('deposito')) {
      // Depósito
      nuevoSaldo += valorMovimiento;
    } else if (tipoMovimientoNombre.includes('retiro')) {
      // Retiro
      nuevoSaldo -= valorMovimiento;
      
      // Validar saldo suficiente
      if (nuevoSaldo < 0 && Math.abs(nuevoSaldo) > parseFloat(cuenta.Sobregiro)) {
        await t.rollback();
        return res.status(400).json({ error: 'Saldo insuficiente' });
      }
    }
    
    // Crear el movimiento
    const nuevoMovimiento = await Movimiento.create({
      IdCuenta,
      IdSucursal,
      Fecha: Fecha || new Date(),
      Valor: valorMovimiento,
      IdTipoMovimiento,
      Descripcion
    }, { transaction: t });
    
    // Actualizar saldo de la cuenta
    await cuenta.update({ Saldo: nuevoSaldo }, { transaction: t });
    
    await t.commit();
    
    // Retornar el movimiento con sus relaciones
    const movimientoCompleto = await Movimiento.findByPk(nuevoMovimiento.IdMovimiento, {
      include: [
        { model: Cuenta, as: 'cuenta', attributes: ['Numero', 'Saldo'] },
        { model: Sucursal, as: 'sucursal' },
        { model: TipoMovimiento, as: 'tipoMovimiento' }
      ]
    });
    
    res.status(201).json(movimientoCompleto);
  } catch (error) {
    await t.rollback();
    res.status(400).json({ error: error.message });
  }
};

// Obtener un movimiento por ID
export const getMovimientoById = async (req, res) => {
  try {
    const { id } = req.params;
    const movimiento = await Movimiento.findByPk(id, {
      include: [
        { model: Cuenta, as: 'cuenta' },
        { model: Sucursal, as: 'sucursal' },
        { model: TipoMovimiento, as: 'tipoMovimiento' }
      ]
    });
    
    if (!movimiento) {
      return res.status(404).json({ error: 'Movimiento no encontrado' });
    }
    
    res.json(movimiento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
