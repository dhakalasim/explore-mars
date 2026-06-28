const rocketParts = [
  {
    name: "Nose Cone",
    description: "Protects the crew capsule and guides the rocket smoothly through the atmosphere.",
    state: "Standby",
  },
  {
    name: "Payload Bay",
    description: "Carries the Nepalese crew and vital mission equipment to Mars.",
    state: "Standby",
  },
  {
    name: "Main Engines",
    description: "Produce the thrust needed to leave Earth and travel through space.",
    state: "Standby",
  },
  {
    name: "Fuel Tanks",
    description: "Store the propellant for the full mission journey.",
    state: "Standby",
  },
  {
    name: "Guidance System",
    description: "Steers the rocket and keeps the path accurate toward Mars.",
    state: "Standby",
  },
  {
    name: "Landing Legs",
    description: "Prepare for a safe touchdown on the Martian surface.",
    state: "Standby",
  },
];

const partsGrid = document.getElementById("partsGrid");
const missionBadge = document.getElementById("missionBadge");
const missionMessage = document.getElementById("missionMessage");
const progressBar = document.getElementById("progressBar");
const missionLog = document.getElementById("missionLog");
const launchButton = document.getElementById("launchButton");

let missionRunning = false;
let readyParts = 0;

function renderParts() {
  partsGrid.innerHTML = "";

  rocketParts.forEach((part, index) => {
    const card = document.createElement("article");
    card.className = "part-card";

    card.innerHTML = `
      <div class="part-meta">Part ${index + 1}</div>
      <h3>${part.name}</h3>
      <p class="card-description">${part.description}</p>
      <p><strong>Status:</strong> ${part.state}</p>
      <button class="secondary-btn" data-index="${index}">Activate</button>
    `;

    partsGrid.appendChild(card);
  });
}

function updateStatus(text, badgeClass, progress) {
  missionMessage.textContent = text;
  missionBadge.className = `badge ${badgeClass}`;
  progressBar.style.width = `${progress}%`;
}

function addLog(message) {
  const item = document.createElement("li");
  item.textContent = message;
  missionLog.prepend(item);
}

function activatePart(index) {
  if (missionRunning) return;

  const part = rocketParts[index];
  part.state = "Ready";
  readyParts += 1;
  renderParts();
  addLog(`${part.name} is ready.`);

  if (readyParts === rocketParts.length) {
    updateStatus("All systems are ready. The Nepalese crew can depart for Mars.", "ready", 100);
  } else {
    updateStatus(`Ready to launch. ${readyParts}/${rocketParts.length} systems are active.`, "ready", (readyParts / rocketParts.length) * 100);
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runMission() {
  if (missionRunning || readyParts !== rocketParts.length) {
    updateStatus("Prepare all rocket systems before launching.", "ready", (readyParts / rocketParts.length) * 100);
    return;
  }

  missionRunning = true;
  launchButton.disabled = true;
  document.querySelectorAll(".secondary-btn").forEach((btn) => {
    btn.disabled = true;
  });

  updateStatus("Mission sequence started. The rocket is leaving Earth.", "running", 10);
  addLog("Nepalese crew boarding the rocket.");

  const stages = [
    { message: "Igniting engines and lifting off.", progress: 25 },
    { message: "Passing through the atmosphere.", progress: 45 },
    { message: "Entering orbit and preparing the Mars transfer.", progress: 70 },
    { message: "Cruising through space toward the red planet.", progress: 85 },
    { message: "Touchdown is imminent. The crew is descending safely.", progress: 95 },
  ];

  for (const stage of stages) {
    addLog(stage.message);
    updateStatus(stage.message, "running", stage.progress);
    await delay(1200);
  }

  updateStatus("No errors detected. The Nepalese crew has landed on Mars successfully.", "success", 100);
  addLog("Mission complete. Welcome to Mars.");
  missionRunning = false;
  launchButton.disabled = false;
}

partsGrid.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-index]");
  if (!button) return;
  const index = Number(button.dataset.index);
  activatePart(index);
});

launchButton.addEventListener("click", runMission);

renderParts();
updateStatus("Activate every rocket subsystem to prepare the Nepalese crew for launch.", "ready", 0);
addLog("Mission control is online.");
