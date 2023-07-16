const taskInput = document.getElementById("taskInput");
const priorityInput = document.getElementById("priorityInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = [];

addTaskBtn.addEventListener("click", function() {
  addTask();
});

function addTask() {
  const task = taskInput.value;
  const priority = priorityInput.value;
  
  if (task.trim() === "" || priority.trim() === "") {
    return;
  }

  tasks.push({ task, priority });

  taskInput.value = "";
  priorityInput.value = "";

  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.sort((a, b) => a.priority - b.priority);

  tasks.forEach(function(task, index) {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
      <span>${task.task}</span>
      <span>Priority: ${task.priority}</span>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    `;

    taskItem
      .querySelector(".edit-btn")
      .addEventListener("click", function() {
        editTask(index);
      });
    taskItem
      .querySelector(".delete-btn")
      .addEventListener("click", function() {
        deleteTask(index);
      });

    taskList.appendChild(taskItem);
  });
}

function editTask(index) {
  const task = tasks[index];
  taskInput.value = task.task;
  priorityInput.value = task.priority;
  
  addTaskBtn.innerHTML = "Save Changes";
  addTaskBtn.removeEventListener("click", addTask);
  addTaskBtn.addEventListener("click", function() {
    saveChanges(index);
  });
}

function saveChanges(index) {
  tasks[index].task = taskInput.value;
  tasks[index].priority = priorityInput.value;
  
  taskInput.value = "";
  priorityInput.value = "";
  
  addTaskBtn.innerHTML = "Add Task";
  addTaskBtn.removeEventListener("click", saveChanges);
  addTaskBtn.addEventListener("click", addTask);
  
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}