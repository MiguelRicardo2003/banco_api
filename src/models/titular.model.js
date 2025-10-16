const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Titular = sequelize.define('Titular', {
  IdCuenta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    field: 'idcuenta'
  },
  IdCuentahabiente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    field: 'idcuentahabiente'
  }
}, {
  tableName: 'titular',
  timestamps: false
});

export default Titular;
