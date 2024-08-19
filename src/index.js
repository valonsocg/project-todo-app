import "./styles.css";

const form = document.querySelector("#new-project-form");
const sidebarProjects = document.querySelector(".aside-list-projects");
const formInput = document.querySelector("#form-input");
const newProjectBtn = document.querySelector("#new-project-btn");

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
  };

  projects.push(project);

  renderProjectCard(project);

  form.reset();
  formInput.focus();

  //save to localStorage
  localStorage.setItem("projects", JSON.stringify(projects));

  console.log(projects);
});

//manage li click event to stablish an active class
sidebarProjects.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "li") {
    const allCardProjects = document.querySelectorAll(".aside-card");
    allCardProjects.forEach((card) => {
      card.classList.remove("active");
    });
    projectId = e.target.id;
    e.target.classList.add("active");
    localStorage.setItem("projectSelected", projectId);
  }
});

//render projects in the sidebar

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
  }

  sidebarProjects.appendChild(asideCard);
}
