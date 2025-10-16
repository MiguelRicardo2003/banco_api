const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const TipoCuenta = sequelize.define('TipoCuenta', {
  IdTipoCuenta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idtipocuenta'
  },
  TipoCuenta: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'tipocuenta'
  },
  Sobregiro: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true,
    field: 'sobregiro'
  }
}, {
  tableName: 'tipocuenta',
  timestamps: false
});

export default TipoCuenta;
