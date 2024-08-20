import "./styles.css";

const form = document.querySelector("#new-project-form");
const sidebarProjects = document.querySelector(".aside-list-projects");
const formInput = document.querySelector("#form-input");
const newProjectBtn = document.querySelector("#new-project-btn");
const mainContainer = document.querySelector("main");

let projects = JSON.parse(localStorage.getItem("projects")) || [];

let projectId = localStorage.getItem("projectSelected");

//this will render projects to the sidebar that are already on local storage
if (projects.length > 0) {
  projects.forEach((project) => renderProjectCard(project));
}

//added submit functionality to the div that is acting as a button to add new projects
newProjectBtn.addEventListener("click", () => {
  form.requestSubmit();
});

//create new project on submit store it in localstorage
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = formInput.value;

  if (inputValue === "") return;

  const project = {
    id: new Date().getTime(),
    name: inputValue,
    priority: "LOW",
    description: "",
    targetDate: "",
    tasks: [],
  };

  projects.push(project);

  renderProjectCard(project);

  const allCardProjects = document.querySelectorAll(".aside-card");
  allCardProjects.forEach((card) => {
    card.classList.remove("active");
  });

  const newProjectEl = sidebarProjects.querySelector(
    `.aside-card[id='${project.id}']`
  );
  if (newProjectEl) {
    newProjectEl.classList.add("active");
    projectId = project.id;
    localStorage.setItem("projectSelected", projectId);
    renderMainCard(project);
  }

  form.reset();
  formInput.focus();

  //save to localStorage
  localStorage.setItem("projects", JSON.stringify(projects));

  console.log(projects);
});

//manage li click event to establish an active class and show the project in the main section
sidebarProjects.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "li") {
    const allCardProjects = document.querySelectorAll(".aside-card");
    allCardProjects.forEach((card) => {
      card.classList.remove("active");
    });
    projectId = e.target.id;
    e.target.classList.add("active");
    localStorage.setItem("projectSelected", projectId);

    const selectedProject = projects.find((project) => project.id == projectId);
    if (selectedProject) {
      renderMainCard(selectedProject);
    }
  }
});

//render projects in the sidebar and display the main card

function renderProjectCard(project) {
  const asideCard = document.createElement("li");
  asideCard.classList.add("aside-card");
  asideCard.setAttribute("id", project.id);

  const asideCardMarkup = `<h4>${project.name}</h4>
          <div class="aside-list-priority">
            <p>Priority <span>${project.priority}</span></p>
          </div>`;

  asideCard.innerHTML = asideCardMarkup;

  if (asideCard.id === projectId) {
    asideCard.classList.add("active");
    renderMainCard(project);
  }

  sidebarProjects.appendChild(asideCard);
}

//render main card project
function renderMainCard(project) {
  mainContainer.innerHTML = "";
  const mainCard = document.createElement("div");
  mainCard.classList.add("main-project-card");
  const mainCardMarkup = `<h3 contenteditable>${project.name}</h3>
            <input type='text' class='project-description' placeholder='Enter a description of your project.' value='${project.description}' ></input>
            <div class="main-date-priority">
              <p>Target Date <input type="date" class='target-date' value="${project.targetDate}"></input></p>
          <p class='priority-button' >Priority <span class='priority-name' >${project.priority}</span></p>
            </div>
            <ul class="main-tasks-ul">
               
            <form action="" class="main-task-li" id="task-form" >
    <div class="task-content">
        <input type="text" class="task-input" placeholder="Add new Task"></>
      </div>
      <button class="buttonAdd">
  <span class="horizontal"></span>
  <span class="vertical"></span>
  <div class="close">Add</div>
</button>

  </form>
  
              <ul class='tasks-ul'>
              
              </ul>


            </ul>

            <div class='main-card-btns'>
            
    
            <button class="buttonD" type="button">
              <span class="button__text">Delete</span>
              <span class="button__icon"
                ><svg
                  class="svg"
                  height="512"
                  viewBox="0 0 512 512"
                  width="512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title></title>
                  <path
                    d="M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320"
                    style="
                      fill: none;
                      stroke: #fff;
                      stroke-linecap: round;
                      stroke-linejoin: round;
                      stroke-width: 32px;
                    "
                  ></path>
                  <line
                    style="
                      stroke: #fff;
                      stroke-linecap: round;
                      stroke-miterlimit: 10;
                      stroke-width: 32px;
                    "
                    x1="80"
                    x2="432"
                    y1="112"
                    y2="112"
                  ></line>
                  <path
                    d="M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40"
                    style="
                      fill: none;
                      stroke: #fff;
                      stroke-linecap: round;
                      stroke-linejoin: round;
                      stroke-width: 32px;
                    "
                  ></path>
                  <line
                    style="
                      fill: none;
                      stroke: #fff;
                      stroke-linecap: round;
                      stroke-linejoin: round;
                      stroke-width: 32px;
                    "
                    x1="256"
                    x2="256"
                    y1="176"
                    y2="400"
                  ></line>
                  <line
                    style="
                      fill: none;
                      stroke: #fff;
                      stroke-linecap: round;
                      stroke-linejoin: round;
                      stroke-width: 32px;
                    "
                    x1="184"
                    x2="192"
                    y1="176"
                    y2="400"
                  ></line>
                  <line
                    style="
                      fill: none;
                      stroke: #fff;
                      stroke-linecap: round;
                      stroke-linejoin: round;
                      stroke-width: 32px;
                    "
                    x1="328"
                    x2="320"
                    y1="176"
                    y2="400"
                  ></line></svg
              ></span>
            </button></div>`;
  mainCard.innerHTML = mainCardMarkup;
  mainContainer.appendChild(mainCard);

  const taskForm = document.querySelector("#task-form");
  const taskFormInput = document.querySelector(".task-input");
  const taskUl = document.querySelector(".tasks-ul");

  project.tasks.forEach(renderTasks);

  //manage priority button
  const priorityBtn = mainCard.querySelector(".priority-button");
  const priorityName = mainCard.querySelector(".priority-name");

  priorityBtn.addEventListener("click", updatePriority);

  function updatePriority() {
    const priorities = ["LOW", "NORMAL", "HIGH"];
    let currentPriorityIndex = priorities.indexOf(project.priority);
    currentPriorityIndex = (currentPriorityIndex + 1) % priorities.length;
    project.priority = priorities[currentPriorityIndex];
    priorityName.textContent = project.priority;
    saveProjectToLocalStorage();
    updateProjectCard(project);
  }

  //save name
  const nameProject = mainCard.querySelector("h3");
  nameProject.addEventListener("input", () => {
    project.name = nameProject.textContent;
    saveProjectToLocalStorage();
    updateProjectCard(project);
  });

  //save description
  const descriptionProject = mainCard.querySelector(".project-description");
  descriptionProject.addEventListener("input", () => {
    project.description = descriptionProject.value;
    saveProjectToLocalStorage();
  });

  //save date
  const targetDateProject = mainCard.querySelector(".target-date");
  targetDateProject.addEventListener("change", () => {
    project.targetDate = targetDateProject.value;
    saveProjectToLocalStorage();
  });

  //delete project button
  const deleteBtn = mainCard.querySelector(".buttonD");
  deleteBtn.addEventListener("click", () => {
    const selectedProjectCard = document.querySelector(
      `.aside-card[id="${projectId}"]`
    );
    if (!selectedProjectCard.classList.contains("active")) return;
    projects = projects.filter((project) => project.id !== parseInt(projectId));

    mainContainer.innerHTML = "";

    selectedProjectCard.remove();
    localStorage.setItem("projects", JSON.stringify(projects));
    localStorage.removeItem("projectSelected");

    projectId = null;
  });

  //add tasks

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = taskFormInput.value;

    if (inputValue === "") return;

    const task = {
      id: new Date().getTime(),
      name: inputValue,
      isCompleted: false,
    };

    project.tasks.push(task);
    console.log(inputValue);

    taskForm.reset();

    localStorage.setItem("projects", JSON.stringify(projects));

    renderTasks(task);
  });

  function renderTasks(task) {
    //render project tasks
    const taskCard = document.createElement("li");
    taskCard.classList.add("main-task-li");
    taskCard.setAttribute("id", task.id);
    if (task.isCompleted) {
      taskCard.classList.add("active");
    }

    const taskCardMarkup = `<div class="task-content">
                  <label class="checkbox-btn">
                    <label for="checkbox"></label>
                    <input id="${task.id}" type="checkbox" ${
      task.isCompleted ? "checked" : ""
    }/>
                    <span class="checkmark"></span>
                  </label>
                  <span class='task-name' contenteditable>${task.name}</span>
                </div>
                <button class="buttonX">
                  <span class="X"></span>
                  <span class="Y"></span>
                  <div class="close">Close</div>
                </button>`;

    taskCard.innerHTML = taskCardMarkup;

    taskUl.appendChild(taskCard);

    //save tasks
    const taskNameEl = taskCard.querySelector(".task-name");
    taskNameEl.addEventListener("input", () => {
      task.name = taskNameEl.textContent;
      saveProjectToLocalStorage();
    });

    //delete task button
    const deleteTaskBtn = taskCard.querySelector(".buttonX");
    deleteTaskBtn.addEventListener("click", () => {
      const taskIndex = project.tasks.findIndex((t) => t.id === task.id);
      if (taskIndex > -1) {
        project.tasks.splice(taskIndex, 1);
      }
      localStorage.setItem("projects", JSON.stringify(projects));
      taskCard.remove();
    });
  }
}

function saveProjectToLocalStorage() {
  localStorage.setItem("projects", JSON.stringify(projects));
}

function updateProjectCard(project) {
  const selectedProject = sidebarProjects.querySelector(
    `.aside-card[id='${project.id}']`
  );
  if (selectedProject) {
    selectedProject.querySelector("h4").textContent = project.name;
    selectedProject.querySelector(".aside-card span").textContent =
      project.priority;
  }
}
