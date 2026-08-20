# Serena Mockup

Mockup/prototipo frontend construido con **Angular 19** (standalone components). No tiene backend real: todo el estado de los formularios y wizards se maneja en memoria usando **Angular Signals**. No requiere base de datos, variables de entorno ni servicios externos para funcionar.

## Requisitos previos

- **Node.js**: se recomienda una versión LTS compatible con Angular 19 (Node `20.x` o `22.x`).
- **npm**: incluido con Node.js (el repo usa `package-lock.json`, no `yarn`/`pnpm`).
- **Angular CLI** (opcional): puede instalarse global con `npm install -g @angular/cli`, o usar `npx ng` sin instalación global.

## Instalación

```bash
git clone <url-del-repositorio>
cd serena-mockup
npm install
```

## Levantar en desarrollo

```bash
npm start
```

Equivale a `ng serve`. La app queda disponible en `http://localhost:4200/` y se recarga automáticamente al guardar cambios.

## Build de producción

```bash
npm run build
```

Genera los artefactos en `dist/serena-mockup`.

## Build en modo watch (desarrollo)

```bash
npm run watch
```

## Tests unitarios

```bash
npm test
```

Ejecuta los tests con Karma + Jasmine.

> **Nota:** actualmente el proyecto no tiene lint (ESLint) ni tests end-to-end configurados.

## Variables de entorno

Este proyecto **no requiere** archivo `.env` ni ninguna otra configuración externa. Es un mockup autocontenido: no hay llamadas a APIs externas ni conexión a base de datos.

## Estructura del proyecto

```
src/
  app/
    forms/                 # Componentes, modelos y utilidades de formularios
    models/                 # Modelos de dominio (establecimiento, recursos, sustancias, estructura de trabajo)
    resolucion81-2019/      # Feature: componentes, páginas y servicios propios de Resolución 81/2019
    shared/                 # Componentes, campos y servicios compartidos entre features
    utils/                  # Utilidades generales (códigos de actividad, filtros)
    wizard/                 # Servicio y guard del wizard multi-paso (form-wizard.service.ts)
    app.component.*         # Componente raíz
    app.config.ts           # Configuración/providers de la app
    app.routes.ts           # Definición de rutas
  assets/
  index.html
  main.ts
  styles.scss
```

## Recursos adicionales

- [Documentación de Angular CLI](https://angular.dev/tools/cli)
