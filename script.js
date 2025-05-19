const audio = document.getElementById('audio');
const playIcon = document.getElementById('play-icon');
const songTitle = document.getElementById('song-title');
const loopBtn = document.getElementById('loop-btn');

// Playlist
const songs = [
  {
    title: 'Yeh Sham Mastani',
    src: 'Yeh Shaam Mastani.mp3'
  },
  {
    title: 'Bade Achhe Lagte Hain',
    src: 'Bade Acche Lagte Hai.mp3'
  },
  {
    title: 'Ajeeb Datan Hain Yeh',
    src: 'Ajib Dastan Hai Yeh.mp3'
  },
  {
    title: 'Kahin Door Jab Dil Dhal Jaye',
    src: 'Kahin Door Jab Din Dhal Jaye.mp3'
  },
  {
    title: 'Achha Ji Main Hari Chalo maan Jao Na',
    src: 'Achha ji main hari chalo maan jao na.mp3'
  }
];

let currentSong = 0;
let isLooping = false;

function loadSong(index) {
  audio.src = songs[index].src;
  songTitle.innerText = songs[index].title;
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playIcon.classList.remove('fa-play');
    playIcon.classList.add('fa-pause');
  } else {
    audio.pause();
    playIcon.classList.remove('fa-pause');
    playIcon.classList.add('fa-play');
  }
}

function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  audio.play();
  updatePlayIcon(true);
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  audio.play();
  updatePlayIcon(true);
}

function updatePlayIcon(playing) {
  if (playing) {
    playIcon.classList.remove('fa-play');
    playIcon.classList.add('fa-pause');
  } else {
    playIcon.classList.remove('fa-pause');
    playIcon.classList.add('fa-play');
  }
}

function changeSpeed(rate) {
  audio.playbackRate = parseFloat(rate);
}

function toggleLoop() {
  isLooping = !isLooping;
  audio.loop = isLooping;
  loopBtn.innerHTML = `<i class="fas fa-sync-alt"></i> ${isLooping ? 'Loop On' : 'Loop Off'}`;
}

function seek(seconds) {
  audio.currentTime += seconds;
}

// Load first song
loadSong(currentSong);

// Update play/pause icon when song ends
audio.addEventListener('ended', () => {
  if (!audio.loop) {
    nextSong();
  }
});
