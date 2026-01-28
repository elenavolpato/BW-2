let audio = null;
let isPlaying = false;
let songHistory = [];
let currentIndex = -1;

function getRandomArtist() {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const randomLetter = letters[Math.floor(Math.random() * letters.length)];
  const url = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${randomLetter}`;

  return fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("HTTP error " + res.status);
      return res.json();
    })
    .then((data) => {
      if (!data.data || data.data.length === 0) return getRandomArtist();
      const randomSong = data.data[Math.floor(Math.random() * data.data.length)];
      return { artist: randomSong.artist, song: randomSong };
    })
    .catch((err) => console.error("ERRORE", err));
}

function updateProgressBar(progressFilled, currentTime, duration) {
  const percent = (currentTime / duration) * 100;
  progressFilled.style.width = percent + "%";
}

function playSong(songObj, playButton) {
  const { artist, song } = songObj;

  if (audio) audio.pause();
  audio = new Audio(song.preview);
  audio.play();
  isPlaying = true;

  playButton.innerHTML = `<i class="bi bi-pause-circle-fill fs-1 mx-2"></i>`;

  document.getElementById("song-title").innerText = song.title;
  document.getElementById("song-artist1").innerText = artist.name;
  document.getElementById("song-artist2").innerText = artist.name;
  document.getElementById("footerImg").src = artist.picture_medium || song.album.cover_medium;

  const progressFilled = document.querySelector(".progress-filled");
  const currentTimeElem = document.getElementById("currentTime");
  const totalTimeElem = document.getElementById("totalTime");

  audio.addEventListener("loadedmetadata", () => {
    totalTimeElem.innerText = formatTime(audio.duration);
  });

  audio.addEventListener("timeupdate", () => {
    currentTimeElem.innerText = formatTime(audio.currentTime);
    updateProgressBar(progressFilled, audio.currentTime, audio.duration);
  });

  audio.addEventListener("ended", () => {
    isPlaying = false;
    playButton.innerHTML = `<i class="bi bi-play-circle-fill fs-1 mx-2"></i>`;
  });
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function buttonFunction(buttonId) {
  const btn = document.getElementById(buttonId);
  if (!btn) return;

  btn.addEventListener("click", async (event) => {
    const clickedButton = event.currentTarget;

    if (audio && isPlaying) {
      audio.pause();
      isPlaying = false;
      clickedButton.innerHTML = `<i class="bi bi-play-circle-fill fs-1 mx-2"></i>`;
      return;
    }

    if (audio && !isPlaying) {
      audio.play();
      isPlaying = true;
      clickedButton.innerHTML = `<i class="bi bi-pause-circle-fill fs-1 mx-2"></i>`;
      return;
    }

    const songObj = await getRandomArtist();
    if (!songObj) return;

    songHistory.push(songObj);
    currentIndex = songHistory.length - 1;
    playSong(songObj, clickedButton);
  });
}

document.getElementById("skipForward").addEventListener("click", () => {
  if (currentIndex + 1 < songHistory.length) {
    currentIndex++;
    playSong(songHistory[currentIndex], document.getElementById("playButton"));
  } else {
    getRandomArtist().then((songObj) => {
      songHistory.push(songObj);
      currentIndex++;
      playSong(songObj, document.getElementById("playButton"));
    });
  }
});

document.getElementById("skipBackward").addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    playSong(songHistory[currentIndex], document.getElementById("playButton"));
  }
});

buttonFunction("playButton");
buttonFunction("playButtonMobile");
