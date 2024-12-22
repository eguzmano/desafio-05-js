const input = document.querySelector("input");
const btn = document.querySelector("button");
const list = document.querySelector("tbody");
const totalTasks = document.querySelector(".totalTasks");
const completedTasks = document.querySelector(".completedTasks");

const tasks = [
  { id: 1, name: "Hacer mercado", complete: false },
  { id: 2, name: "Estudiar para la prueba", complete: false },
  { id: 3, name: "Sacar a pasear a Tobby", complete: false },
];

const show = () => {
  list.innerHTML = tasks
    .map(
      (task) =>
      `
      <tr>
        <td>${task.id}</td>
        <td class="${task.complete ? "completed" : ""}">${task.name}</td>
        <td>
        <input type='checkbox'
        ${task.complete ? "checked" : ""}
        onChange="toggleTask(${task.id})">
        </td>
        <td>
        <i class="fa-solid fa-x" onClick='deleteTask(${task.id})'></i>
        </td>
      </tr>
      `
    )
    .join("");
  tasksState();
};

btn.addEventListener("click", () => {
  if (input.value === "") return;
  const newId =
    tasks.length > 0
      ? Math.max(tasks[tasks.length - 1].id + 1, tasks.length)
      : 1;

  tasks.push({
    id: newId,
    name: input.value,
    complete: false,
  });
  input.value = "";
  show();
});

const deleteTask = (id) => {
  const index = tasks.findIndex((task) => task.id === id);
  tasks.splice(index, 1);
  console.log(tasks);
  show();
};

const tasksState = () => {
  totalTasks.textContent = tasks.length;
  completedTasks.textContent = tasks.filter((task) => task.complete).length;
};

const toggleTask = (id) => {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.complete = !task.complete;
    show();
  }
};

show();
