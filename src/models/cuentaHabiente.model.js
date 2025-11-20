import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Cuentahabiente = sequelize.define('Cuentahabiente', {
  IdCuentahabiente: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    field: 'idcuentahabiente'
  },
  Nombre: {
    type: DataTypes.STRING(80),
    allowNull: false,
    field: 'nombre'
  },
  IdTipoDocumento: {
    type: DataTypes.UUID,
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
    type: DataTypes.UUID,
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
