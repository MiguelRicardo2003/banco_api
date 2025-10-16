import TipoCuenta from "./cuenta.model";
import TipoDocumento from "./tipoDocumento.model";
import TipoSucursal from "./tipoSucursal.model";
import TipoMovimiento from "./tipoMovimiento.model";
import Ciudad from "./ciudad.model";
import Cuentahabiente from "./cuentaHabiente.model";
import Sucursal from "./sucursal.model";
import Cuenta from "./cuenta.model";
import Titular from "./titular.model";
import Movimiento from "./movimiento.model";
import Prestamo from "./prestamo.model";

// Definir las relaciones de las tablas

// Cuentahabiente pertenece a TipoDocumento y Ciudad
Cuentahabiente.belongsTo(TipoDocumento, {
  foreignKey: "IdTipoDocumento",
  as: "tipoDocumento",
});
Cuentahabiente.belongsTo(Ciudad, { foreignKey: "IdCiudad", as: "ciudad" });

// Sucursal pertenece a Ciudad y TipoSucursal
Sucursal.belongsTo(Ciudad, { foreignKey: "IdCiudad", as: "ciudad" });
Sucursal.belongsTo(TipoSucursal, {
  foreignKey: "IdTipoSucursal",
  as: "tipoSucursal",
});

// Cuenta pertenece a TipoCuenta y Sucursal
Cuenta.belongsTo(TipoCuenta, { foreignKey: "IdTipoCuenta", as: "tipoCuenta" });
Cuenta.belongsTo(Sucursal, { foreignKey: "IdSucursal", as: "sucursal" });

// Relación muchos a muchos: Cuenta <-> Cuentahabiente a través de Titular
Cuenta.belongsToMany(Cuentahabiente, {
  through: Titular,
  foreignKey: "IdCuenta",
  otherKey: "IdCuentahabiente",
  as: "titulares",
});
Cuentahabiente.belongsToMany(Cuenta, {
  through: Titular,
  foreignKey: "IdCuentahabiente",
  otherKey: "IdCuenta",
  as: "cuentas",
});

// Movimiento pertenece a Cuenta, Sucursal y TipoMovimiento
Movimiento.belongsTo(Cuenta, { foreignKey: "IdCuenta", as: "cuenta" });
Movimiento.belongsTo(Sucursal, { foreignKey: "IdSucursal", as: "sucursal" });
Movimiento.belongsTo(TipoMovimiento, {
  foreignKey: "IdTipoMovimiento",
  as: "tipoMovimiento",
});

// Prestamo pertenece a Cuenta
Prestamo.belongsTo(Cuenta, { foreignKey: "IdCuenta", as: "cuenta" });

// Cuenta tiene muchos Movimientos y Prestamos
Cuenta.hasMany(Movimiento, { foreignKey: "IdCuenta", as: "movimientos" });
Cuenta.hasMany(Prestamo, { foreignKey: "IdCuenta", as: "prestamos" });

export {
  sequelize,
  TipoCuenta,
  TipoDocumento,
  TipoSucursal,
  TipoMovimiento,
  Ciudad,
  Cuentahabiente,
  Sucursal,
  Cuenta,
  Titular,
  Movimiento,
  Prestamo,
};
