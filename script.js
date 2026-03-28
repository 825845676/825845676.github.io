let current = 0;
let screens = document.querySelectorAll(".screen");
let container = document.querySelector(".container");
let started = false;

// ======================
// SCREEN NAVIGATION
// ======================

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

function prevScreen() {
  if (current > 0) {
    current--;
    updateScreen();
  }
}

function updateScreen() {
  container.style.transform = `translateX(-${current * 100}vw)`;

  screens.forEach(s => s.classList.remove("active"));
  screens[current].classList.add("active");

  changeMusic(Number(screens[current].dataset.music));
}

// ======================
// CLICK ANYWHERE NAVIGATION
// ======================

document.addEventListener("click", (e) => {
  const isButton = e.target.closest("button");
  const isModal = e.target.closest(".modal-content");

  if (isButton || isModal) return;

  nextScreen();
});

// ======================
// SWIPE SUPPORT (MOBILE)
// ======================

let startX = 0;

document.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

document.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;

  if (startX - endX > 50) {
    nextScreen(); // swipe left
  } else if (endX - startX > 50) {
    prevScreen(); // swipe right
  }
});

// ======================
// MODAL
// ======================

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

// ======================
// HIDDEN MESSAGE
// ======================

function revealSecret() {
  alert("I still care about you. Quietly.");
}

// ======================
// MUSIC SYSTEM (FIXED)
// ======================

let tracks = [
  new Audio("music/music1.mp3"),
  new Audio("music/music2.mp3"),
  new Audio("music/music3.mp3"),
  new Audio("music/music4.mp3")
];

tracks.forEach(track => {
  track.loop = true;
  track.volume = 0;
});

let currentTrack = null;
let fadeInterval = null;

function changeMusic(index) {
  let next = tracks[index];
  if (!next || next === currentTrack) return;

  next.currentTime = currentTrack ? currentTrack.currentTime : 0;
  next.play();

  if (fadeInterval) clearInterval(fadeInterval);

  let fadeDuration = 1000;
  let step = 50;
  let steps = fadeDuration / step;
  let volumeStep = 0.6 / steps; // max volume = 0.6

  fadeInterval = setInterval(() => {
    if (currentTrack && currentTrack.volume > 0) {
      currentTrack.volume = Math.max(0, currentTrack.volume - volumeStep);
    }

    if (next.volume < 0.6) {
      next.volume = Math.min(0.6, next.volume + volumeStep);
    }

    if (next.volume >= 0.6) {
      clearInterval(fadeInterval);
      if (currentTrack) currentTrack.pause();
      currentTrack = next;
    }
  }, step);
}
