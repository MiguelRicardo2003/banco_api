const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const TipoSucursal = sequelize.define('TipoSucursal', {
  IdTipoSucursal: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idtiposucursal'
  },
  TipoSucursal: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'tiposucursal'
  }
}, {
  tableName: 'tiposucursal',
  timestamps: false
});

export default TipoSucursal;
