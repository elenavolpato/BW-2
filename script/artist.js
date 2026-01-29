//when integrated with home page use this to replace the artist ID
const url = location.search;
const allTheParameters = new URLSearchParams(url);
const artistID = allTheParameters.get("_id");

const artistURL = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistID}`;
let numberOfSongs = 5;

//converts seconds into minutes and seconds
const songDuration = (seconds) => {
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const renderArtistInfo = () => {
  const artistName = document.querySelectorAll(".artist-name");
  const hero = document.getElementById("hero");
  const likedBandImg = document.getElementById("band-you-liked-img");
  const numberOfListeners = document.getElementById("number-listeners");

  fetch(artistURL)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error in retrieving data");
      }
    })
    .then((data) => {
      artistName.forEach((element) => (element.innerText = data.name));
      hero.style.backgroundImage = `url(${data.picture_xl})`;
      likedBandImg.src = data.picture_medium;
      likedBandImg.alt = `${data.name} picture`;
      numberOfListeners.innerText = `${data.nb_fan.toLocaleString("de-DE")} ascoltatori mensile`;
    })
    .catch((err) => {
      console.error("error", err);
    });
};

const renderSongList = () => {
  fetch(artistURL + `/top?limit=${numberOfSongs}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error in retrieving data");
      }
    })
    .then((data) => {
      //console.log("data", data);
      const mostPlayedSongs = document.getElementById("most-played-songs");
      const songsHTML = data.data
        .map(
          (item) => `
          <div class="row song-list my-2 align-items-center" 
              data-preview="${item.preview}"
              data-artist="${item.artist.name}"
              data-cover="${item.album.cover}"
              data-title="${item.title}">
            <div class="col-1 text-white-50 text-end mb-0"> 
              <i class="bi bi-play-fill icon-hover fs-5" ></i>
              <p class="rank-number">${data.data.indexOf(item) + 1} </p>
            </div> 
            
            <img 
                class="col-auto" 
                src="${item.album.cover}" 
                alt="Album ${item.album.title} cover"/>
            <p class="col fw-bold mb-0">${item.title}</p>
            <p class="col-2 text-end text-white-50 mb-0">${item.rank.toLocaleString("de-DE")}</p>
            <p class="col-1 text-white-50 mb-0">${songDuration(item.duration)}</p>
          </div>
            `,
        )
        .join("");

      mostPlayedSongs.innerHTML =
        songsHTML + (numberOfSongs <= 5 ? `<button class="btn text-white-50 my-3  fw-bold text-start" id="see-more">VISUALIZA ALTRO</button>` : "");

      console.log(document.querySelectorAll(".song-list"));
      document.querySelectorAll(".song-list").forEach((songDiv) => {
        songDiv.addEventListener("click", function () {
          console.log("clicked");
          playSelectedSong(this.dataset.preview, this.dataset.artist, this.dataset.cover, this.dataset.title);
        });
      });

      const seeMoreBtn = document.getElementById("see-more");
      seeMoreBtn.addEventListener("click", () => {
        numberOfSongs = 15;
        renderSongList();
      });
    })

    .catch((err) => {
      console.error("error", err);
    });
};
renderSongList();

function playSelectedSong(songPreview, artistName, albumCover, title) {
  if (audio === null) {
    audio = new Audio(songPreview);
    audio.play();
    isPlaying = true;

    songTitle.innerText = title;
    songArtist1.innerText = artistName;
    songArtist2.innerText = artistName;
    footerImg.src = albumCover || song.album.cover_medium;

    updatePlayButton(playButton, true);
    console.log(playButton);
  }
}

renderArtistInfo();

const followBtn = document.getElementById("follow-btn");

followBtn.addEventListener("click", () => {
  followBtn.innerText = followBtn.innerText === "FOLLOWING" ? "FOLLOW" : "FOLLOWING";
});

/* SEARCH SECTION */
const searchForm = document.getElementById("form-ricerca");
const searchInput = document.getElementById("input-ricerca");

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  window.location.href = `search.html?value=${searchInput.value}`;
});

/* PLAYER FUNCTIONS */

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

const songTitle = document.getElementById("song-title");
const songArtist1 = document.getElementById("song-artist1");
const songArtist2 = document.getElementById("song-artist2");
const footerImg = document.getElementById("footerImg");
const progressFilled = document.querySelector(".progress-filled");
const currentTimeElem = document.getElementById("currentTime");
const totalTimeElem = document.getElementById("totalTime");

// Handles only audio playback
function playRandomSong(songObj) {
  const { artist, song } = songObj;
  console.log("here", songObj);

  if (audio) audio.pause();

  audio = new Audio(song.preview);
  audio.play();
  isPlaying = true;

  // Set song info in the UI
  songTitle.innerText = song.title;
  songArtist1.innerText = artist.name;
  songArtist2.innerText = artist.name;
  footerImg.src = artist.picture_medium || song.album.cover_medium;

  audio.addEventListener("loadedmetadata", () => {
    totalTimeElem.innerText = formatTime(audio.duration);
  });

  audio.addEventListener("timeupdate", () => {
    currentTimeElem.innerText = formatTime(audio.currentTime);
    updateProgressBar(progressFilled, audio.currentTime, audio.duration);
  });

  audio.addEventListener("ended", () => {
    isPlaying = false;
    updatePlayButton(playButton, false);
  });
}

// separate function to handle button icon change
function updatePlayButton(button, playing) {
  const icon = playing ? `<i class="bi bi-pause-circle-fill fs-1 mx-2"></i>` : `<i class="bi bi-play-circle-fill fs-1 mx-2"></i>`;
  button.innerHTML = icon;
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
      updatePlayButton(clickedButton, false);
      return;
    }

    if (audio && !isPlaying) {
      audio.play();
      isPlaying = true;
      updatePlayButton(clickedButton, true);
      return;
    }

    const songObj = await getRandomArtist();
    if (!songObj) return;

    songHistory.push(songObj);
    currentIndex = songHistory.length - 1;

    playRandomSong(songObj);
    updatePlayButton(clickedButton, true);
  });
}

document.getElementById("skipForward").addEventListener("click", () => {
  if (currentIndex + 1 < songHistory.length) {
    currentIndex++;
    playRandomSong(songHistory[currentIndex]);
  } else {
    getRandomArtist().then((songObj) => {
      songHistory.push(songObj);
      currentIndex++;
      playRandomSong(songObj, document.getElementById("playButton"));
    });
  }
});

document.getElementById("skipBackward").addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    playRandomSong(songHistory[currentIndex], document.getElementById("playButton"));
  }
});

buttonFunction("playButton");
buttonFunction("playButtonMobile");
