const countdownEl = document.getElementById("countdown");
const countdownSection = document.getElementById("countdown-section");
const celebration = document.getElementById("celebration");
const unlockBtn = document.getElementById("unlock-btn");
const mainSite = document.getElementById("main-site");

// SET TARGET DATE (LOCAL TIME)
const targetDate = new Date("February 9, 2026 16:20:00").getTime();

const timer = setInterval(() => {
  const now = new Date().getTime();
  const diff = targetDate - now;

  // IF TIME PASSED
  if (diff <= 0) {
    clearInterval(timer);
    startCelebration();
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdownEl.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}, 1000);

// CELEBRATION
function startCelebration() {
  countdownSection.classList.add("hidden");
  celebration.classList.remove("hidden");

  launchConfetti();
  launchHearts();

  setTimeout(() => {
    unlockBtn.classList.remove("hidden");
  }, 3500);
}

// CONFETTI
function launchConfetti() {
  confetti({
    particleCount: 200,
    spread: 120,
    origin: { y: 0.6 }
  });
}

// FLOATING HEARTS
function launchHearts() {
  for (let i = 0; i < 35; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = 3 + Math.random() * 2 + "s";
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 5000);
  }
}

// UNLOCK MAIN SITE
unlockBtn.addEventListener("click", () => {
  celebration.classList.add("hidden");
  mainSite.classList.remove("hidden");
});


// 🎵 MUSIC PLAYER LOGIC

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const cover = document.getElementById("cover");
const title = document.getElementById("song-title");

const songs = [
  {
    name: "Willow - Taylor Swift",
    file: "assets/songs/willowsong.mp3",
    cover: "assets/covers/cover1.jpg"
  },
  {
    name: "Song Title 2",
    file: "assets/songs/song2.mp3",
    cover: "assets/covers/cover2.jpg"
  },
  {
    name: "Song Title 3",
    file: "assets/songs/song3.mp3",
    cover: "assets/covers/cover3.jpg"
  },
  {
    name: "Song Title 4",
    file: "assets/songs/song4.mp3",
    cover: "assets/covers/cover4.jpg"
  }
];

let songIndex = 0;
let isPlaying = false;

function loadSong(index) {
  title.textContent = songs[index].name;
  audio.src = songs[index].file;
  cover.src = songs[index].cover;
}

function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸";
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = "▶️";
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

nextBtn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  playSong();
});

prevBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  playSong();
});

// Auto play next when song ends
audio.addEventListener("ended", () => {
  nextBtn.click();
});

// Load first song
loadSong(songIndex);
