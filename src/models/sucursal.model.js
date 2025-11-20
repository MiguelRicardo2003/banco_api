import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Sucursal = sequelize.define('Sucursal', {
  IdSucursal: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    field: 'idsucursal'
  },
  Sucursal: {
    type: DataTypes.STRING(80),
    allowNull: false,
    field: 'sucursal'
  },
  IdCiudad: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'idciudad'
  },
  IdTipoSucursal: {
    type: DataTypes.UUID,
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
