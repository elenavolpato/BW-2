// creazione fetch per album

const getAlbums = function () {
  fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=album")
    .then((Response) => {
      if (Response.ok) return Response.json();
      throw new Error("la response ha un problema");
    })
    .then((data) => {
      const crdAlbum = document.getElementById("cardAlbum");
      crdAlbum.innerHTML = ""; // Puliamo per evitare duplicati

      const randomAlbums = data.data.sort(() => Math.random() - 0.5).slice(0, 8);
      for (let i = 0; i < randomAlbums.length; i++) {
        const isActive = i === 0 ? "active" : "";
        crdAlbum.innerHTML += `
                 <div class="carousel-item ${isActive}">
            <div class="row align-items-center">
              <div class="col-4">
              <a href="album.html?id=${randomAlbums[i].album.id}" class="link-offset-2 link-underline link-underline-opacity-0">
                <img src="${randomAlbums[i].album.cover_big}" class="d-block w-100 shadow" alt="${randomAlbums[i].album.title}" />
                </a>
              </div>
              <div class="col-8 text-start text-white">
                <a href="album.html?id=${randomAlbums[i].album.id}" class="link-offset-2 link-underline link-underline-opacity-0">
                <h1 class="display-4 fw-bold text-white">${randomAlbums[i].album.title}</h1>
                </a>
                <p class="fs-5">${randomAlbums[i].artist.name}</p>
                <p>Ascolta il nuovo album di ${randomAlbums[i].artist.name}!</p>
               
                <div class="d-flex gap-2 mt-4 mb-2">
                  <button type="button" class="btn btn-success rounded-pill px-4 py-2 fw-bold text-black spotify-green-bg" 
                    id="play-selected-song-btn"
                    data-preview="${randomAlbums[i].preview}"
                    data-artist="${randomAlbums[i].artist.name}"
                    data-cover="${randomAlbums[i].album.cover}"
                    data-title="${randomAlbums[i].title}"
                  >Play</button>
                  <button type="button" class="btn btn-outline-light rounded-pill px-4 py-2 fw-bold">Salva</button>
                  <a class="btn text-white" href="#input-ricerca" role="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>`;

        document.getElementById("play-selected-song-btn").addEventListener("click", function () {
          console.log("clicked");
          playSelectedSong(this.dataset.preview, this.dataset.artist, this.dataset.cover, this.dataset.title);
        });

        //Creazione sezioni da smartphone
        const crdAlbumSm = document.getElementById("cardAlbumSmartphone");
        crdAlbumSm.innerHTML = ""; // Puliamo per evitare duplicati

        const randomAlbums1 = data.data.sort(() => Math.random() - 0.5).slice(0, 8);
        for (let i = 0; i < randomAlbums1.length; i++) {
          const isActive = i === 0 ? "active" : "";
          crdAlbumSm.innerHTML += `
                 <div class="carousel-item ${isActive}">
            <div class="row">
              <div class="col-12">
              <a href="album.html?id=${randomAlbums[i].album.id}" class="link-offset-2 link-underline link-underline-opacity-0">
                <img src="${randomAlbums1[i].album.cover_big}" class="d-block w-100 mb-2 shadow" alt="${randomAlbums1[i].album.title}" />
                </a>
              <div class="position-absolute top-0 end-0">
                        <span class="badge rounded-pill bg-primary">
                          ALBUM
                          <span class="visually-hidden">unread messages</span>
                        </span>
                      </div>
                    </div>

<div class="col-12 text-start">
                      <!--h1-->
                       <a href="album.html?id=${randomAlbums1[i].album.id}" class="link-offset-2 link-underline link-underline-opacity-0">
                      <h1 class="display-4 fw-bold mt-2 text-white">${randomAlbums1[i].album.title}</h1>
                      </a>
                      <p class="fs-5">${randomAlbums1[i].artist.name}</p>
                      <!-- bottoni -->
                      <div class="row">
                        <div class="d-flex mb-3 ms-2 ps-0">
                          <div class="p-2">
                            <button type="button" class="btn btn-success rounded-pill px-4 py-2 fw-bold text-black">Play</button>
                          </div>
                          <div class="p-2">
                            <button type="button" class="btn btn-outline-light rounded-pill px-4 py-2 fw-bold">Salva</button>
                          </div>
                          <div class="p-2"> <a class="btn text-white" href="./search.html" role="button"
                        ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                          <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
                          />
                        </svg>
                      </a></div>
                        </div>
                      </div>
                    </div>
                  </div>`;
        }
      }
    })
    .catch((Error) => console.log("ERRORE NELLA FETCH", Error));
};

getAlbums();

const welcomeBack = function () {
  let user = localStorage.getItem("username");

  const greeting = document.getElementById("welcome");
  greeting.innerHTML = "";

  const myDate = new Date();

  const hour = myDate.getHours();
  console.log("Ora attuale:", hour);

  if (hour >= 5 && hour < 12) {
    greeting.innerHTML = `Buongiorno, ${user}!`;
  } else if (hour >= 12 && hour <= 17) {
    greeting.innerHTML = `Studiamo insieme, ${user}?`;
  } else if (hour > 17 && hour <= 23) {
    greeting.innerHTML = `Rilassati con un po' di musica, ${user}`;
  } else {
    greeting.innerHTML = `L'ultima prima di dormire, ${user}?`;
  }

  //greeting.innerHTML = `<h2>${message}</h2>`;
};

welcomeBack();

const myTrack = function () {
  fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=album")
    .then((Response) => {
      if (Response.ok) return Response.json();
      throw new Error("la response ha un problema");
    })
    .then((data) => {
      const rowCrd = document.getElementById("rowCard");
      const albums = data.data;
      const uniqueTrack = _.uniqBy(albums, (item) => item.album.id);
      const randomTracks = uniqueTrack.splice(0, 5);
      //const randomTracks = data.data.sort(() => Math.random() - 0.5).slice(0, 5);
      for (let i = 0; i < randomTracks.length; i++) {
        rowCrd.innerHTML += `
                    <div class="col-6 col-md-4">
                      <div class="card shadow-sm rounded-2" style="height: 80px">
                        <div class="row g-0 h-100 d-flex flex-nowrap">
                          <div class="col-auto p-0">
                          <a href="album.html?id=${randomTracks[i].album.id}" class="link-offset-2 link-underline link-underline-opacity-0">
                            <img src="${randomTracks[i].album.cover_small}" style="width: 80px; height: 80px; object-fit: cover" alt="Immagine" />
                            </a>
                          </div>
                          <div class="col">
                            <div class="card-body p-3 d-flex align-items-center h-100">
                            <a href="album.html?id=${randomTracks[i].album.id}" class="link-offset-2 link-underline link-underline-opacity-0">
                              <h5 class="card-text mb-0 text-white" style="font-size: 0.8rem; font-weight: 500">${randomTracks[i].album.title}</h5>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>`;
      }
    })
    .catch((Error) => console.log("ERRORE NELLA FETCH", Error));
};
myTrack();

const myArtist = function () {
  const selectedArtists = JSON.parse(localStorage.getItem("selectedArtists"));

  if (selectedArtists && selectedArtists.length > 0) {
    const fetchPromises = [];

    // Prendiamo max 4 artisti dalle preferenze
    const artistiDaFetchare = selectedArtists.slice(0, 4);

    for (let i = 0; i < artistiDaFetchare.length; i++) {
      const singolaFetch = fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistiDaFetchare[i]}`).then((response) => {
        if (response.ok) return response.json();
        throw new Error("Errore nella response");
      });
      fetchPromises.push(singolaFetch);
    }

    Promise.all(fetchPromises)
      .then((artistiPreferiti) => {
        //console.log("ARTISTI PREFERITI:", artistiPreferiti);

        // Fetch per artisti random (gli altri 4)
        return fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=music")
          .then((response) => {
            if (response.ok) return response.json();
            throw new Error("Errore nella fetch random");
          })
          .then((dataRandom) => {
            const artistiRandom = dataRandom.data.slice(0, 4);

            const artistiPreferentiFormattati = artistiPreferiti.map((artist) => ({
              artist: {
                id: artist.id,
                name: artist.name,
                picture_big: artist.picture_big,
              },
            }));

            const tuttiGli8Artisti = [...artistiPreferentiFormattati, ...artistiRandom];
            console.log("TUTTI GLI 8 ARTISTI:", tuttiGli8Artisti);
            renderCarousel(tuttiGli8Artisti);
          });
      })
      .catch((errore) => console.log("ERRORE", errore));
  } else {
    // Caso 2: L'utente non ha selezionato nulla - tutti random
    console.log("Nessun artista preferito, mostro tutti random");
    fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=music")
      .then((Response) => {
        if (Response.ok) return Response.json();
        throw new Error("la response ha un problema");
      })
      .then((data) => {
        const randomArtists = data.data.sort(() => Math.random() - 0.5).slice(0, 8);
        renderCarousel(randomArtists);
      })
      .catch((Error) => console.log("ERRORE NELLA FETCH", Error));
  }
};

// Funzione separata per renderizzare il carousel
function renderCarousel(artists) {
  console.log("Rendering carousel con", artists.length, "artisti");

  // DESKTOP CAROUSEL
  const carouselArtists = document.getElementById("carouselDesktop");
  carouselArtists.innerHTML = "";

  // Creiamo 2 slide, ognuna con 4 artisti
  for (let slide = 0; slide < 2; slide++) {
    const isActive = slide === 0 ? "active" : "";
    const startIndex = slide * 4;
    console.log("here", startIndex);

    carouselArtists.innerHTML += `
      <div class="carousel-item ${isActive}">
          <div class="row gx-2 flex-nowrap">
              <div class="col-md-3 g-2">
              <a href="./artist.html?_id=${artists[startIndex].artist.id}" class="link-offset-2 link-underline link-underline-opacity-0">
                <img src="${artists[startIndex].artist.picture_big}" class="w-100 card-img-top rounded-circle p-3" />
                <h5 class="text-white text-center">${artists[startIndex].artist.name}</h5>
                </a>
              </div>
            </a>
            <div class="col-md-3 g-2">
             <a href="./artist.html?_id=${artists[startIndex + 1].artist.id}" class="link-offset-2 link-underline link-underline-opacity-0">
              <img src="${artists[startIndex + 1].artist.picture_big}" class="w-100 card-img-top rounded-circle p-3" />
              <h5 class="text-white text-center">${artists[startIndex + 1].artist.name}</h5>
              </a>
            </div>
            <div class="col-md-3 g-2">
             <a href="./artist.html?_id=${artists[startIndex + 2].artist.id}" class="link-offset-2 link-underline link-underline-opacity-0">
              <img src="${artists[startIndex + 2].artist.picture_big}" class="w-100 card-img-top rounded-circle p-3" />
              <h5 class="text-white text-center">${artists[startIndex + 2].artist.name}</h5>
              </a>
            </div>
            <div class="col-md-3 g-2">
             <a href="./artist.html?_id=${artists[startIndex + 3].artist.id}" class="link-offset-2 link-underline link-underline-opacity-0">
              <img src="${artists[startIndex + 3].artist.picture_big}" class="w-100 card-img-top rounded-circle p-3" />
              <h5 class="text-white text-center">${artists[startIndex + 3].artist.name}</h5>
              </a>
            </div>
          </div>
        
      </div>`;
  }

  // SMARTPHONE CAROUSEL
  const carouselArtistsSmarphone = document.getElementById("carouselSmartphone");
  carouselArtistsSmarphone.innerHTML = "";

  // Creiamo 4 slide, ognuna con 2 artisti
  for (let slide = 0; slide < 4; slide++) {
    const isActive2 = slide === 0 ? "active" : "";
    const startIndex2 = slide * 2;
    carouselArtistsSmarphone.innerHTML += `
      <div class="carousel-item ${isActive2}">
        <div class="container-fluid px-4">
          <div class="row justify-content-center gx-3">
            <div class="col-6">
            <a href="./artist.html?_id=${artists[startIndex2].artist.id}">
              <img src="${artists[startIndex2].artist.picture_big}" class="w-100 rounded-circle p-2" alt="${artists[startIndex2].artist.name}" />
              <h5 class="text-white text-center">${artists[startIndex2].artist.name}</h5>
              </a>
            </div>
            <div class="col-6">
            <a href="./artist.html?_id=${artists[startIndex2 + 1].artist.id}">
              <img src="${artists[startIndex2 + 1].artist.picture_big}" class="w-100 rounded-circle p-2" alt="${artists[startIndex2 + 1].artist.name}" />
              <h5 class="text-white text-center">${artists[startIndex2 + 1].artist.name}</h5>
              </a>
            </div>
          </div>
        </div>
      </div>`;
  }
}

myArtist();

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

myArtist();

buttonFunction("playButton");
buttonFunction("playButtonMobile");

const searchForm = document.getElementById("form-ricerca");
const searchInput = document.getElementById("input-ricerca");

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  window.location.href = `search.html?value=${searchInput.value}`;
});

const songTitle = document.getElementById("song-title");
const songArtist1 = document.getElementById("song-artist1");
const songArtist2 = document.getElementById("song-artist2");
const footerImg = document.getElementById("footerImg");

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

function updatePlayButton(button, playing) {
  const icon = playing ? `<i class="bi bi-pause-circle-fill fs-1 mx-2"></i>` : `<i class="bi bi-play-circle-fill fs-1 mx-2"></i>`;
  button.innerHTML = icon;
}
