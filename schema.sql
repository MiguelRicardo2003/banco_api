-- IMPORTANTE: Este script ELIMINA la base de datos completa
-- Asegúrate de hacer un backup antes de ejecutar

-- Conectarse a la base de datos postgres primero
-- Luego ejecutar este script

DROP DATABASE IF EXISTS db_bbva;
CREATE DATABASE db_bbva;

-- Conectarse a db_bbva (ejecutar manualmente: \c db_bbva)
-- O ejecutar: psql -U usuario -d db_bbva -f schema.sql

-- Habilitar extensión UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- TABLAS MAESTRAS

CREATE TABLE tipocuenta (
    idtipocuenta UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tipocuenta VARCHAR(50) NOT NULL,
    sobregiro DECIMAL(12,2)
);

CREATE TABLE tipodocumento (
    idtipodocumento UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tipodocumento VARCHAR(50) NOT NULL,
    sigla VARCHAR(5)
);

CREATE TABLE tiposucursal (
    idtiposucursal UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tiposucursal VARCHAR(50) NOT NULL
);

CREATE TABLE tipomovimiento (
    idtipomovimiento UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tipomovimiento VARCHAR(50) NOT NULL
);

CREATE TABLE ciudad (
    idciudad UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ciudad VARCHAR(50) NOT NULL
);

-- TABLAS PRINCIPALES

CREATE TABLE cuentahabiente (
    idcuentahabiente UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(80) NOT NULL,
    idtipodocumento UUID NOT NULL,
    documento VARCHAR(30) NOT NULL,
    direccion VARCHAR(100),
    telefono VARCHAR(20),
    idciudad UUID NOT NULL,
    clave VARCHAR(100) NOT NULL,
    FOREIGN KEY (idtipodocumento) REFERENCES tipodocumento(idtipodocumento),
    FOREIGN KEY (idciudad) REFERENCES ciudad(idciudad)
);

CREATE TABLE sucursal (
    idsucursal UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sucursal VARCHAR(80) NOT NULL,
    idciudad UUID NOT NULL,
    idtiposucursal UUID NOT NULL,
    direccion VARCHAR(100),
    telefono VARCHAR(20),
    horario VARCHAR(50),
    FOREIGN KEY (idciudad) REFERENCES ciudad(idciudad),
    FOREIGN KEY (idtiposucursal) REFERENCES tiposucursal(idtiposucursal)
);

CREATE TABLE cuenta (
    idcuenta UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    numero VARCHAR(20) NOT NULL,
    fechaapertura DATE NOT NULL,
    idtipocuenta UUID NOT NULL,
    idsucursal UUID NOT NULL,
    saldo DECIMAL(14,2) DEFAULT 0,
    sobregiro DECIMAL(14,2) DEFAULT 0,
    granmovimiento BOOLEAN DEFAULT FALSE,
    sobregironoautorizado BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (idtipocuenta) REFERENCES tipocuenta(idtipocuenta),
    FOREIGN KEY (idsucursal) REFERENCES sucursal(idsucursal)
);

CREATE TABLE titular (
    idcuenta UUID NOT NULL,
    idcuentahabiente UUID NOT NULL,
    PRIMARY KEY (idcuenta, idcuentahabiente),
    FOREIGN KEY (idcuenta) REFERENCES cuenta(idcuenta),
    FOREIGN KEY (idcuentahabiente) REFERENCES cuentahabiente(idcuentahabiente)
);

CREATE TABLE movimiento (
    idmovimiento UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    idcuenta UUID NOT NULL,
    idsucursal UUID NOT NULL,
    fecha DATE NOT NULL,
    valor DECIMAL(14,2) NOT NULL,
    idtipomovimiento UUID NOT NULL,
    descripcion TEXT,
    FOREIGN KEY (idcuenta) REFERENCES cuenta(idcuenta),
    FOREIGN KEY (idsucursal) REFERENCES sucursal(idsucursal),
    FOREIGN KEY (idtipomovimiento) REFERENCES tipomovimiento(idtipomovimiento)
);

CREATE TABLE prestamo (
    idprestamo UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    idcuenta UUID NOT NULL,
    numero VARCHAR(20) NOT NULL,
    fecha DATE NOT NULL,
    valor DECIMAL(14,2) NOT NULL,
    interes DECIMAL(5,2) NOT NULL,
    plazo INT NOT NULL,
    seguro DECIMAL(14,2),
    cuota DECIMAL(14,2),
    FOREIGN KEY (idcuenta) REFERENCES cuenta(idcuenta)
);

-- DATOS DE PRUEBA 
-- Nota: Los UUIDs se generan automáticamente, pero para mantener referencias consistentes
-- usamos variables temporales con CTEs

-- Insertar datos con UUIDs explícitos para mantener referencias
DO $$
DECLARE
    v_tipo_cuenta_ahorros UUID;
    v_tipo_cuenta_corriente UUID;
    v_tipo_doc_cc UUID;
    v_tipo_doc_pa UUID;
    v_ciudad_bogota UUID;
    v_ciudad_medellin UUID;
    v_ciudad_cali UUID;
    v_tipo_sucursal_principal UUID;
    v_tipo_sucursal_oficina UUID;
    v_tipo_sucursal_cajero UUID;
    v_tipo_mov_deposito UUID;
    v_tipo_mov_retiro UUID;
    v_tipo_mov_transferencia UUID;
    v_cuentahabiente UUID;
    v_sucursal UUID;
    v_cuenta UUID;
BEGIN
    -- Insertar tablas maestras y obtener UUIDs
    INSERT INTO tipocuenta (tipocuenta, sobregiro) VALUES ('Ahorros', 500.00) RETURNING idtipocuenta INTO v_tipo_cuenta_ahorros;
    INSERT INTO tipocuenta (tipocuenta, sobregiro) VALUES ('Corriente', 2000.00) RETURNING idtipocuenta INTO v_tipo_cuenta_corriente;
    
    INSERT INTO tipodocumento (tipodocumento, sigla) VALUES ('Cédula de Ciudadanía', 'CC') RETURNING idtipodocumento INTO v_tipo_doc_cc;
    INSERT INTO tipodocumento (tipodocumento, sigla) VALUES ('Pasaporte', 'PA') RETURNING idtipodocumento INTO v_tipo_doc_pa;
    
    INSERT INTO ciudad (ciudad) VALUES ('Bogotá') RETURNING idciudad INTO v_ciudad_bogota;
    INSERT INTO ciudad (ciudad) VALUES ('Medellín') RETURNING idciudad INTO v_ciudad_medellin;
    INSERT INTO ciudad (ciudad) VALUES ('Cali') RETURNING idciudad INTO v_ciudad_cali;
    
    INSERT INTO tiposucursal (tiposucursal) VALUES ('Principal') RETURNING idtiposucursal INTO v_tipo_sucursal_principal;
    INSERT INTO tiposucursal (tiposucursal) VALUES ('Oficina') RETURNING idtiposucursal INTO v_tipo_sucursal_oficina;
    INSERT INTO tiposucursal (tiposucursal) VALUES ('Cajero') RETURNING idtiposucursal INTO v_tipo_sucursal_cajero;
    
    INSERT INTO tipomovimiento (tipomovimiento) VALUES ('Depósito') RETURNING idtipomovimiento INTO v_tipo_mov_deposito;
    INSERT INTO tipomovimiento (tipomovimiento) VALUES ('Retiro') RETURNING idtipomovimiento INTO v_tipo_mov_retiro;
    INSERT INTO tipomovimiento (tipomovimiento) VALUES ('Transferencia') RETURNING idtipomovimiento INTO v_tipo_mov_transferencia;
    
    -- Insertar datos principales
    INSERT INTO cuentahabiente (nombre, idtipodocumento, documento, direccion, telefono, idciudad, clave)
    VALUES ('Juan Pérez', v_tipo_doc_cc, '1001234567', 'Cra 10 #20-30', '3105554444', v_ciudad_bogota, '1234')
    RETURNING idcuentahabiente INTO v_cuentahabiente;
    
    INSERT INTO sucursal (sucursal, idciudad, idtiposucursal, direccion, telefono, horario)
    VALUES ('Sucursal Central', v_ciudad_bogota, v_tipo_sucursal_principal, 'Calle 72 #10-12', '6015550000', 'Lunes a Viernes 8am - 5pm')
    RETURNING idsucursal INTO v_sucursal;
    
    INSERT INTO cuenta (numero, fechaapertura, idtipocuenta, idsucursal, saldo)
    VALUES ('100200300', '2020-01-01', v_tipo_cuenta_ahorros, v_sucursal, 500000)
    RETURNING idcuenta INTO v_cuenta;
    
    INSERT INTO titular (idcuenta, idcuentahabiente) VALUES (v_cuenta, v_cuentahabiente);
    
    INSERT INTO movimiento (idcuenta, idsucursal, fecha, valor, idtipomovimiento, descripcion)
    VALUES (v_cuenta, v_sucursal, '2024-01-02', 200000, v_tipo_mov_deposito, 'Depósito inicial');
    
    INSERT INTO prestamo (idcuenta, numero, fecha, valor, interes, plazo, seguro, cuota)
    VALUES (v_cuenta, 'PRE-001', '2024-02-01', 1000000, 5.5, 12, 30000, 95000);
END $$;