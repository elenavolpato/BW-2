const url = location.search;
const allTheParameters = new URLSearchParams(url);
const albumID = allTheParameters.get("id");

const albumsURL = `https://striveschool-api.herokuapp.com/api/deezer/album/${albumID}`;

/*const albumsURL =
  "https://striveschool-api.herokuapp.com/api/deezer/album/75621062";*/ //6605779
//////////////

// funzione per la durata

const songDuration = (seconds) => {
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

// PER ANNO

const getYear = function (year) {
  return year.slice(0, 4);
};
/// per ricerca
const searchForm = document.getElementById("form-ricerca");
const searchInput = document.getElementById("input-ricerca");
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  window.location.href = `search.html?value=${searchInput.value}`;
});
///////////////

const getData = function () {
  fetch(albumsURL)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nel ricavare i dati");
      }
    })
    .then((album) => {
      //VARIABILI
      const cover = album.cover_medium;
      const albumTitle = album.title;
      const artistName = album.artist.name;
      const artistImg = album.artist.picture;
      const type = album.type;
      const releaseDate = album.release_date;
      const year = getYear(releaseDate);
      const tracksArray = album.tracks.data;
      console.log(album);

      // PER INSERIRE LA COPERTINA PRINCIPALE AL SUO POSTO
      const copertinaPrincipale = document.getElementById("copertinaPrincipale");
      copertinaPrincipale.innerHTML = `
      <img src=${cover} alt="image" class="img-fluid"/>
    
      `;

      // PER INSERIRE LA DESCRIZIONE DEL ALBUM AL SUO POSTO
      const titoloPrincipale = document.getElementById("descrizioneAlbum");
      titoloPrincipale.innerHTML = `  
      <h1>${albumTitle}</h1>   
      <div class="d-flex mt-3"><img src=${artistImg} alt="profilePicture" class="rounded-circle me-2" style="width: 25px; height: 25px"/><a href="./artist.html" class="text-decoration-none text-white"><h6>${artistName}</h6></a>  <h6> </h6></div>
      <p class="sideBarTextColor mt-2">${type} . ${year}</p> `;

      // ORA FACCIO TUTTE LE CANZONI NEL ALBUM
      const container = document.getElementById("mainContainer");
      console.log(tracksArray.preview, "canzone");

      tracksArray.forEach((track, i) => {
        const timing = songDuration(track.duration);
        i = i + 1;
        console.log(timing);
        container.innerHTML += ` 
        <div class="row justify-content-center playSong mb-3 box-hover py-2" onclick="playSong(${JSON.stringify(track).replace(/"/g, "&quot;")});" role="button">
          <div class="col col-6 col-md-4 text-start flex-fill pe-0">
         
         <p class="fw-bold mb-0">${i}. ${track.title}</p>
            <a href="./artist.html" class="text-decoration-none sideBarTextColor ps-0">${artistName}</a>
          </div>
          <!-- 3 puntini mobile -->
          <div class="col col-6 d-md-none text-end flex-shrink-1">
            <div class="dropdown">
              <button
                type="button"
                class="btn dropdown-bs-toggle"
                data-toggle="dropdown">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-three-dots-vertical sideBarTextColor"
                  viewBox="0 0 16 16">
                  <path
                    d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                </svg>
              </button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#"> Data Structure </a>
                <a class="dropdown-item" href="#"> Algorithm </a>
              </div>
            </div>
          </div>
          <!-- 3 puntini mobile finish -->
          <!-- versione computer -->
          <div class="col col-md-4 d-none d-md-block text-end">
            <p class="sideBarTextColor">${track.rank.toLocaleString("de-DE")}</p>
          </div>
          <div class="col col-md-4 d-none d-md-block text-end sideBarTextColor">${songDurationo(track.duration)}</div>
          <!-- verisione computer -->
        </div>
        `;
      });
    })
    .catch((err) => {
      console.log("errore", err);
    });
};
// ================== STATE ==================
let audio = null;
let isPlaying = false;
let playlist = [];
let currentIndex = -1;
// ================== UTILS ==================
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function updateProgressBar(progressFilled, currentTime, duration) {
  const percent = (currentTime / duration) * 100;
  progressFilled.style.width = percent + "%";
}

// ================== PLAYER ==================
function playSong(song) {
  if (audio) audio.pause();

  audio = new Audio(song.preview);
  audio.play();
  isPlaying = true;

  // playlist
  playlist.push(song);
  currentIndex = playlist.length - 1;

  // footer
  document.getElementById("song-title").innerText = song.title;
  document.getElementById("song-artist1").innerText = song.artist.name;
  document.getElementById("song-artist2").innerText = song.artist.name;
  document.getElementById("footerImg").src = song.artist.picture_medium || song.album.cover_medium;

  updatePlayIcons(true);

  const progressFilled = document.querySelector(".progress-filled");

  audio.addEventListener("loadedmetadata", () => {
    document.getElementById("totalTime").innerText = formatTime(audio.duration);
  });

  audio.addEventListener("timeupdate", () => {
    document.getElementById("currentTime").innerText = formatTime(audio.currentTime);
    updateProgressBar(progressFilled, audio.currentTime, audio.duration);
  });

  audio.addEventListener("ended", () => {
    isPlaying = false;
    updatePlayIcons(false);
  });
}

// ================== PLAY ICONS ==================
function updatePlayIcons(playing) {
  const icon = playing ? `<i class="bi bi-pause-circle-fill fs-1 mx-2"></i>` : `<i class="bi bi-play-circle-fill fs-1 mx-2"></i>`;

  const iconMobile = playing ? `<i class="bi bi-pause-fill fs-4"></i>` : `<i class="bi bi-play-fill fs-4"></i>`;

  document.getElementById("playButton").innerHTML = icon;
  document.getElementById("playButtonMobile").innerHTML = iconMobile;
}
// ================== PLAY / PAUSE ==================
function togglePlay() {
  if (!audio) return;

  if (isPlaying) {
    audio.pause();
    isPlaying = false;
  } else {
    audio.play();
    isPlaying = true;
  }

  updatePlayIcons(isPlaying);
}

document.getElementById("playButton")?.addEventListener("click", togglePlay);
document.getElementById("playButtonMobile")?.addEventListener("click", togglePlay);

// ================== SKIP ==================

document.getElementById("skipBackward")?.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    playSong(playlist[currentIndex]);
  }
});

// ================== ALBUM ==================

const songDurationo = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

getData();
