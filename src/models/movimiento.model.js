import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Movimiento = sequelize.define('Movimiento', {
  IdMovimiento: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    field: 'idmovimiento'
  },
  IdCuenta: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'idcuenta'
  },
  IdSucursal: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'idsucursal'
  },
  Fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    field: 'fecha'
  },
  Valor: {
    type: DataTypes.DECIMAL(14, 2),
    allowNull: false,
    field: 'valor'
  },
  IdTipoMovimiento: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'idtipomovimiento'
  },
  Descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'descripcion'
  }
}, {
  tableName: 'movimiento',
  timestamps: false
});

export default Movimiento;
