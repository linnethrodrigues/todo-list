"use strict";

/* 
Listado de películas/series por defecto 
(para cuando se abre la app por primera vez)
*/

const initialTodos = [
  {
    id: 1,
    title: "House of the Dragon",
    type: "serie",
    rating: "8,3",
    poster: "./assets/posters/house-of-the-dragon.jpg",
    completed: false,
  },
  {
    id: 2,
    title: "Guardianes de la Galaxia Vol. 3",
    type: "pelicula",
    rating: "7,9",
    poster: "./assets/posters/guardianes-galaxia-3.jpg",
    completed: false,
  },
  {
    id: 3,
    title: "Sense8",
    type: "serie",
    rating: "8,2",
    poster: "./assets/posters/sense8.jpg",
    completed: false,
  },
  {
    id: 4,
    title: "La casa de papel",
    type: "serie",
    rating: "8,2",
    poster: "./assets/posters/casa-de-papel.jpg",
    completed: false,
  },
  {
    id: 5,
    title: "Avengers: Endgame",
    type: "pelicula",
    rating: "8,4",
    poster: "./assets/posters/avengers-endgame.jpg",
    completed: false,
  },
  {
    id: 6,
    title: "Avatar: El Sentido del Agua",
    type: "pelicula",
    rating: "7,5",
    poster: "./assets/posters/avatar-2.jpg",
    completed: false,
  },
  {
    id: 7,
    title: "Stranger Things",
    type: "serie",
    rating: "8,6",
    poster: "./assets/posters/stranger-things.jpg",
    completed: false,
  },
  {
    id: 8,
    title: "Spider-Man: No Way Home",
    type: "pelicula",
    rating: "8,1",
    poster: "./assets/posters/spiderman-no-way-home.jpg",
    completed: false,
  },
  {
    id: 9,
    title: "Wednesday",
    type: "serie",
    rating: "8,0",
    poster: "./assets/posters/wednesday.jpg",
    completed: false,
  },
  {
    id: 10,
    title: "Jurassic World",
    type: "pelicula",
    rating: "6,9",
    poster: "./assets/posters/jurassic-world.jpg",
    completed: false,
  },
  {
    id: 11,
    title: "Game of Thrones",
    type: "serie",
    rating: "9,2",
    poster: "./assets/posters/game-of-thrones.jpg",
    completed: false,
  },
];

/* 
Si ya hay algo guardado en localStorage lo usa; 
si no, usa el listado de prueba
*/
let todos = JSON.parse(localStorage.getItem("todos")) || initialTodos;
let activeTodoForModal = null;
let currentFilter = "todas";

const form = document.querySelector("#watchlist-form");
const inputTitle = form.querySelector("#title-input");
const selectType = form.querySelector("#type-select");
const taskList = document.querySelector("#task-list");
const progressStats = document.querySelector("#progress-stats");
const progressBarFill = document.querySelector("#progress-bar-fill");
const btnDeleteCompleted = document.querySelector("#btn-delete-completed");
const btnDeleteAll = document.querySelector("#btn-delete-all");
const inputRating = form.querySelector("#rating-input");
const imageModal = document.querySelector("#image-modal");
const modalImg = document.querySelector("#modal-img");
const modalTitle = document.querySelector("#modal-title");
const modalClose = document.querySelector("#modal-close");
const modalForm = document.querySelector("#modal-form");
const modalInputRating = document.querySelector("#modal-input-rating");
const modalInputPoster = document.querySelector("#modal-input-poster");
const filterBtns = document.querySelectorAll(".filter-btn");
const confirmModal = document.querySelector("#confirm-modal");
const btnCancelDelete = document.querySelector("#btn-cancel-delete");
const btnConfirmDelete = document.querySelector("#btn-confirm-delete");

function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

/* 
Validación: 
Limpia espacios al inicio y al final 
Comprueba que no sea nulo ni cadena de texto vacía
*/
function validateTitle(title) {
  if (!title) return false;
  return title.trim().length > 0;
}

function getDefaultPoster(type) {
  return type === "serie"
    ? "./assets/posters/serie-sin-portada.svg"
    : "./assets/posters/pelicula-sin-portada.svg";
}

function updateProgress() {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  progressStats.textContent = `${completed} de ${total} completadas (${percentage}%)`;
  progressBarFill.style.width = `${percentage}%`;
}

//Devolver la lista filtrada
function getFilteredTodos() {
  if (currentFilter === "pelicula") {
    return todos.filter((todo) => todo.type === "pelicula");
  }
  if (currentFilter === "serie") {
    return todos.filter((todo) => todo.type === "serie");
  }
  if (currentFilter === "pendientes") {
    return todos.filter((todo) => !todo.completed);
  }

  return todos;
}

// Pinta la lista completa en DOM desde el array
function renderTodoList() {
  const filtered = getFilteredTodos();

  taskList.innerHTML = "";

  filtered.forEach((todo) => {
    const isChecked = todo.completed ? "checked" : "";
    const badgeClass = todo.type === "serie" ? "badge-series" : "badge-movie";
    const typeLabel = todo.type === "serie" ? "Serie" : "Película";
    const defaultPoster = getDefaultPoster(todo.type);
    const posterSrc = todo.poster || defaultPoster;

    const ratingHtml = todo.rating
      ? `<span class="task-rating">★ <strong>${todo.rating}</strong><span class="rating-max">/10</span></span>`
      : "";

    const li = document.createElement("li");
    li.className = "task-item";
    li.dataset.id = todo.id;

    li.innerHTML = `
        <input type="checkbox" class="task-checkbox" id="todo-${todo.id}" ${isChecked}>
        <img src="${posterSrc}" alt="${todo.title}" class="task-poster" title="Haz clic para cambiar la portada" style="cursor: pointer;" onerror="this.onerror=null; this.src='${defaultPoster}'">
        <label for="todo-${todo.id}" class="task-label">${todo.title}</label>
        ${ratingHtml}
        <span class="badge ${badgeClass}">${typeLabel}</span>
        <button type="button" class="btn-delete-task" title="Eliminar de la lista">&times;</button>
    `;

    taskList.appendChild(li);
  });

  updateProgress();
}

renderTodoList();

//Envío de formulario
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Evita que la página se recargue

  const titleValue = inputTitle.value;
  const typeValue = selectType.value;

  if (!validateTitle(titleValue) || !typeValue) {
    return;
  }

  // Buscamos si el título ya existe en los elementos por defecto
  const matchedInitial = initialTodos.find(
    (item) => item.title.toLowerCase() === titleValue.trim().toLowerCase(),
  );

  // Si coincide usa su portada; si no, el SVG por defecto
  const posterValue = matchedInitial
    ? matchedInitial.poster
    : getDefaultPoster(typeValue);

  /*
    Determinamos la nota (rating):
    - Si el usuario escribió una nota, la usamos.
    - Si el campo está vacío pero la película existía en initialTodos, usamos su nota original.
    - Si no escribió nada y es un título nuevo, se guarda como "".
  */
  let ratingValue = "";
  if (inputRating.value.trim() !== "") {
    ratingValue = inputRating.value.replace(".", ",");
  } else if (matchedInitial) {
    ratingValue = matchedInitial.rating;
  }

  // Crea un nuevo objeto para el array
  const newTodo = {
    id: Date.now(),
    title: titleValue.trim(),
    type: typeValue,
    rating: ratingValue,
    poster: posterValue,
    completed: false,
  };

  todos.push(newTodo);
  saveToLocalStorage();
  renderTodoList();

  form.reset();
  inputTitle.focus();
});

// Permitir modificar el rating o el poster haciendo click sobre ellos
taskList.addEventListener("click", function (e) {
  const li = e.target.closest(".task-item");
  if (!li) return;

  const todoId = Number(li.dataset.id);

  // Borrado individual
  if (e.target.closest(".btn-delete-task")) {
    todos = todos.filter((item) => item.id !== todoId);
    saveToLocalStorage();
    renderTodoList();
    return;
  }

  const todo = todos.find((item) => item.id === todoId);
  if (!todo) return;

  // Cambia el rating y/o el póster
  const ratingSpan = e.target.closest(".task-rating");
  const posterImg = e.target.closest(".task-poster");

  if (ratingSpan || posterImg) {
    openModal(todo);
  }
});

taskList.addEventListener("change", function (e) {
  if (e.target.classList.contains("task-checkbox")) {
    const li = e.target.closest(".task-item");
    if (!li) return;

    const todoId = Number(li.dataset.id);
    const todo = todos.find((item) => item.id === todoId);

    if (todo) {
      todo.completed = e.target.checked;
      saveToLocalStorage();
      renderTodoList();
    }
  }
});

function openModal(todo) {
  activeTodoForModal = todo;

  const defaultPoster = getDefaultPoster(todo.type);

  modalImg.src = todo.poster || defaultPoster;
  modalTitle.textContent = todo.title;
  modalInputRating.value = todo.rating ? todo.rating.replace(",", ".") : "";
  /* Si el poster actual es la que es por defecto, 
  dejamos el input vacío para no ensuciar el campo con la ruta local */
  const isDefaultPoster = todo.poster === getDefaultPoster(todo.type);
  modalInputPoster.value = todo.poster && !isDefaultPoster ? todo.poster : "";

  imageModal.classList.add("active");
}

function closeModal() {
  imageModal.classList.remove("active");
  activeTodoForModal = null;
}

modalClose.addEventListener("click", closeModal);

imageModal.addEventListener("click", function (e) {
  if (e.target === imageModal) {
    closeModal();
  }
});

function closeConfirmModal() {
  confirmModal.classList.remove("active");
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    if (imageModal.classList.contains("active")) {
      closeModal();
    }
    if (confirmModal.classList.contains("active")) {
      closeConfirmModal();
    }
  }
});

btnCancelDelete.addEventListener("click", closeConfirmModal);

btnConfirmDelete.addEventListener("click", function () {
  todos = [];
  saveToLocalStorage();
  renderTodoList();
  closeConfirmModal();
});

confirmModal.addEventListener("click", function (e) {
  if (e.target === confirmModal) {
    closeConfirmModal();
  }
});

// Guardar los cambios del formulario
modalForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!activeTodoForModal) return;

  const newRating = modalInputRating.value.trim();
  const newPoster = modalInputPoster.value.trim();

  // Actualiza la nota si se escribió algo, o la deja como "" si se borró
  activeTodoForModal.rating =
    newRating !== "" ? newRating.replace(".", ",") : "";

  // Guardar poster solo si el usuario escribió una nueva
  if (newPoster !== "") {
    activeTodoForModal.poster = newPoster;
  }
  // Si lo dejó en blanco y no tenía ningun poster, le asignamos la imagen por defecto
  else if (!activeTodoForModal.poster) {
    activeTodoForModal.poster = getDefaultPoster(activeTodoForModal.type);
  }

  saveToLocalStorage();
  renderTodoList();
  closeModal();
});

// Pestañas de filtro
filterBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    filterBtns.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");
    currentFilter = this.dataset.filter;
    renderTodoList();
  });
});

//Borrar todos los elementos completados
btnDeleteCompleted.addEventListener("click", function () {
  todos = todos.filter((todo) => !todo.completed);
  saveToLocalStorage();
  renderTodoList();
});

//Borrar todos los elementos
btnDeleteAll.addEventListener("click", function () {
  confirmModal.classList.add("active");
});
