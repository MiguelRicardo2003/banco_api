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
    const limiteSobregiro = parseFloat(cuenta.Sobregiro) || 0;
    const tipoMovimientoNombre = tipoMov.TipoMovimiento?.toLowerCase() || '';
    
    // Umbral para considerar un movimiento como "grande" (ej: $1,000,000)
    const UMBRAL_GRAN_MOVIMIENTO = 1000000;
    
    // Variables para controlar flags
    let hayGranMovimiento = false;
    let haySobregiroNoAutorizado = false;
    
    if (tipoMovimientoNombre.includes('depósito') || tipoMovimientoNombre.includes('deposito')) {
      // Depósito
      nuevoSaldo += valorMovimiento;
      
      // Si después del depósito el saldo vuelve a ser positivo o cero, 
      // se puede considerar que el sobregiro se cubrió
      // (El flag SobregiroNoAutorizado se mantiene como registro histórico)
    } else if (tipoMovimientoNombre.includes('retiro')) {
      // Retiro
      nuevoSaldo -= valorMovimiento;
      
      // Validar saldo suficiente
      if (nuevoSaldo < 0) {
        const sobregiroActual = Math.abs(nuevoSaldo);
        
        // Si el sobregiro excede el límite permitido, rechazar el movimiento
        if (sobregiroActual > limiteSobregiro) {
          await t.rollback();
          return res.status(400).json({ 
            error: `Saldo insuficiente. Límite de sobregiro permitido: $${limiteSobregiro.toLocaleString('es-CO')}` 
          });
        }
        
        // Si hay sobregiro pero está dentro del límite permitido, 
        // marcar como sobregiro no autorizado (indica que hay sobregiro activo)
        haySobregiroNoAutorizado = true;
      }
    } else if (tipoMovimientoNombre.includes('transferencia')) {
      // Transferencia: puede ser salida (retiro) o entrada (depósito)
      // Por defecto, asumimos que es una salida (retiro) a menos que se especifique
      // Por ahora, tratamos las transferencias como retiros
      nuevoSaldo -= valorMovimiento;
      
      // Validar saldo suficiente
      if (nuevoSaldo < 0) {
        const sobregiroActual = Math.abs(nuevoSaldo);
        
        // Si el sobregiro excede el límite permitido, rechazar el movimiento
        if (sobregiroActual > limiteSobregiro) {
          await t.rollback();
          return res.status(400).json({ 
            error: `Saldo insuficiente. Límite de sobregiro permitido: $${limiteSobregiro.toLocaleString('es-CO')}` 
          });
        }
        
        // Si hay sobregiro pero está dentro del límite permitido
        haySobregiroNoAutorizado = true;
      }
    }
    
    // Detectar si es un gran movimiento (valor absoluto del movimiento >= umbral)
    if (valorMovimiento >= UMBRAL_GRAN_MOVIMIENTO) {
      hayGranMovimiento = true;
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
    
    // Preparar datos para actualizar la cuenta
    const datosActualizar = {
      Saldo: nuevoSaldo
    };
    
    // Actualizar GranMovimiento: si hay un gran movimiento, marcarlo como true
    // Una vez marcado como true, permanece así (no se revierte)
    if (hayGranMovimiento) {
      datosActualizar.GranMovimiento = true;
    }
    
    // Actualizar SobregiroNoAutorizado: si hay sobregiro, marcarlo como true
    // Una vez marcado como true, permanece así hasta que se corrija manualmente
    if (haySobregiroNoAutorizado) {
      datosActualizar.SobregiroNoAutorizado = true;
    }
    
    // Actualizar saldo y flags de la cuenta
    await cuenta.update(datosActualizar, { transaction: t });
    
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
    console.error('Error al crear movimiento:', error);
    console.error('Stack trace:', error.stack);
    res.status(400).json({ 
      error: error.message || 'Error al crear el movimiento',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
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
