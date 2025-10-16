const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Cuentahabiente = sequelize.define('Cuentahabiente', {
  IdCuentahabiente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idcuentahabiente'
  },
  Nombre: {
    type: DataTypes.STRING(80),
    allowNull: false,
    field: 'nombre'
  },
  IdTipoDocumento: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'idtipodocumento'
  },
  Documento: {
    type: DataTypes.STRING(30),
    allowNull: false,
    field: 'documento'
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
  IdCiudad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'idciudad'
  },
  Clave: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'clave'
  }
}, {
  tableName: 'cuentahabiente',
  timestamps: false
});

export default Cuentahabiente;
