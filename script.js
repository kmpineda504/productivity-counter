
const counters = [
  { id: 'track', label: 'Track & Trace', value: 0 },
  { id: 'proactive', label: 'Proactives', value: 0 },
];

function renderCards() {
  const container = document.getElementById('cardsContainer');
  container.innerHTML = '';

  counters.forEach(counter => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <h2>${counter.label}</h2>
      <div id="${counter.id}Counter" class="counter">${counter.value}</div>
      <button onclick="increment('${counter.id}')">+1</button>
      <button class="decrement-btn" onclick="decrement('${counter.id}')">-1</button>
    `;

    container.appendChild(card);
  });
}

// 🔁 functions
function increment(type) {
  const counter = counters.find(c => c.id === type);
  counter.value++;

  updateUI(type);
}

function decrement(type) {
  const counter = counters.find(c => c.id === type);
  counter.value = Math.max(0, counter.value);

  counter.value--;
  updateUI(type);
}

function resetCounters() {
  counters.forEach(c => c.value = 0);
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
