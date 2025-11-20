import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const TipoSucursal = sequelize.define('TipoSucursal', {
  IdTipoSucursal: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
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
