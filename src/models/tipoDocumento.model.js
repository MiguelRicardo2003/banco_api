const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const TipoDocumento = sequelize.define('TipoDocumento', {
  IdTipoDocumento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idtipodocumento'
  },
  TipoDocumento: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'tipodocumento'
  },
  Sigla: {
    type: DataTypes.STRING(5),
    allowNull: true,
    field: 'sigla'
  }
}, {
  tableName: 'tipodocumento',
  timestamps: false
});

export default TipoDocumento;
