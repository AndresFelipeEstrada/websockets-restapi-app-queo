# 📊 Sistema de Turnos para Banco

Aplicación web para la gestión y visualización de turnos en un banco. Permite generar tickets y mostrar en tiempo real cuál es el siguiente cliente en ser atendido en cada ventanilla.

---

## 🧠 Descripción

Este sistema simula el flujo de atención en una entidad bancaria, donde los usuarios toman un ticket y esperan a ser llamados en pantalla.

Incluye:

* Generación de tickets
* Asignación de turnos a ventanillas
* Visualización en tiempo real de los turnos activos

Toda la comunicación en tiempo real se maneja mediante **WebSockets**, permitiendo actualizaciones instantáneas sin recargar la página.

---

## ⚙️ Tecnologías

### Backend

* Node.js
* Express
* TypeScript
* WebSockets (`ws`)

### Frontend

* JavaScript Vanilla
* WebSockets

---

## 🚀 Características

* 🎟️ Generación de tickets
* 🖥️ Visualización del ticket actual
* 📺 Pantalla de turnos en tiempo real
* 🪑 Soporte para múltiples ventanillas
* 🔄 Reset diario del sistema
* ⚡ Comunicación en tiempo real con WebSockets
* 🧠 Estado manejado en memoria (sin base de datos)

---

## 📦 Instalación

```bash
git clone https://github.com/AndresFelipeEstrada/websockets-restapi-app-queo
cd websockets-restapi-app-queo
npm install
```

---

## ▶️ Ejecución

### Desarrollo

```bash
npm run dev
```

### Producción

```bash
npm run start
```

---

## 📁 Estructura del proyecto

```
src/
 ├── app.ts
 ├── controllers/
 ├── services/
 ├── websockets/
 ├── models/
 └── routes/
```

---

## 🔌 Scripts disponibles

```json
"dev": "tsnd --respawn --clear src/app.ts",
"build": "rimraf ./dist && tsc",
"start": "npm run build && node dist/app.js"
```

---

## 🌐 Funcionamiento

1. Un usuario genera un ticket.
2. El sistema lo agrega a la cola.
3. Una ventanilla solicita el siguiente turno.
4. La pantalla pública se actualiza en tiempo real mostrando:

   * Ticket actual
   * Ventanilla asignada

---

## ⚠️ Consideraciones

* Los datos se almacenan **en memoria**, por lo que:

  * Se reinician al apagar el servidor
  * No hay persistencia
* Ideal para:

  * Pruebas
  * Demostraciones
  * Aprendizaje de WebSockets

---

## 👨‍💻 Autor

Andres Felipe Estrada

---

## 📄 Licencia

ISC
