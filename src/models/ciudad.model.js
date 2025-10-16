const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Ciudad = sequelize.define('Ciudad', {
  IdCiudad: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idciudad'
  },
  Ciudad: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'ciudad'
  }
}, {
  tableName: 'ciudad',
  timestamps: false
});

export default Ciudad;
