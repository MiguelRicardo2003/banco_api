import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Ciudad = sequelize.define('Ciudad', {
  IdCiudad: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    field: 'idciudad'
  },
  Ciudad: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'ciudad'
  }
}, {
  tableName: 'ciudad',
  timestamps: false
});

export default Ciudad;
