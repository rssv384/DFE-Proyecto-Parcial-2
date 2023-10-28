# TODO List - Proyecto 2° Parcial DFE

Este proyecto se trata de una aplicación de lista de tareas (TODO List) que se conecta a una API externa para realizar operaciones CRUD (Crear, Leer, Actualizar y Borrar) en tareas específicas. El objetivo de este proyecto es aplicar los conocimientos adquiridos en el curso: sintaxis de JavaScript, manipulación del DOM, protocolo HTTP y Fetch API.

## Requisitos del Sistema

- **Node.js**: Versión 12 o superior. Puedes descargarlo desde [nodejs.org](https://nodejs.org/).
- **npm**: Versión 6 o superior. npm generalmente se instala junto con Node.js.

## Instalación del Proyecto

Tras instalar _Node.js_ y _npm_ instalados, podrás instalar y configurar el proyecto en tu entorno de desarrollo local:

1. Clona el repositorio:

```bash
git clone https://github.com/rssv384/DFE-Proyecto-Parcial-2.git
```

2. Navega al directorio raíz del proyecto:

```bash
cd DFE-Proyecto-Parcial-2
```

3. Instala las dependencias del proyecto utilizando npm (Node Package Manager):

```bash
npm install
```

4. Inicia el servidor de desarrollo:

```bash
npm start
```

_NOTA: Mientras el servidor de desarrollo esté en ejecución, las hojas de estilo SASS se compilarán automáticamente cada vez que se realicen cambios y se guarden._

## Tecnologías Utilizadas

- HTML
- CSS
- SASS
- JavaScript

## Estructura del proyecto

```bash

DFE-Proyecto-Parcial-2/    # Carpeta principal del proyecto
│
├── src
│   ├── assets/           # Carpeta para archivos estáticos
│   │    ├── css/         # Carpeta para archivos CSS compilados
│   │    ├── img/         # Carpeta para imagenes estáticas
│   │    └── scss/        # Carpeta para archivos SASS
│   │
│   ├── js/                 # Carpeta para archivos JavaScript
│   │    ├── fetch-api.js   # JavaScript para el consumo de datos de la API
│   │    └── script.js      # JavaScript principal para funcionalidad general
│   │
│   └─── index.html       # Homepage
│
├── .gitignore            # Excluir carpetas y archivos de Git
│
├── README.md             # Documentación del proyecto
│
└── package.json          # Manifiesto con la información del proyecto

```

## Licencia

**[MIT License](https://opensource.org/license/mit/)**

Copyright (c) 2023 | Raúl Soto
