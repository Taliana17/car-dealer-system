# Sistema de Venta de Autos — API REST (NestJS + PostgreSQL)

Este proyecto implementa una **API RESTful** para la gestión completa de un sistema de **venta de automóviles**, utilizando **Node.js con NestJS** como framework backend y **PostgreSQL** como sistema de gestión de base de datos relacional.

El sistema permite administrar vehículos, clientes, ventas, pagos y usuarios autenticados mediante **JWT**, garantizando seguridad y organización en la gestión de datos.


## Tecnologías Utilizadas

* **Node.js** — Entorno de ejecución JavaScript
* **NestJS** — Framework modular y escalable
* **PostgreSQL** — Sistema gestor de bases de datos relacional
* **TypeORM** — ORM para modelar y manipular datos
* **JWT (JSON Web Tokens)** — Autenticación y autorización
* **bcrypt** — Encriptación segura de contraseñas
* **dotenv** — Manejo de variables de entorno

## Instalación y Configuración

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/venta-autos.git
   cd venta-autos
   ```

2. **Instalar dependencias:**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto con la siguiente estructura:

   ```env
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=postgres
   DATABASE_PASSWORD=tu_contraseña
   DATABASE_NAME=autosales_db
   JWT_SECRET=clave_super_segura
   PORT=3000
   ```

4. **Ejecutar la aplicación:**

   ```bash
   npm run start:dev
   ```

## Estructura del Proyecto

```
src/
├── auth/               # Módulo de autenticación (JWT)
├── users/              # Usuarios del sistema
├── customers/          # Clientes
├── categories/         # Categorías de vehículos
├── features/           # Características de vehículos
├── vehicles/           # Vehículos
├── sales/              # Ventas
├── payments/           # Pagos
├── vehicle-features/   # Relación entre vehículos y características
├── database/           # Configuración TypeORM + PostgreSQL
├── app.module.ts
└── main.ts
```

## Entidades y Atributos

### `users`

| Campo    | Tipo      | Descripción                             |
| -------- | --------- | --------------------------------------- |
| id       | `uuid`    | Identificador único                     |
| name     | `varchar` | Nombre del usuario                      |
| password | `varchar` | Contraseña encriptada                   |
| role     | `varchar` | Rol del usuario (admin, vendedor, etc.) |
| email    | `varchar` | Correo electrónico                      |


### `customers`

| Campo       | Tipo      | Descripción            |
| ----------- | --------- | ---------------------- |
| id          | `uuid`    | Identificador único    |
| firstName   | `varchar` | Nombre                 |
| lastName    | `varchar` | Apellido               |
| document_id | `varchar` | Documento de identidad |
| phone       | `varchar` | Teléfono               |
| email       | `varchar` | Correo electrónico     |


### `categories`

| Campo | Tipo      | Descripción                                       |
| ----- | --------- | ------------------------------------------------- |
| id    | `uuid`    | Identificador único                               |
| name  | `varchar` | Nombre de la categoría (SUV, sedán, pickup, etc.) |


### `vehicles`

| Campo       | Tipo            | Descripción                         |
| ----------- | --------------- | ----------------------------------- |
| id          | `uuid`          | Identificador único                 |
| vin         | `varchar`       | Número de serie del vehículo        |
| brand       | `varchar`       | Marca                               |
| model       | `varchar`       | Modelo                              |
| year        | `integer`       | Año de fabricación                  |
| price       | `numeric(12,2)` | Precio                              |
| color       | `varchar`       | Color                               |
| category_id | `uuid (FK)`     | Categoría del vehículo              |
| customer_id | `uuid (FK)`     | Cliente que lo adquirió (si aplica) |


### `features`

| Campo | Tipo      | Descripción                                                        |
| ----- | --------- | ------------------------------------------------------------------ |
| id    | `uuid`    | Identificador único                                                |
| name  | `varchar` | Nombre de la característica (Ej: “Asientos de cuero”, “GPS”, etc.) |


### `vehicle_features`

| Campo      | Tipo        | Descripción             |
| ---------- | ----------- | ----------------------- |
| id         | `uuid`      | Identificador único     |
| vehicle_id | `uuid (FK)` | Vehículo asociado       |
| feature_id | `uuid (FK)` | Característica asociada |


### `sales`

| Campo       | Tipo            | Descripción         |
| ----------- | --------------- | ------------------- |
| id          | `uuid`          | Identificador único |
| date        | `timestamp`     | Fecha de la venta   |
| total       | `numeric(12,2)` | Monto total         |
| notes       | `varchar`       | Observaciones       |
| customer_id | `uuid (FK)`     | Cliente comprador   |
| vehicle_id  | `uuid (FK)`     | Vehículo vendido    |

### `payments`

| Campo   | Tipo            | Descripción                                             |
| ------- | --------------- | ------------------------------------------------------- |
| id      | `uuid`          | Identificador único                                     |
| amount  | `numeric(12,2)` | Valor del pago                                          |
| method  | `varchar`       | Método de pago (efectivo, tarjeta, transferencia, etc.) |
| date    | `timestamp`     | Fecha del pago                                          |
| sale_id | `uuid (FK)`     | Venta relacionada                                       |


## Autenticación con JWT

El sistema utiliza **JSON Web Tokens (JWT)** para la autenticación de usuarios y la protección de endpoints.
Cada token se genera al iniciar sesión y debe enviarse en el encabezado HTTP de las solicitudes protegidas:

```
Authorization: Bearer <token>
```

## Ejemplos de Endpoints

### Registrar un usuario

**POST** `/auth/register`

```json
{
  "name": "Admin",
  "email": "admin@autosales.com",
  "password": "admin123",
  "role": "admin"
}
```

**Respuesta**

```json
{
  "message": "Usuario registrado exitosamente"
}
```

### Iniciar sesión

**POST** `/auth/login`

```json
{
  "email": "admin@autosales.com",
  "password": "admin123"
}
```

**Respuesta**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

### Crear un vehículo

**POST** `/vehicles`

```json
{
  "vin": "2HGFC2F59JH012345",
  "brand": "Toyota",
  "model": "Corolla",
  "year": 2022,
  "price": 95000,
  "color": "Gris",
  "category_id": "uuid-categoria"
}
```

**Respuesta**

```json
{
  "id": "uuid-del-vehiculo",
  "brand": "Toyota",
  "model": "Corolla",
  "price": 95000
}
```

### Registrar una venta

**POST** `/sales`

```json
{
  "date": "2025-10-23T10:30:00Z",
  "total": 98000,
  "notes": "Venta financiada a 6 meses",
  "customer_id": "uuid-cliente",
  "vehicle_id": "uuid-vehiculo"
}
```

**Respuesta**

```json
{
  "id": "uuid-venta",
  "total": 98000,
  "status": "success"
}
```

### Registrar un pago

**POST** `/payments`

```json
{
  "amount": 15000,
  "method": "tarjeta",
  "sale_id": "uuid-venta"
}
```

**Respuesta**

```json
{
  "message": "Pago registrado correctamente",
  "payment_id": "uuid-pago"
}
```

## Licencia
Este proyecto está bajo la licencia **MIT**.
Se permite su uso y modificación con fines académicos o de desarrollo libre.
