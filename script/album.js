const albumsURL =
  "https://striveschool-api.herokuapp.com/api/deezer/album/75621062"; //6605779
//////////////
const audio = document.getElementById("mioAudio");

// funzione per stoppare e riavviare una canzone dal tasto play/stop
const btnPlayPause = document.getElementById("btnPlayPause");
function togglePlay() {
  if (audio.paused) {
    audio.play();
    btnPlayPause.textContent = "Pausa";
  } else {
    audio.pause();
    btnPlayPause.textContent = "Play";
  }
}

//funzione che avvia la canzone in base a quale si clicca che si avvierà al click sul div
const playSong = function (link) {
  audio.pause();
  audio.currentTime = 0;
  audio.load();

  if (audio.paused) {
    console.log("if 1");
    audio.innerHTML = ` <source src= '${link}' type="audio/mpeg" />`;

    audio.play();
  }
};

// funzione per la durata

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
      const year = album.release_date;
      const tracksArray = album.tracks.data;
      console.log(tracksArray);

      // PER INSERIRE LA COPERTINA PRINCIPALE AL SUO POSTO
      const copertinaPrincipale = document.getElementById(
        "copertinaPrincipale",
      );
      copertinaPrincipale.innerHTML = `
      <img src=${cover} alt="image" class="image-fluid"/>
    
      `;

      // PER INSERIRE LA DESCRIZIONE DEL ALBUM AL SUO POSTO
      const titoloPrincipale = document.getElementById("descrizioneAlbum");
      titoloPrincipale.innerHTML = `  
      <h4>${albumTitle}</h4>   
     <div class="d-flex"><img src=${artistImg} alt="profilePicture" class="rounded-circle me-2" style="width: 25px; height: 25px"/><a href="./artist.html" class="text-decoration-none text-white"><h6>${artistName}</h6></a>  <h6> </h6></div>
            <p class="text-white-50">${type} . ${year}</p> `;

      // ORA FACCIO TUTTE LE CANZONI NEL ALBUM
      const container = document.getElementById("mainContainer");
      console.log(tracksArray, "canzone");

      tracksArray.forEach((track) => {
        // console.log(track);
        container.innerHTML += ` 
      <div class="row justify-content-center playSong mb-3" onclick="playSong('${track.preview}');" role="button">
          <div class="col col-6 col-md-4 text-start flex-fill">
            <h5 class=" mb-0">${track.title}</h5>
            <a href="./artist.html" class="text-decoration-none text-white-50">${artistName}</a>
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
                  class="bi bi-three-dots-vertical text-white-50"
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
            <p>${track.rank}</p>
          </div>
          <div class="col col-md-4 d-none d-md-block text-end">${track.duration}</div>
          <!-- verisione computer -->
        </div>
        `;
      });
      // PER AUDIO
    })
    .catch((err) => {
      console.log("errore", err);
    });
};

getData();
