import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Prestamo = sequelize.define('Prestamo', {
  IdPrestamo: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    field: 'idprestamo'
  },
  IdCuenta: {
    type: DataTypes.UUID,
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
