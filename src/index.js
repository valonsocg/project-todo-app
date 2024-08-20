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
            <input type='text' placeholder='Enter a description of your project.'></input>
            <div class="main-date-priority">
              <p>Target Date <input type="date" value="${project.targetDate}"></input></p>
          <p>Priority <span>${project.priority}</span></p>
            </div>
            <ul class="main-tasks-ul">
              <li class="main-task-li">
                <div class="task-content">
                  <label class="checkbox-btn">
                    <label for="checkbox"></label>
                    <input id="1" type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                  <span contenteditable>Learn Java</span>
                </div>
                <button class="buttonX">
                  <span class="X"></span>
                  <span class="Y"></span>
                  <div class="close">Close</div>
                </button>
              </li>
              <li class="main-task-li complete">
                <div class="task-content">
                  <label class="checkbox-btn">
                    <label for="checkbox"></label>
                    <input id="2" type="checkbox" checked />
                    <span class="checkmark"></span>
                  </label>
                  <span contenteditable>Learn Python</span>
                </div>
                <button class="buttonX">
                  <span class="X"></span>
                  <span class="Y"></span>
                  <div class="close">Close</div>
                </button>
              </li>
            </ul>
    
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
            </button>`;
  mainCard.innerHTML = mainCardMarkup;
  mainContainer.appendChild(mainCard);

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
}
