# 🎬 Watchlist de Cine y Series (HTML & CSS)

Una aplicación web estática diseñada para gestionar películas y series pendientes por ver, desarrollada con HTML5 semántico y CSS3 responsive.

## 📌 Descripción del Proyecto

Este proyecto simula la interfaz visual de una To-Do List temática de cine y series. Permite visualizar una lista de títulos guardados, filtrar por categorías, marcar elementos como vistos con estados visuales en CSS puro y consultar el avance en una barra de progreso.

## 🚀 Tecnologías Utilizadas

* **HTML5:** Estructura semántica (`header`, `main`, `section`, `form`, `ul`, `li`, `footer`).

* **CSS3:**
  * Variables CSS (`:root`) para gestión de temas.
  * Diseños adaptativos con **Flexbox** y **CSS Grid**.
  * Pseudoclases y selectores avanzados (`:checked`, `~`, `:focus-visible`) para simular estados dinámicos sin JavaScript.
  * **Media Queries** para soporte responsive en móviles (portrait y landscape) y escritorio.

## 📂 Estructura del Proyecto

```text
todo-list/
├── index.html
├── README.md
├── css/
│   └── styles.css
└── assets/
    ├── favicon/
    └── posters/
```

## ✨ Características Principales

* **Semántica y Accesibilidad:** Uso estricto de etiquetas HTML semánticas y vinculación correcta de `label` e `input`.

* **Diseño Responsivo:** Adaptación completa a pantallas móviles en posición vertical y horizontal.

* **Modo Oscuro Cinematográfico:** Paleta de colores personalizada con estética de plataforma de streaming.

* **Estados Visuales en CSS:** Los elementos marcados como vistos aplican tachado, escala de grises y cambio de opacidad automáticamente mediante el selector `:checked`.

## 👤 Autora:

* **Linneth Rodrigues**