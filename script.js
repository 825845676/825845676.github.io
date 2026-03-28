let current = 0;
let screens = document.querySelectorAll(".screen");
let container = document.querySelector(".container");
let started = false;

// SCREEN NAVIGATION
function nextScreen() {
  if (!started) {
    started = true;
    changeMusic(0);
  }

  if (current < screens.length - 1) {
    current++;
    updateScreen();
  }
}

function updateScreen() {
  container.style.transform = `translateX(-${current * 100}vw)`;

  screens.forEach(s => s.classList.remove("active"));
  screens[current].classList.add("active");

  changeMusic(screens[current].dataset.music);
}

// MODAL
function openModal(type) {
  let content = {
    overthinking: "Not every thought is true. You can pause.",
    low: "You’re allowed to feel this way.",
  };

  document.getElementById("modalContent").innerText = content[type];
  document.getElementById("modal").style.display = "flex";
}

document.getElementById("modal").onclick = () => {
  document.getElementById("modal").style.display = "none";
};

// HIDDEN MESSAGE
function revealSecret() {
  alert("I still care about you. Quietly.");
}

// MUSIC SYSTEM
let tracks = [
  new Audio("music/music1.mp3"),
  new Audio("music/music2.mp3"),
  new Audio("music/music3.mp3"),
  new Audio("music/music4.mp3"),
  new Audio("music/music5.mp3")
];

tracks.forEach(track => {
  track.loop = true;
  track.volume = 0.6;
});

let currentTrack = null;

function changeMusic(index) {
  let next = tracks[index];
  if (!next || next === currentTrack) return;

  next.currentTime = currentTrack ? currentTrack.currentTime : 0;
  next.play();

  let fadeDuration = 1000;
  let step = 50;
  let steps = fadeDuration / step;
  let volumeStep = 1 / steps;

  let fade = setInterval(() => {
    if (currentTrack && currentTrack.volume > 0) {
      currentTrack.volume = Math.max(0, currentTrack.volume - volumeStep);
    }

    if (next.volume < 1) {
      next.volume = Math.min(1, next.volume + volumeStep);
    }

    if (next.volume >= 1) {
      clearInterval(fade);
      if (currentTrack) currentTrack.pause();
      currentTrack = next;
    }
  }, step);
}
