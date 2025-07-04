const clock = document.getElementById("clock");
const dateEl = document.getElementById("date");
const timezone = document.getElementById("timezone");
const periodEl = document.getElementById("period");
const toggleTheme = document.getElementById("toggleTheme");
const toggleFormat = document.getElementById("toggleFormat");
const toggleSound = document.getElementById("toggleSound");

let is24Hour = false;
let soundEnabled = false;

// Load tick sound (stored in 'sounds/tick.mp3' folder)
const tickSound = new Audio("tick.mp3");
tickSound.volume = 0.3;

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  let period = "";

  if (!is24Hour) {
    period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 0 to 12
  }

  clock.textContent = `${String(hours).padStart(2, "0")}:${minutes}:${seconds}`;
  periodEl.textContent = is24Hour ? "" : period;

  const dateOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  dateEl.textContent = now.toLocaleDateString('en-US', dateOptions);

  timezone.textContent = `Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`;

  if (soundEnabled) {
    tickSound.pause();
    tickSound.currentTime = 0;
    tickSound.play();
  } else {
    tickSound.pause();
    tickSound.currentTime = 0;
  }
}

setInterval(updateClock, 1000);
updateClock();

// Theme toggle (dark/light)
toggleTheme.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});

// 12H / 24H format toggle
toggleFormat.addEventListener("click", () => {
  is24Hour = !is24Hour;
  toggleFormat.textContent = is24Hour ? "12-Hour" : "24-Hour";
});

// Sound mute/unmute
toggleSound.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  toggleSound.textContent = soundEnabled ? "🔇 Mute" : "🔈 Sound";

  // Immediately stop any ongoing tick sound when muted
  if (!soundEnabled) {
    tickSound.pause();
    tickSound.currentTime = 0;
  }
});
