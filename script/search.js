document.getElementById("year").textContent = new Date().getFullYear();
const url = location.search;
const allTheParameters = new URLSearchParams(url);
const searchedWord = allTheParameters.get("value");

const getData = function (parolaCercata) {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${parolaCercata}`)
    .then((res) => {
      console.log("response", res);
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nella chiamata");
      }
    })
    .then((obj) => {
      console.log("DATI RICEVUTI", obj);
      const spinner = document.getElementById("spinner-container");
      spinner.classList.add("d-none");
      const songs = obj.data;
      // canzoniAttuali = songs;
      const artistaTarget = document.getElementById("artista-target");
      const braniTarget = document.getElementById("brani-container");
      row.innerHTML = "";

      const primaFotoArtista = songs[0].artist.picture_medium;
      const nomeArtista = songs[0].artist.name;
      artistaTarget.innerHTML = `
      <h4 class="text-light mb-3">Risultato più rilevante</h4>
      <div class="custom-card rounded p-4 d-flex flex-column shadow" id="card-artista"
           style="background-color: #1a1d20; height: 250px; max-width: 100%; cursor: pointer">
        <div class="mb-3">
          <img src="${primaFotoArtista}" 
               style="width: 100px; height: 100px; object-fit: cover" 
               class="rounded-circle shadow" />
        </div>
        <h2 class="text-white fw-bold mb-1">${nomeArtista}</h2>
        <p class="text-secondary fw-bold small">Artista</p>
      </div>
    `;
      console.log("ID ARTISTA", songs);
      braniTarget.innerHTML = "";
      const primiQuattro = songs.slice(0, 4);
      canzoniAttuali = primiQuattro;
      braniTarget.innerHTML = `<h4 class="text-light mb-1 mt-5">Brani</h4>`;

      primiQuattro.forEach((song, i) => {
        braniTarget.innerHTML += `
        <div class="d-flex align-items-center justify-content-between p-2 rounded song-row" style="cursor: pointer;" onclick="playSong(${i})">
          <div class="d-flex gap-3 align-items-center">
            <img src="${song.album.cover_small}" alt="" class="rounded" style="width: 45px; height: 45px" />
            <div class="d-flex flex-column">
              <h6 class="text-light mb-0 text-truncate" style="max-width: 200px;">${song.title}</h6>
              <p class="text-secondary small mb-0">${song.artist.name}</p>
              </div>
              </div>
              <span class="text-secondary small">${Math.floor(song.duration / 60)}:${(song.duration % 60).toString().padStart(2, "0")}</span>
          </div>
      `;
      });
      const uniqueByArtist = _.uniqBy(songs, (item) => item.artist.id);
      const primiSei = uniqueByArtist.splice(0, 7);
      const artistiContainer = document.getElementById("artisti-container");

      artistiContainer.innerHTML = `
        <h4 class="text-light my-3">Artisti</h4>`;
      for (let i = 1; i < primiSei.length; i++) {
        const fotoartista = primiSei[i].artist.picture;
        const nomeArtista = primiSei[i].artist.name;
        const album = songs[i].album.cover;
        const nomeAlbum = songs[i].album.title;

        // const primaFotoArtista = songs[0].artist.picture;
        // if (fotoartista === primaFotoArtista) {
        //   null;
        // } else {
        artistiContainer.innerHTML += `
        <div class="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2 
                        ${i === 2 ? "d-none d-sm-block" : ""} 
                        ${i === 4 ? "d-none d-lg-block" : ""} 
                        ${i >= 4 ? "d-none d-xl-block" : ""}">
          <a href="./artist.html?id=${songs[i].artist.id}" class="text-decoration-none">
            <img src="${fotoartista}" alt="" style="width: 180px; height: 180px; object-fit: cover" class="rounded-circle shadow">
            <h6 class="text-light mt-2 mb-0">${nomeArtista}</h6>
            <p class="text-secondary small">Artista</p>
          </a>
        </div>
       `;
        // }  <-- attenzione   ===>   ELSE IF SOPRA - FILTRO PER NON RIPETERE FOTO ARTISTA   <===
      }
      const albumContainer = document.getElementById("album-artisti-container");
      albumContainer.innerHTML = `
        <h4 class="text-light my-3">Album</h4>`;
      for (let i = 1; i < primiSei.length; i++) {
        const nomeArtista = songs[i].artist.name;
        const album = songs[i].album.cover;
        const nomeAlbum = songs[i].album.title;

        albumContainer.innerHTML += `
            <div class="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2 
                        ${i === 2 ? "d-none d-sm-block" : ""} 
                        ${i === 4 ? "d-none d-lg-block" : ""} 
                          ${i >= 4 ? "d-none d-xl-block" : ""}">
              <a href="./album.html?id=${songs[i].album.id}" class="text-decoration-none">
                <img src="${album}" alt="" style="width: 180px; height: 180px; object-fit: cover" class="rounded shadow">
                <h6 class="text-light mt-2 mb-0 text-truncate">${nomeAlbum}</h6>
                <p class="text-secondary small">${nomeArtista}</p>
              </a>
            </div>
          
        `;
      }
    })

    .catch((err) => {
      console.log("errore", err);
      const spinner = document.getElementById("spinner-container");
      spinner.classList.add("d-none");
    });
};

const formRicerca = document.getElementById("form-ricerca");
const inputRicerca = document.getElementById("input-ricerca");

formRicerca.addEventListener("submit", function (event) {
  event.preventDefault();
  const parolaCercata = inputRicerca.value;
  getData(parolaCercata);
});
getData("");

if (searchedWord != undefined) {
  getData(searchedWord);
}
// songs.[0].artist.picture
// songs.[0].artist.name

// songs.[0].album.cover
// songs.[0].artist.title-short
// songs.[0].artist.name

let currentAudio = null;
let canzoniAttuali = [];
let indiceCanzoneAttuale = 0;

function playSong(i) {
  if (i < 0 || i >= canzoniAttuali.length) return;

  indiceCanzoneAttuale = i;
  const song = canzoniAttuali[i];

  if (currentAudio) {
    currentAudio.pause();
  }

  currentAudio = new Audio(song.preview);
  currentAudio.play();

  document.getElementById("soundbarTitolo").innerText = song.title;
  document.getElementById("soundbarArtista").innerText = song.artist.name;
  document.getElementById("footerImg").src = song.album.cover_medium;

  const playIcon = document.getElementById("footerArtist");

  playIcon.classList.remove("bi-play-circle-fill");
  playIcon.classList.add("bi-pause-circle-fill");

  currentAudio.addEventListener("timeupdate", function () {
    const progressFilled = document.querySelector(".progress-filled");
    const currentTimeEl = document.getElementById("currentTime");
    const totalTimeEl = document.getElementById("totalTime");

    let percentage = (currentAudio.currentTime / currentAudio.duration) * 100;
    progressFilled.style.width = percentage + "%";

    let curMins = Math.floor(currentAudio.currentTime / 60);
    let curSecs = Math.floor(currentAudio.currentTime % 60);
    if (curSecs < 10) curSecs = "0" + curSecs;
    currentTimeEl.innerText = curMins + ":" + curSecs;

    let totMins = Math.floor(currentAudio.duration / 60);
    let totSecs = Math.floor(currentAudio.duration % 60);
    if (totSecs < 10) totSecs = "0" + totSecs;
    if (!isNaN(totMins)) {
      totalTimeEl.innerText = totMins + ":" + totSecs;
    }
  });

  // Tasti play/pausa
  playIcon.onclick = function () {
    if (currentAudio.paused) {
      currentAudio.play();
      playIcon.classList.replace("bi-play-circle-fill", "bi-pause-circle-fill");
    } else {
      currentAudio.pause();
      playIcon.classList.replace("bi-pause-circle-fill", "bi-play-circle-fill");
    }
  };
}

// Bottoni Avanti e Indierto
document.getElementById("nextBtn").onclick = function () {
  if (indiceCanzoneAttuale < canzoniAttuali.length - 1) {
    playSong(indiceCanzoneAttuale + 1);
  } else {
    playSong(0);
  }
};

document.getElementById("prevBtn").onclick = function () {
  if (indiceCanzoneAttuale > 0) {
    playSong(indiceCanzoneAttuale - 1);
  }
};
