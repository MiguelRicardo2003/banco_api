const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Cuenta = sequelize.define('Cuenta', {
  IdCuenta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idcuenta'
  },
  Numero: {
    type: DataTypes.STRING(20),
    allowNull: false,
    field: 'numero'
  },
  FechaApertura: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    field: 'fechaapertura'
  },
  IdTipoCuenta: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'idtipocuenta'
  },
  IdSucursal: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'idsucursal'
  },
  Saldo: {
    type: DataTypes.DECIMAL(14, 2),
    defaultValue: 0,
    field: 'saldo'
  },
  Sobregiro: {
    type: DataTypes.DECIMAL(14, 2),
    defaultValue: 0,
    field: 'sobregiro'
  },
  GranMovimiento: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'granmovimiento'
  },
  SobregiroNoAutorizado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'sobregironoautorizado'
  }
}, {
  tableName: 'cuenta',
  timestamps: false
});

export default Cuenta;
