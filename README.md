🏦 Banco API — Backend

Backend desarrollado con Node.js, Express, PostgreSQL y Sequelize.
Proporciona una API RESTful para la gestión de cuentahabientes, cuentas, movimientos, préstamos, sucursales y más.

🧠 Descripción general

Este backend implementa la lógica de negocio del dominio bancario, permitiendo:

Gestión de cuentahabientes y sus tipos de documento.

Apertura y administración de cuentas.

Registro de movimientos financieros.

Manejo de sucursales, tipos y ubicación por ciudad.

Administración de préstamos asociados a cuentas.

El objetivo es ofrecer una arquitectura modular, escalable y mantenible, que pueda integrarse fácilmente con un frontend React o cualquier otro cliente REST.

🛠️ Tecnologías principales
Tecnología	Descripción
Node.js	Entorno de ejecución JavaScript
Express.js	Framework para crear APIs REST
PostgreSQL	Base de datos relacional
Sequelize	ORM para PostgreSQL
dotenv	Manejo de variables de entorno
nodemon	Recarga automática en desarrollo
🧩 Modelo entidad–relación (MER)

Entidades principales:

🧍 Cuentahabiente

📄 TipoDocumento

💳 Cuenta

🏷️ TipoCuenta

🤝 Titular

💰 Movimiento

🔁 TipoMovimiento

🏢 Sucursal

🏬 TipoSucursal

🌆 Ciudad

🧾 Préstamo

Cada entidad se define como un modelo Sequelize con sus respectivas asociaciones y llaves foráneas, basadas en las relaciones del modelo entidad-relación bancario.

⚙️ Instalación y configuración
1️⃣ Clonar el repositorio
git clone https://github.com/tu-usuario/banco-backend.git
cd banco-backend

2️⃣ Instalar dependencias
npm install

3️⃣ Crear archivo de entorno

Crea un archivo .env en la raíz del proyecto:

PORT=5000
DB_NAME=db_bbva
DB_USER=postgres
DB_PASSWORD=tu_clave
DB_HOST=localhost
JWT_SECRET=mi_clave_secreta

📁 Estructura del proyecto
banco_api/
│
├── src/
│   ├── app.js              # Configuración principal de Express
│   ├── server.js           # Punto de entrada del servidor
│   ├── config/
│   │   └── database.js     # Conexión Sequelize + PostgreSQL
│   ├── models/             # Definición de modelos Sequelize
│   ├── controllers/        # Lógica de control (manejo de requests)
│   ├── services/           # Reglas de negocio
│   ├── routes/             # Definición de rutas API REST
│   ├── middlewares/        # Middlewares personalizados
│   └── utils/              # Funciones auxiliares
│
├── .env                    # Variables de entorno
├── .gitignore
├── package.json
└── README.md

🚀 Ejecución del servidor
🔧 Modo desarrollo
npm run dev

🏗️ Modo producción
npm start


El servidor se ejecuta por defecto en:

http://localhost:5000
