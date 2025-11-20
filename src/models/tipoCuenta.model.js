import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const TipoCuenta = sequelize.define('TipoCuenta', {
  IdTipoCuenta: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
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
