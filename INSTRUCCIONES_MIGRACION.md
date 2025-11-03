# Instrucciones para Migrar a UUIDs

## ⚠️ IMPORTANTE: Esto eliminará TODOS los datos existentes

## Pasos para recrear la base de datos con UUIDs:

### Opción 1: Desde psql (recomendado)

```bash
# 1. Conectarse a PostgreSQL
psql -U tu_usuario -d postgres

# 2. Ejecutar el script de recreación
\i banco_api/recreate_database.sql

# 3. Conectarse a la nueva base de datos
\c db_bbva

# 4. Habilitar extensión UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

# 5. Ejecutar el schema completo
\i banco_api/schema.sql
```

### Opción 2: Desde línea de comandos

```bash
# 1. Recrear la base de datos
psql -U tu_usuario -d postgres -f banco_api/recreate_database.sql

# 2. Conectarse y ejecutar el schema
psql -U tu_usuario -d db_bbva -c "CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";" -f banco_api/schema.sql
```

### Opción 3: Manual paso a paso

1. Conectarse a PostgreSQL: `psql -U tu_usuario -d postgres`
2. Ejecutar: `DROP DATABASE IF EXISTS db_bbva;`
3. Ejecutar: `CREATE DATABASE db_bbva;`
4. Ejecutar: `\c db_bbva`
5. Ejecutar: `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`
6. Ejecutar el contenido del archivo `schema.sql` desde la línea 14 en adelante

## Después de la migración:

- ✅ Los IDs se guardarán como UUIDs en la base de datos
- ✅ En el frontend se mostrarán números secuenciales (1, 2, 3...)
- ✅ Las operaciones CRUD seguirán usando los UUIDs reales

