# 🎬 Watchlist de Cine y Series (HTML, CSS, JS)

Una aplicación web interactiva diseñada para gestionar películas y series pendientes por ver, desarrollada con HTML5 semántico, CSS3 responsive y JavaScript vanilla.

## 📌 Descripción del Proyecto

Este proyecto es una **Watchlist interactiva** de cine y series. Permite a los usuarios añadir títulos, clasificarlos por categoría (películas o series), editarlos mediante modales interactivos, marcarlos como completados y realizar un seguimiento del avance en tiempo real. Los datos se persisten de manera local en el navegador del usuario mediante `localStorage`.

## 🚀 Tecnologías Utilizadas

* **HTML5:** Estructura semántica (`header`, `main`, `section`, `form`, `ul`, `li`, `footer`).

* **CSS3:**
  * Variables CSS (`:root`) para gestión de temas y consistencia visual.
  * Diseños adaptativos con **Flexbox** y **CSS Grid**.
  * Pseudoclases y transiciones para interacciones y estados visuales.
  * **Media Queries** para soporte responsive en móviles, tablets y escritorio.

* **JavaScript (Vanilla):**
  * Manipulación dinámica del DOM y lógica de renderizado.
  * API de **LocalStorage** para persistencia de datos.
  * Delegación de eventos (`e.target.closest`) para optimización de rendimiento.
  * Modales interactivos con soporte para teclado (tecla `Escape`).

## 📂 Estructura del Proyecto

```text
todo-list/
├── index.html
├── README.md
├── css/
│   └── styles.css
├── js/
│   └── app.js
└── assets/
    ├── favicon/
    └── posters/
```

## ✨ Características Principales

* **Gestión Dinámica de Títulos:** 
  * Añade películas o series indicando tipo y puntuación opcional.
  * Asignación automática de pósters y notas predeterminadas para títulos conocidos.
  * Manejo de imágenes por defecto (onerror) si falla la carga de un póster.

* **Persistencia de Datos (LocalStorage):** 
  * Carga inicial automática con un listado prediseñado.
  * Guardado automático de cualquier cambio (creación, edición, cambio de estado o borrado).

* **Filtrado Dinámico:**
  * Filtra la lista en tiempo real por Todas, Películas, Series o Pendientes.

* **Progreso en Tiempo Real:**
  * Cálculo dinámico del porcentaje de títulos completados con barra de avance animada.

* **Modales Interactivos:**
  * **Edición:** Haz clic en la nota o póster de un ítem para modificar su imagen y/o puntuación sobre 10.
  * **Confirmación:** Modal de confirmación previa para evitar el borrado accidental de toda la lista.

* **Acciones de Borrado:**
  * Borrado individual por ítem, eliminación masiva de elementos completados o vaciado completo de la lista.

* **Estados Visuales en CSS:** Los elementos marcados como vistos aplican tachado, escala de grises y cambio de opacidad automáticamente mediante el selector `:checked`.

* **Diseño Responsivo y Accesibilidad:**
  * Adaptado a pantallas móviles y de escritorio con paleta de colores cinematográfica en modo oscuro.
  * Accesibilidad mediante cierre de ventanas modales al presionar la tecla `Escape`.

## 👤 Autora:

* **Linneth Rodrigues**