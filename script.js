let current = 0;
let screens = document.querySelectorAll(".screen");
let container = document.querySelector(".container");

// SCREEN NAVIGATION
function nextScreen() {
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
  new Audio("music/music5.mp3"),
  new Audio("music/music6.mp3")
];

let currentTrack = null;

function changeMusic(index) {
  let next = tracks[index];
  if (!next) return;

  next.volume = 0;
  next.play();

  let fade = setInterval(() => {
    if (currentTrack) currentTrack.volume -= 0.05;
    next.volume += 0.05;

    if (next.volume >= 1) {
      clearInterval(fade);
      if (currentTrack) currentTrack.pause();
      currentTrack = next;
    }
  }, 200);
}
