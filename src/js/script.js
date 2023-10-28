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
			new Date(item.dueDate)
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
		<td>${task.id}</td>
		<td>${task.title}</td>
		<td>${task.description}</td>
		<td>${taskStatus}</td>
		<td>${task.priority}</td>
		<td>${task.tag}</td>
		<td>${task.dueDate.toLocaleDateString('es-MX', { timeZone: 'UTC' })}</td>
		<td>
		  <button class="btn-edit" task-id="${task.id}">Editar</button>
		</td>
		<td>
		  <button class="btn-delete" task-id="${task.id}">Eliminar</button>
		</td>
	  `;

		tableBody.appendChild(row);
	});
	initDeleteTaskButtonHandler();
	initEditButtonHandler();
}

// Funcion que limpia la tabla
function clearTable() {
	const tableBody = document.getElementById('to-do-list-table-body');

	tableBody.innerHTML = '';
}

// Recargar la tabla de tareas
function reloadToDoList() {
	clearFilterForm();
	getTasks();
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

// Función para eliminar tareas de la lista
function initDeleteTaskButtonHandler() {
	document.querySelectorAll('.btn-delete').forEach((button) => {
		button.addEventListener('click', () => {
			const taskId = button.getAttribute('task-id');
			deleteTask(taskId);
		});
	});
}

function initEditButtonHandler() {
	document.querySelectorAll('.btn-edit').forEach((button) => {
		button.addEventListener('click', () => {
			const taskId = button.getAttribute('task-id');
			getTaskData(taskId);
			showModal('edit');
		});
	});
}
// #endregion

// #region FILTERS
function initFilterButtonsHandler() {
	document.getElementById('filter-form').addEventListener('submit', (event) => {
		event.preventDefault();
		filterTasks();
	});

	document.getElementById('filter-form').addEventListener('reset', (event) => {
		event.preventDefault();
		reloadToDoList();
	});
}

function clearFilterForm() {
	document
		.getElementById('filter-form')
		.querySelectorAll('input')
		.forEach((input) => (input.value = ''));
	document
		.getElementById('filter-form')
		.querySelectorAll('select')
		.forEach((select) => (select.selectedIndex = 0));
}

// Obtener los queryParams para la GET request con filtros
function filterTasks() {
	const statusFilter = document.getElementById('status-filter').value;
	let taskStatus = '';

	if (statusFilter === 'true') {
		taskStatus = true;
	} else if (statusFilter === 'false') {
		taskStatus = false;
	}

	// Obtener valores de los filtros
	const queryParams = {
		title: document.getElementById('title-filter').value,
		completed: taskStatus,
		priority: document.getElementById('priority-filter').value,
		tag: document.getElementById('tag-filter').value,
		dueDate: document.getElementById('due-date-filter').value,
	};

	getTasks(queryParams);
}
// #endregion

// #region MODAL & ADD TASK FORM
// Event Handlers para abrir/cerrar el modal, agregar/eliminar item de la venta
// y confirmar ventar
function initAddTaskButtonsHandler() {
	document.getElementById('add-task').addEventListener('click', (event) => {
		event.preventDefault();
		showModal('add');
	});

	document.getElementById('modal-background').addEventListener('click', () => {
		closeModal();
	});

	const taskForm = document.getElementById('add-task-form');

	taskForm.addEventListener('submit', (event) => {
		event.preventDefault();
		const task = processTaskForm();
		const mode = taskForm.getAttribute('mode');
		if (mode === 'add') {
			addTask(task);
		} else if (mode === 'edit') {
			editTask(task);
		}
	});
}

// Mostrar modal
function showModal(mode) {
	document.getElementById('modal-background').style.display = 'block';
	document.getElementById('modal').style.display = 'block';

	// Definir modo del formulario: EDITAR o AGREGAR tarea
	document.getElementById('add-task-form').setAttribute('mode', mode);

	if (mode === 'add') {
		document.getElementById('completed').disabled = true;
	} else if (mode === 'edit') {
		document.getElementById('completed').disabled = false;
	}
}

// Cerrar modal y restablecer estado
function closeModal() {
	document.getElementById('add-task-form').reset();
	document.getElementById('modal-background').style.display = 'none';
	document.getElementById('modal').style.display = 'none';
}

// Función para procesar el formulario de tarea
function processTaskForm() {
	const id =
		document.getElementById('id').value === ''
			? null
			: document.getElementById('id').value;
	const title = document.getElementById('title').value;
	const description = document.getElementById('description').value;
	const completed = document.getElementById('completed').checked;
	const priority = document.getElementById('priority').value;
	const tag = document.getElementById('tag').value;
	const dueDate = document.getElementById('due-date').value;

	// Crear objeto Task
	const newTask = new Task(
		id,
		title,
		description,
		completed,
		priority,
		tag,
		dueDate
	);

	return newTask;
}
// #endregion

// #region API USAGE
// Cargar datos de las tareas
function getTasks(queryParams = null) {
	fetchAPI({ endpoint: 'tasks', method: 'GET', queryParams: queryParams }).then(
		(data) => {
			const toDoList = mapTasksData(data);
			displayTasksView(toDoList);
		}
	);
}

// Agregar una nueva tarea
function addTask(newTask) {
	fetchAPI({ endpoint: 'tasks', method: 'POST', data: newTask }).then(
		(newTask) => {
			closeModal();
			// Recargar tabla de la To-Do List
			reloadToDoList();
			// Mostrar mensaje de registro exitoso
			window.alert(
				`Se ha agregado una nueva tarea!\n${newTask.id}: ${newTask.title}`
			);
		}
	);
}

// Obtener datos de una tarea específica
function getTaskData(taskId) {
	fetchAPI({ endpoint: `tasks/${taskId}`, method: 'GET' }).then((data) => {
		// Llenar datos del formulario para editar
		document.getElementById('id').value = data.id;
		document.getElementById('title').value = data.title;
		document.getElementById('description').value = data.description;
		document.getElementById('completed').checked = data.completed;
		document.getElementById('priority').value = data.priority;
		document.getElementById('tag').value = data.tag;
		document.getElementById('due-date').value = data.dueDate;
	});
}

// Editar datos de la tarea
function editTask(editedTask) {
	fetchAPI({
		endpoint: `tasks/${editedTask.id}`,
		method: 'PUT',
		data: editedTask,
	}).then((editedTask) => {
		closeModal();
		// Recargar tabla de la To-Do List
		reloadToDoList();
		// Mostrar mensaje de edición exitosa
		window.alert(`La tarea ${editedTask.id} se ha actualizado con éxito!`);
	});
}

// Eliminar tarea
function deleteTask(taskId) {
	const confirmation = window.confirm(
		`¿Desea eliminar la tarea ${taskId}? No podrá deshacer la operación.`
	);

	if (confirmation) {
		fetchAPI({ endpoint: `tasks/${taskId}`, method: 'DELETE' }).then(() => {
			reloadToDoList();
			window.alert(`La tarea ${taskId} ha sido eliminada con éxito.`);
		});
	}
}
// #endregion

// #region INIT FUNCTIONALITY
initFilterButtonsHandler();
initAddTaskButtonsHandler();
getTasks();
// #endregion
