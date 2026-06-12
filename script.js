
const savedCounters = localStorage.getItem('counters');


const departments = {
  cargo: [
    { id: 'track', label: 'Track', value: 0 },
    { id: 'trace', label: 'Trace', value: 0 },
    { id: 'proactive', label: 'Proactives', value: 0 },
  ],
  reservations: [
    { id: 'regular_call', label: 'Regular Call ESS', value: 0 },
    { id: 'premium_call', label: 'Premium Call ESS', value: 0 },
    { id: 'psl_call', label: 'PSL Call', value: 0 },
    
    { id: 'saphir_call', label: 'Saphir Call', value: 0 },
    { id: 'regular_email', label: 'Regular Email', value: 0 },
    { id: 'premium_email', label: 'Premium Email', value: 0 },
    { id: 'psl_email', label: 'PSL Email', value: 0 },
    
    { id: 'saphir_email', label: 'Saphir Email', value: 0 },
    { id: 'refunds', label: 'Refunds', value: 0 }
  ]
};

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

  updateDepartmentTitle();
}



// functions

function increment(type) {
  const counter = departments[currentDepartment].find(c => c.id === type);
  counter.value++;
  saveCounters();
  renderCards();
}

function decrement(type) {
  const counter = departments[currentDepartment].find(c => c.id === type);
  counter.value = Math.max(0, counter.value - 1);
  saveCounters();
  renderCards();
}


function resetCounters() {
  departments[currentDepartment].forEach(c => c.value = 0);
  saveCounters();
  renderCards();
}



function updateUI(type) {
  const counter = counters.find(c => c.id === type);
  document.getElementById(`${type}Counter`).innerText = counter.value;
}

// Initial render
renderCards();

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


function saveCounters() {
  localStorage.setItem('departmentCounters', JSON.stringify(departments));
  localStorage.setItem('department', currentDepartment);
}


function switchDepartment(dep) {
  currentDepartment = dep;
  saveCounters();
  renderCards();
  toggleMenu();
}


function updateDepartmentTitle() {
  const title = document.getElementById('currentDepartment');

  const names = {
    cargo: 'Cargo Department',
    reservations: 'Reservations Department'
  };

  title.innerText = names[currentDepartment];
}


const menu = document.getElementById('sidebar');

document.getElementById('menuToggle').addEventListener('click', toggleMenu);

function toggleMenu() {
  menu.classList.toggle('active');
}
