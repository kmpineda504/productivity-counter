/* ---------------- CONFIG ---------------- */
const DAILY_TARGET = 435;



/* ---------------- DOM ---------------- */
const DOM = {
    //Productivity
    progressFill: 
      document.getElementById("progressFill"),
    progressPercent: 
      document.getElementById("progressPercent"),
    minutesProduced:
      document.getElementById("minutesProduced"),

     // Main UI
    cardsContainer:
      document.getElementById("cardsContainer"),
    templatesContainer:
      document.getElementById("templatesContainer"),
    currentDepartment:
      document.getElementById("currentDepartment"),
    currentDate:
      document.getElementById("currentDate"),

    // Navigation
    menuButton:
      document.getElementById("menuButton"),
    sidebar:
      document.getElementById("sidebar"),
    
    // Save status
    lastSaved: document.getElementById("lastSaved")
};


/* ---------------- STORAGE ---------------- */

function loadDepartment() {
  return localStorage.getItem('department')
    || 'cargo';
}

// load current department
let currentDepartment = loadDepartment();

function loadCounters() {
  
  try {
    return JSON.parse(
      localStorage.getItem('departmentCounters')
    ) || {};
  }
  
  catch (error) {
    console.error(
      "Failed to load department counters:",
      error
    );

    return {};
  }
}

// load saved data
const savedData = loadCounters();


function loadLastSavedTime() {
  return localStorage.getItem(
    "lastSavedTime"
  );
}

// load saved time
const savedTime = loadLastSavedTime();

function saveCounters() {
  localStorage.setItem('departmentCounters', JSON.stringify(departments));
  localStorage.setItem('department', currentDepartment);

  const timestamp = new Date().toLocaleTimeString();
  
  localStorage.setItem('lastSavedTime', timestamp);
  
  DOM.lastSaved.innerText =
  "Last saved: " + timestamp;
}


if (savedTime) {
  DOM.lastSaved.innerText =
    "Last saved: " + savedTime;
}


Object.keys(departments).forEach(dep => {
  if (savedData[dep]) {
    departments[dep] = savedData[dep];
  }
});


/* ---------------- PRODUCTIVITY ---------------- */
// Update Progress Bar
function updateProductivityProgress() {

  let producedMinutes = 0;

  Object.values(departments).forEach(department => {
    department.forEach(task => {
      const minutes = productivityValues[task.id] || 0;
      producedMinutes += task.value * minutes;
    });
  });

  const fill = DOM.progressFill;

  const percent = Math.min(
    (producedMinutes / DAILY_TARGET) * 100,
    100
  );

  
  if (percent < 50) {
    fill.style.background = "#d83b01";
  } 
  else if (percent < 80) {
    fill.style.background = "#ffb900";
  } 
  else {
    fill.style.background = "#107c10";
  }

  fill.style.width = `${percent}%`;

  DOM.progressPercent.innerText =
    `${Math.round(percent)}%`;

  DOM.minutesProduced.innerText =
    `${producedMinutes.toFixed(1)} / ${DAILY_TARGET} productive minutes`;

}


/* ------------ RENDERING ------------ */
function renderCards() {
  const container = DOM.cardsContainer;
  
  container.innerHTML = '';

  departments[currentDepartment].forEach(counter => {
    const card = document.createElement('div');
    
    card.className = 'card';

    card.innerHTML = `
      <span>${counter.label}</span>

      <div class="actions">
        <span class="counter">${counter.value}</span>
        <button onclick="increment('${counter.id}')">+</button>
        <button class="decrement-btn" onclick="decrement('${counter.id}')">−</button>
      </div>
    `;

    container.appendChild(card);
  });

}

function renderTemplates() {
  const container =
      DOM.templatesContainer;

  if (!container) return;

  container.innerHTML = "";

  const departmentTemplates =
    templates[currentDepartment];

  if (!departmentTemplates) {
    container.innerHTML =
      "<p>No templates available.</p>";
    return;
  }

  Object.entries(departmentTemplates)
    .forEach(([category, items]) => {

      const title =
        document.createElement("h3");

      title.textContent = category;

      container.appendChild(title);

      items.forEach(template => {

        const card =
          document.createElement("div");

        card.className = "template-card";

        card.innerHTML = `
          <div class="template-content">

          <div class="template-title">
            ${template.title}
          </div>

          <p>
            ${template.text}
          </p>

          </div>

          <button class="copy-btn"
            onclick="copyTemplate(\`${template.text}\`)">

            <i class="fa-regular fa-copy"></i>
          </button>
        `;

        container.appendChild(card);

      });

    });
}

function updateDepartmentTitle() {
  const title = DOM.currentDepartment;

  const names = {
    cargo: '📦 Cargo Unit',
    reservations: '✈️ Reservations Unit',
    customer_care: '🧳 Customer Care Unit'

  };

  title.innerText = names[currentDepartment];
}

// Main application render
function renderApp() {
    renderCards();
    renderTemplates();
    updateDepartmentTitle();
    updateProductivityProgress();
}


/* ---------------- COUNTERS ---------------- */
function increment(type) {
  const counter = departments[currentDepartment].find(c => c.id === type);
  counter.value++;
  
  saveCounters();
  renderApp();
}

function decrement(type) {
  const counter = departments[currentDepartment].find(c => c.id === type);
  counter.value = Math.max(0, counter.value - 1);
  
  saveCounters();
  renderApp();
}


function resetCounters() {
  if (!confirm("Reset all counters for this department?")) {
    return;
  }

  departments[currentDepartment].forEach(c => c.value = 0);
  
  saveCounters();
  renderApp();
}


/* ---------------- DEPARTMENTS ---------------- */
function switchDepartment(dep) {
  currentDepartment = dep;

  saveCounters();
  renderApp();
  toggleMenu();
}


/* ---------------- MENU ---------------- */
const menu = DOM.sidebar;


function toggleMenu() {
  menu.classList.toggle('active');

  DOM.menuButton
    .classList.toggle('hidden');
}

DOM.menuButton
    .addEventListener('click', toggleMenu);

document.getElementById('collapseBtn').addEventListener('click', function () {
  menu.classList.remove('active');
  DOM.menuButton
    .classList.remove('hidden');
});

document.addEventListener('click', function (event) {
  const isClickInsideMenu = menu.contains(event.target);

  const isMenuButton =
    event.target.closest('#menuButton');

  if (!isClickInsideMenu && !isMenuButton) {
    menu.classList.remove('active');
      DOM.menuButton.classList.remove('hidden');
  }
});


/* ---------------- IMPORT / EXPORT ---------------- */
function exportData() {
  const data = {
    department: currentDepartment,
    counters: departments
  };

  const json = JSON.stringify(data);
  navigator.clipboard.writeText(json);
  alert("Data copied to clipboard ✅");
}

function importData() {
  if (!confirm("This will overwrite current counters. Continue?")) {
    return;
  }

  const input = prompt("Paste your backup data:");
  if (!input) return;
 
  try {
    const parsed = JSON.parse(input);
    currentDepartment = parsed.department;
    Object.assign(departments, parsed.counters);
    saveCounters();
    renderApp();
    alert("Data restored ✅");
  } catch (e) {
    alert("Invalid data ❌");
  }
}


/* ---------------- TEMPLATES ---------------- */
function copyTemplate(text) {

  navigator.clipboard.writeText(text);

  const message = document.createElement("div");

  message.innerText = "Copied ✓";

  message.style.position = "fixed";
  message.style.bottom = "20px";
  message.style.right = "20px";
  message.style.background = "#107c10";
  message.style.color = "#fff";
  message.style.padding = "12px 16px";
  message.style.borderRadius = "8px";
  message.style.zIndex = "9999";

  document.body.appendChild(message);

  setTimeout(() => {
    message.remove();
  }, 1500);

}

document.addEventListener("DOMContentLoaded", function () {
  const templatesToggle =
    document.getElementById("templatesToggle");

  const templatesPanel =
    document.getElementById("templatesPanel");

  const closeTemplates =
    document.getElementById("closeTemplates");

  if (templatesToggle) {
    templatesToggle.addEventListener("click", function () {

      document.body.classList.add("templates-open");
      templatesPanel.classList.add("active");

      templatesToggle.style.opacity = "0";
      
      templatesToggle.style.pointerEvents = "none";

    });
  }

  if (closeTemplates) {
    closeTemplates.addEventListener("click", function () {

      document.body.classList.remove("templates-open");
      templatesPanel.classList.remove("active");

      setTimeout(() => {

        templatesToggle.style.opacity = "1";
        templatesToggle.style.pointerEvents = "auto";

      }, 200);

    });
  }

});


/* ---------------- DATE ---------------- */

function displayCurrentDate() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  DOM.currentDate.innerText =
    formattedDate;
}



/* ---------------- THEME ---------------- */
const darkMode = localStorage.getItem("darkMode");

if (darkMode === "true") {
  document.body.classList.add("dark-mode");
  themeToggle.textContent = "☀️ Light Mode";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  localStorage.setItem(
    "darkMode",
    document.body.classList.contains("dark-mode")
  );

  themeToggle.textContent =
    document.body.classList.contains("dark-mode")
      ? "☀️ Light Mode"
      : "🌙 Dark Mode";
});


/* ---------------- KEYBOARD SHORTCUTS ---------------- */
document.addEventListener('keydown', function(e) {
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault();
    exportData();
  }
});


/* ---------------- INITIALIZATION ---------------- */
displayCurrentDate();
renderApp();