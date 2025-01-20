# Estructura del Backend con Domain-Driven Design (DDD)

Este backend está diseñado utilizando los principios de **Domain-Driven Design (DDD)**, asegurando modularidad, escalabilidad y separación de responsabilidades.

## Estructura del Proyecto

La estructura del proyecto sigue los principios de DDD, separando las responsabilidades en capas:


## Capas y Responsabilidades

### 1. Core

Esta carpeta contiene los conceptos fundamentales del dominio:

- **domain/**: Entidades, objetos de valor y agregados que definen el núcleo del dominio.
- **application/**: Casos de uso generales que orquestan la lógica de negocio principal.
- **infrastructure/**: Implementaciones genéricas para interactuar con bases de datos o servicios externos.
- **shared/**: Abstracciones y utilidades compartidas entre módulos.

### 2. Modules

Cada módulo representa un **Bounded Context** dentro del dominio:

- **domain/**:
  - Define las entidades, objetos de valor y repositorios específicos del contexto.
- **application/**:
  - Contiene los casos de uso específicos del módulo.
  - Cada caso de uso está diseñado para cumplir un único propósito.
- **infrastructure/**:
  - Implementaciones concretas de los repositorios definidos en la capa `domain`.
- **controllers/**:
  - Controladores HTTP que gestionan las solicitudes y llaman a los casos de uso correspondientes.
