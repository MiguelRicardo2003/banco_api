import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const TipoDocumento = sequelize.define('TipoDocumento', {
  IdTipoDocumento: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
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
