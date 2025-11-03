-- Script para recrear la base de datos con UUIDs
-- Ejecutar paso a paso o todo junto si estás en psql

-- PASO 1: Desconectar todas las sesiones activas
SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'db_bbva'
  AND pid <> pg_backend_pid();

-- PASO 2: Eliminar la base de datos si existe
DROP DATABASE IF EXISTS db_bbva;

-- PASO 3: Crear la base de datos nuevamente
CREATE DATABASE db_bbva;

