-- Script para migrar la base de datos a UUIDs
-- IMPORTANTE: Este script elimina TODA la base de datos y la recrea
-- Asegúrate de hacer un backup antes de ejecutar

-- Desconectar todas las sesiones activas
SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'db_bbva'
  AND pid <> pg_backend_pid();

-- Eliminar la base de datos si existe
DROP DATABASE IF EXISTS db_bbva;

-- Crear la base de datos nuevamente
CREATE DATABASE db_bbva;

-- Conectarse a la nueva base de datos
\c db_bbva;

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

