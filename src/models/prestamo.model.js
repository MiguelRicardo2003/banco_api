const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Prestamo = sequelize.define('Prestamo', {
  IdPrestamo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idprestamo'
  },
  IdCuenta: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'idcuenta'
  },
  Numero: {
    type: DataTypes.STRING(20),
    allowNull: false,
    field: 'numero'
  },
  Fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    field: 'fecha'
  },
  Valor: {
    type: DataTypes.DECIMAL(14, 2),
    allowNull: false,
    field: 'valor'
  },
  Interes: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
    field: 'interes'
  },
  Plazo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'plazo'
  },
  Seguro: {
    type: DataTypes.DECIMAL(14, 2),
    allowNull: true,
    field: 'seguro'
  },
  Cuota: {
    type: DataTypes.DECIMAL(14, 2),
    allowNull: true,
    field: 'cuota'
  }
}, {
  tableName: 'prestamo',
  timestamps: false
});

export default Prestamo;
