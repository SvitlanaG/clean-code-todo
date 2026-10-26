const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.querySelector('.task-row-wrapper button');
const todoList = document.getElementById('incompleteTasks');
const completedList = document.getElementById('completed-tasks');

const createTaskEditInput = function () {
  const taskEditInput = document.createElement('input');
  taskEditInput.type = 'text';
  taskEditInput.className = 'task';
  return taskEditInput;
};

const createDeleteButton = function () {
  const deleteButton = document.createElement('button');
  const deleteIcon = document.createElement('img');
  deleteButton.className = 'delete';
  deleteIcon.src = './remove.svg';
  deleteButton.appendChild(deleteIcon);
  return deleteButton;
};

const createTaskElement = function (taskText) {
  const taskItem = document.createElement('li');
  const checkbox = document.createElement('input');
  const label = document.createElement('label');
  const editButton = document.createElement('button');

  label.innerText = taskText;
  label.className = 'task';

  checkbox.type = 'checkbox';
  editButton.className = 'edit';
  editButton.innerText = 'Edit';

  taskItem.appendChild(checkbox);
  taskItem.appendChild(label);
  taskItem.appendChild(createTaskEditInput());
  taskItem.appendChild(editButton);
  taskItem.appendChild(createDeleteButton());
  return taskItem;
};

const addTask = function () {
  if (!newTaskInput.value) return;
  const taskItem = createTaskElement(newTaskInput.value);

  todoList.appendChild(taskItem);
  bindTaskControls(taskItem);

  newTaskInput.value = '';
};

const editTask = function () {
  const taskItem = this.parentNode;

  const taskEditInput = taskItem.querySelector('input[type=text]');
  const label = taskItem.querySelector('label');
  const editButton = taskItem.querySelector('.edit');
  const isEditing = taskItem.classList.contains('editMode');
  if (isEditing) {
    label.innerText = taskEditInput.value;
    editButton.innerText = 'Edit';
  } else {
    taskEditInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  taskItem.classList.toggle('editMode');
};

const deleteTask = function () {
  const taskItem = this.parentNode;
  const taskList = taskItem.parentNode;
  taskList.removeChild(taskItem);
};

const moveTask = function (event) {
  const taskItem = event.currentTarget.parentNode;
  const destinationList = event.currentTarget.checked
    ? completedList
    : todoList;

  destinationList.appendChild(taskItem);
};

addTaskButton.addEventListener('click', addTask);

const bindTaskControls = function (taskItem) {
  const checkbox = taskItem.querySelector('input[type=checkbox]');
  const editButton = taskItem.querySelector('button.edit');
  const deleteButton = taskItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkbox.onchange = moveTask;
};

document
  .querySelectorAll('#incompleteTasks li, #completed-tasks li')
  .forEach(bindTaskControls);
