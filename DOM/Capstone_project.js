

let tasks = [];

// Grab elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const showAllBtn = document.getElementById("showAllBtn");
const showActiveBtn = document.getElementById("showActiveBtn");
const showDoneBtn = document.getElementById("showDoneBtn");
const counter = document.getElementById("counter");
const clearDoneBtn = document.getElementById("clearDoneBtn");

// Function to render tasks
function renderTasks(filter = "all") {
  taskList.innerHTML = ""; // clear list first

  tasks.forEach((task, index) => {
    // Apply filter
    if (filter === "active" && task.done) return;
    if (filter === "done" && !task.done) return;

    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.done) {
      li.classList.add("done");
    }

    // Toggle done when clicked
    li.addEventListener("click", () => {
      tasks[index].done = !tasks[index].done;
      renderTasks(filter);
    });

    taskList.appendChild(li);
  });

  updateCounter();
}

// Function to update counter
function updateCounter() {
  const activeCount = tasks.filter(task => !task.done).length;
  counter.textContent = `Active tasks: ${activeCount}`;
}

// Add new task
addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    tasks.push({ text: taskText, done: false }); // store as object
    taskInput.value = "";
    renderTasks();
  }
});

// Filter buttons
showAllBtn.addEventListener("click", () => renderTasks("all"));
showActiveBtn.addEventListener("click", () => renderTasks("active"));
showDoneBtn.addEventListener("click", () => renderTasks("done"));

// Clear done tasks
clearDoneBtn.addEventListener("click", () => {
  tasks = tasks.filter(task => !task.done);
  renderTasks();
});
