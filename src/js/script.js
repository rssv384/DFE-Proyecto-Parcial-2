toDoList = [];

// #region DATA MODELS

// Definir clase Task
class Task {
	constructor(id, title, description, completed, priority, tag, dueDate) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.completed = completed;
		this.priority = priority;
		this.tag = tag;
		this.dueDate = dueDate;
	}
}

function mapTasksData(data) {
	return data.map((item) => {
		return new Task(
			item.id,
			item.title,
			item.description,
			item.completed,
			item.priority,
			item.tag,
			new Date(item.date)
		);
	});
}
// #endregion

// #region TODO LIST TABLE VIEW
// Función que controla el despliegue de la tabla de tareas y los mensajes
// pertinentes
function displayTasksView(tasks) {
	clearTable();

	showLoadingMessage();

	if (tasks.length === 0) {
		showNotFoundMessage();
	} else {
		hideMessage();
		displayToDoList(tasks);
	}
}

// Funcion que agrega la info de las tareas a la tabla.
function displayToDoList(tasks) {
	const tableBody = document.getElementById('to-do-list-table-body');

	tasks.forEach((task) => {
		const row = document.createElement('tr');

		let taskStatus = task.completed ? 'Completada' : 'Pendiente';

		row.innerHTML = `
		<td>${task.title}</td>
		<td>${task.description}</td>
		<td>${taskStatus}</td>
		<td>${task.priority}</td>
		<td>${task.tag}</td>
		<td>${task.dueDate.toLocaleDateString('en-MX')}</td>
		<td>
		  <button class="btn-edit" task-id="${task.id}">Editar</button>
		</td>
		<td>
		  <button class="btn-delete" task-id="${task.id}">Eliminar</button>
		</td>
	  `;

		tableBody.appendChild(row);
	});
}

// Funcion que limpia la tabla
function clearTable() {
	const tableBody = document.getElementById('to-do-list-table-body');

	tableBody.innerHTML = '';
}

// Funcion que muestra mensaje de carga de datos
function showLoadingMessage() {
	const message = document.getElementById('message');

	message.innerHTML = 'Cargando...';

	message.style.display = 'block';
}

// Funcion que muestra mensaje de que no se encontraron datos
function showNotFoundMessage() {
	const message = document.getElementById('message');

	message.innerHTML = 'No se encontraron tareas para mostrar.';

	message.style.display = 'block';
}

// Funcion que oculta mensaje
function hideMessage() {
	const message = document.getElementById('message');

	message.style.display = 'none';
}
// #endregion

// #region FILTERS
function initFilterButtonsHandler() {
	document.getElementById('filter-form').addEventListener('submit', (event) => {
		event.preventDefault();
		console.log('Filtrar tareas.');
	});

	document.getElementById('filter-form').addEventListener('reset', (event) => {
		event.preventDefault();
		console.log('Restablecer filtros.');
	});
}
// #endregion

// #region MODAL & ADD TASK FORM
// Event Handlers para abrir/cerrar el modal, agregar/eliminar item de la venta
// y confirmar ventar
function initAddTaskButtonsHandler() {
	document.getElementById('add-task').addEventListener('click', () => {
		document.getElementById('modal-background').style.display = 'block';
		document.getElementById('modal').style.display = 'block';
		console.log('Click en Nueva Tarea');
	});

	document.getElementById('modal-background').addEventListener('click', () => {
		closeModal();
	});

	document
		.getElementById('add-task-form')
		.addEventListener('submit', (event) => {
			event.preventDefault();
			console.log('Nueva tarea añadida con éxito.');
		});
}

// Cerrar modal y restablecer estado
function closeModal() {
	document.getElementById('add-task-form').reset();
	document.getElementById('modal-background').style.display = 'none';
	document.getElementById('modal').style.display = 'none';
}
// #endregion

// #region INIT FUNCTIONALITY
initAddTaskButtonsHandler();
displayTasksView(toDoList);
// #endregion
