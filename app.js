//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.querySelector('.task-row-wrapper button');
const todoList = document.getElementById('incompleteTasks');
const completedList = document.getElementById('completed-tasks');

//New task list item
const createTaskElement = function (taskText) {
  const taskItem = document.createElement('li');

  //input (checkbox)
  const checkbox = document.createElement('input'); //checkbx
  //label
  const label = document.createElement('label'); //label
  //input (text)
  const editInput = document.createElement('input'); //text
  //button.edit
  const editButton = document.createElement('button'); //edit button

  //button.delete
  const deleteButton = document.createElement('button'); //delete button
  const deleteIcon = document.createElement('img'); //delete button image

  label.innerText = taskText;
  label.className = 'task';

  //Each elements, needs appending
  checkbox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteIcon.src = './remove.svg';
  deleteButton.appendChild(deleteIcon);

  //and appending.
  taskItem.appendChild(checkbox);
  taskItem.appendChild(label);
  taskItem.appendChild(editInput);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);
  return taskItem;
};

const addTask = function () {
  //Create a new list item with the text from the #new-task:
  if (!newTaskInput.value) return;
  const taskItem = createTaskElement(newTaskInput.value);

  //Append listItem to incompleteTaskHolder
  todoList.appendChild(taskItem);
  bindTaskControls(taskItem);

  newTaskInput.value = '';
};

//Edit an existing task.

const editTask = function () {
  const taskItem = this.parentNode;

  const editInput = taskItem.querySelector('input[type=text]');
  const label = taskItem.querySelector('label');
  const editButton = taskItem.querySelector('.edit');
  const isEditing = taskItem.classList.contains('editMode');
  //If class of the parent is .editmode
  if (isEditing) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  //toggle .editmode on the parent.
  taskItem.classList.toggle('editMode');
};

//Delete task.
const deleteTask = function () {
  const taskItem = this.parentNode;
  const taskList = taskItem.parentNode;
  //Remove the parent list item from the ul.
  taskList.removeChild(taskItem);
};

const moveTask = function (event) {
  const taskItem = event.currentTarget.parentNode;
  const destinationList = event.currentTarget.checked
    ? completedList
    : todoList;

  destinationList.appendChild(taskItem);
};

//The glue to hold it all together.

addTaskButton.addEventListener('click', addTask);

const bindTaskControls = function (taskItem) {
  //select ListItems children
  const checkbox = taskItem.querySelector('input[type=checkbox]');
  const editButton = taskItem.querySelector('button.edit');
  const deleteButton = taskItem.querySelector('button.delete');

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkbox.onchange = moveTask;
};

document
  .querySelectorAll('#incompleteTasks li, #completed-tasks li')
  .forEach(bindTaskControls);

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
