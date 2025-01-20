# Proyecto Angular + Express

Este proyecto combina un frontend desarrollado en **Angular** y un backend construido con **Express**. Sigue los pasos a continuación para instalar y ejecutar el proyecto.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/) (versión recomendada: 16.x o superior).
- [Angular CLI](https://angular.io/cli) (instalable globalmente con `npm install -g @angular/cli`).

## Instalación

### 1. Clonar el repositorio

Clona este repositorio en tu máquina local:

```bash
git clone https://github.com/HKevinH/monorepo.git
cd tu-repositorio
```

2. Instalar dependencias
   Ejecuta los siguientes comandos para instalar las dependencias tanto del frontend como del backend:

Frontend (Angular)
bash
Copiar
Editar
cd frontend
npm install
Backend (Express)
bash
Copiar
Editar
cd ../backend
npm install

```plaintext
monorepo/
├── backend/                     # Backend construido con Express
│   ├── src/                     # Código fuente del backend
│   │   ├── config/              # Configuración general del proyecto
│   │   ├── core/                # Elementos esenciales del dominio
│   │   │   ├── domain/          # Entidades y repositorios
│   │   │   └── handlers/        # Manejo de lógica compartida
│   │   ├── infrastructure/      # Interacción con la infraestructura
│   │   ├── routes/              # Definición de rutas HTTP
│   │   ├── app.ts               # Configuración principal del backend
│   │   └── server.ts            # Punto de entrada del servidor
│   ├── package.json             # Configuración del backend
│   └── tsconfig.json            # Configuración de TypeScript para el backend
│
├── frontend/                    # Frontend construido con Angular
│   ├── src/                     # Código fuente del frontend
│   │   ├── app/                 # Componentes principales
│   │   │   ├── components/      # Componentes reutilizables
│   │   │   └── services/        # Servicios para comunicación con el backend
│   ├── package.json             # Configuración del frontend
│   ├── tsconfig.json            # Configuración de TypeScript para el frontend
│   └── angular.json             # Configuración del proyecto Angular
│
├── shared/                      # Código compartido entre backend y frontend
│
├── .env                         # Variables de entorno
├── package.json                 # Configuración del monorepo (scripts globales)
├── tsconfig.json                # Configuración global de TypeScript
├── README.md                    # Documentación del proyecto
└── node_modules/                # Dependencias del proyecto
```
