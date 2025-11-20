import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const TipoMovimiento = sequelize.define('TipoMovimiento', {
  IdTipoMovimiento: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    field: 'idtipomovimiento'
  },
  TipoMovimiento: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'tipomovimiento'
  }
}, {
  tableName: 'tipomovimiento',
  timestamps: false
});

export default TipoMovimiento;
