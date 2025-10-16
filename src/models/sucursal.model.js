const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Sucursal = sequelize.define('Sucursal', {
  IdSucursal: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idsucursal'
  },
  Sucursal: {
    type: DataTypes.STRING(80),
    allowNull: false,
    field: 'sucursal'
  },
  IdCiudad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'idciudad'
  },
  IdTipoSucursal: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'idtiposucursal'
  },
  Direccion: {
    type: DataTypes.STRING(100),
    allowNull: true,
    field: 'direccion'
  },
  Telefono: {
    type: DataTypes.STRING(20),
    allowNull: true,
    field: 'telefono'
  },
  Horario: {
    type: DataTypes.STRING(50),
    allowNull: true,
    field: 'horario'
  }
}, {
  tableName: 'sucursal',
  timestamps: false
});

export default Sucursal;
