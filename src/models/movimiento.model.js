const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Movimiento = sequelize.define('Movimiento', {
  IdMovimiento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idmovimiento'
  },
  IdCuenta: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'idcuenta'
  },
  IdSucursal: {
    type: DataTypes.INTEGER,
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
    type: DataTypes.INTEGER,
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
