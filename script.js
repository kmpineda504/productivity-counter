
const savedTime = localStorage.getItem('lastSavedTime');
  if (savedTime) {
  document.getElementById('lastSaved').innerText =
  "Last saved: " + savedTime;
}


function updateProductivityProgress() {
  const DAILY_TARGET = 435;

  let producedMinutes = 0;

  Object.values(departments).forEach(department => {
    department.forEach(task => {
    const minutes = productivityValues[task.id] || 0;
    producedMinutes += task.value * minutes;
    });
  });

  const percent = Math.min(
    (producedMinutes / DAILY_TARGET) * 100,
    100
  );

  const fill = document.getElementById("progressFill");

  if (percent < 50) {
    fill.style.background = "#d83b01";
  } else if (percent < 80) {
    fill.style.background = "#ffb900";
  } else {
    fill.style.background = "#107c10";
  }

  document.getElementById("progressFill").style.width =`${percent}%`;

  document.getElementById("progressPercent").innerText =`${Math.round(percent)}%`;

  document.getElementById("minutesProduced").innerText =`${producedMinutes.toFixed(1)} / ${DAILY_TARGET} productive minutes`;
}

let currentDepartment = localStorage.getItem('department') || 'cargo';

// Load saved data
const savedData = JSON.parse(localStorage.getItem('departmentCounters')) || {};
Object.keys(departments).forEach(dep => {
  if (savedData[dep]) {
    departments[dep] = savedData[dep];
  }
});





function renderCards() {
  const container = document.getElementById('cardsContainer');
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



// functions

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


// Initial render
function renderApp() {
    renderCards();
    renderTemplates();
    updateDepartmentTitle();
    updateProductivityProgress();
}

renderApp();





// Date function
function displayCurrentDate() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  document.getElementById('currentDate').innerText = formattedDate;
}


displayCurrentDate();



function switchDepartment(dep) {

  currentDepartment = dep;

  saveCounters();

  renderApp();

  toggleMenu();

}


function updateDepartmentTitle() {
  const title = document.getElementById('currentDepartment');

  const names = {
    cargo: '📦 Cargo Unit',
    reservations: '✈️ Reservations Unit',
    customer_care: '🧳 Customer Care Unit'

  };

  title.innerText = names[currentDepartment];
}


const menu = document.getElementById('sidebar');

document.getElementById('menuButton').addEventListener('click', toggleMenu);



function toggleMenu() {
  menu.classList.toggle('active');

  document.getElementById('menuButton').classList.toggle('hidden');
}





document.addEventListener('click', function (event) {

    const isClickInsideMenu = menu.contains(event.target);

    const isMenuButton =
        event.target.closest('#menuButton');

    if (!isClickInsideMenu && !isMenuButton) {

        menu.classList.remove('active');
        document.getElementById('menuButton')
            .classList.remove('hidden');
    }
});


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

function saveCounters() {
    localStorage.setItem('departmentCounters', JSON.stringify(departments));
    localStorage.setItem('department', currentDepartment);
  
    const timestamp = new Date().toLocaleTimeString();
    
    localStorage.setItem('lastSavedTime', timestamp);
    
    document.getElementById("lastSaved").innerText =
    "Last saved: " + timestamp;
}


document.addEventListener('keydown', function(e) {
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault();
    exportData();
  }
});



/* ===========================
   TEMPLATES PANEL
=========================== */

function renderTemplates() {

    const container =
        document.getElementById("templatesContainer");

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


/* ===========================
   COPY TEMPLATE
=========================== */

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

document.getElementById('collapseBtn').addEventListener('click', function () {
    menu.classList.remove('active');
    document.getElementById('menuButton').classList.remove('hidden');
});



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

