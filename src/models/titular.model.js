import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Titular = sequelize.define('Titular', {
  IdCuenta: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    field: 'idcuenta'
  },
  IdCuentahabiente: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    field: 'idcuentahabiente'
  }
}, {
  tableName: 'titular',
  timestamps: false
});

export default Titular;
