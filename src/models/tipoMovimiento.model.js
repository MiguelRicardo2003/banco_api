const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const TipoMovimiento = sequelize.define('TipoMovimiento', {
  IdTipoMovimiento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idtipomovimiento'
  },
  TipoMovimiento: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'tipomovimiento'
  }
}, {
  tableName: 'tipomovimiento',
  timestamps: false
});

export default TipoMovimiento;
