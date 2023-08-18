"use strict";

const form = document.querySelector("#myForm");
const toDoInput = document.querySelector("#todo-input");
const addtodoBtn = document.querySelector(".todo-add-btn");
const displayAllToDo = document.querySelector(".pending-todos"); // container of all todos
const completedToDo = document.querySelector(".completed-todos");
const todoCountMessage = document.querySelector(".pending-task-count");
const todoComMessage = document.querySelector(".completed-task-count");
const countPendingTodo = document.querySelector(".pending-todos");
const countComTodo = document.querySelector(".completed-todos");

let editMode = false;

addtodoBtn.classList.add("todo-add-btn"); // adds class to the input button

form.addEventListener("submit", function (e) {
  e.preventDefault();
  // checks if todo is empty, if not than run createTodo function
  toDoInput.value === "" ? alert("Input cannot be empty") : createTodo();
  toDoInput.value = "";

  editMode = false;
  addtodoBtn.textContent = "Add";
  addtodoBtn.classList.remove("edit-todo-btn");
  todoCount(todoCountMessage);
  todoCount(todoComMessage);
});

function createTodo() {
  const div = document.createElement("div");
  const p = document.createElement("p");
  const checkbox = document.createElement("input");
  const editBtn = document.createElement("button");
  const delBtn = document.createElement("button");

  div.appendChild(p);
  div.appendChild(checkbox);
  div.appendChild(editBtn);
  div.appendChild(delBtn);

  p.textContent = toDoInput.value;
  editBtn.textContent = "Edit";
  delBtn.textContent = "Delete";

  checkbox.setAttribute("type", "checkbox");

  div.classList.add("todo-container");
  p.classList.add("todo");
  editBtn.classList.add("edit-todo");
  checkbox.classList.add("todo-checkbox");
  delBtn.classList.add("delete-todo");

  displayAllToDo.append(div);

  handleDelete(delBtn); // deletes the todo when the delete button is clicked
  handleComTodo(checkbox); // checks if the checkbox is clicked or not
  handleEditTodo(editBtn, checkbox);
}

function handleDelete(btn) {
  btn.addEventListener("click", function (e) {
    e.target.parentNode.remove();
    todoCount(todoCountMessage);
    todoCount(todoComMessage);
  });
}

function handleEditTodo(btn, checkbox) {
  btn.addEventListener("click", function (e) {
    // adds the text content of the todo to the input field for the user to edit
    let editMode = true;

    if (editMode) {
      addtodoBtn.textContent = "Edit";
      addtodoBtn.classList.add("edit-todo-btn");
      toDoInput.focus();
      toDoInput.value = e.target.parentNode.firstElementChild.textContent;
      e.target.parentNode.remove();
    } else {
      return;
    }

    todoCount(todoCountMessage);
    todoCount(todoComMessage);
  });
}

function handleComTodo(checkbox) {
  checkbox.addEventListener("click", function (e) {
    const userTodo = e.target.parentNode.firstElementChild; // gets the first element of parent
    const parentNode = e.target.parentNode; // gets parent elements of checkbox

    if (e.target.checked) {
      completedToDo.append(parentNode);
      userTodo.classList.add("completed");
    } else {
      userTodo.classList.remove("completed");
      displayAllToDo.append(parentNode);
    }

    todoCount(todoCountMessage);
    todoCount(todoComMessage);
  });
}

function todoCount(message) {
  if (message.classList.contains("pending-task-count")) {
    message.textContent = `${
      countPendingTodo.childElementCount - 1
    } To Do Pending`;
  } else {
    message.textContent = `${
      countComTodo.childElementCount - 1
    } To Do Completed`;
  }

  if (countPendingTodo.childElementCount - 1 === 0)
    todoCountMessage.textContent = "No Tasks are added";

  if (countComTodo.childElementCount - 1 === 0)
    todoComMessage.textContent = "No Tasks completed";
}
