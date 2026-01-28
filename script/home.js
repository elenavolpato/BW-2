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

      const randomAlbums = data.data.sort(() => Math.random() - 0.5).slice(0, 6);
      for (let i = 0; i < randomAlbums.length; i++) {
        const isActive = i === 0 ? "active" : "";
        crdAlbum.innerHTML += `
                 <div class="carousel-item ${isActive}">
            <div class="row align-items-center">
              <div class="col-4">
                <img src="${randomAlbums[i].album.cover_big}" class="d-block w-100 shadow" alt="${randomAlbums[i].album.title}" />
              </div>
              <div class="col-8 text-start text-white">
                <p class="small mb-1">ALBUM</p>
                <div class="d-flex mb-3">
                  <div class="ms-auto p-2 opacity-50 small">NASCONDI ANNUNCI</div>
                </div>
                <h1 class="display-4 fw-bold">${randomAlbums[i].album.title}</h1>
                <p class="fs-5">${randomAlbums[i].artist.name}</p>
                <p>Ascolta il nuovo album di ${randomAlbums[i].artist.name}!</p>
               
                <div class="d-flex gap-2 mt-4 mb-2">
                  <button type="button" class="btn btn-success rounded-pill px-4 py-2 fw-bold text-black">Play</button>
                  <button type="button" class="btn btn-outline-light rounded-pill px-4 py-2 fw-bold">Salva</button>
                  <button type="button" class="btn text-white"><i class="bi bi-three-dots"></i></button>
                </div>
              </div>
            </div>
          </div>`;
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

const myArtist = function () {
  const keyWords = JSON.parse(localStorage.getItem("selectedGenres"));

  if (keyWords && keyWords.length > 0) {
    const fetchPromises = [];

    for (let i = 0; i < keyWords.length; i++) {
      const singolaFetch = fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${keyWords[i]}`).then((response) => {
        if (response.ok) return response.json();
        throw new Error("Errore nella response");
      });
      fetchPromises.push(singolaFetch);
    }

    Promise.all(fetchPromises)
      .then((tuttiIRisultati) => {
        console.log("TUTTI I RISULTATI:", tuttiIRisultati);
        const tuttiGliArtisti = [];
        for (let i = 0; i < tuttiIRisultati.length; i++) {
          const artistiDiQuestaRicerca = tuttiIRisultati[i].data;

          for (let j = 0; j < artistiDiQuestaRicerca.length; j++) {
            tuttiGliArtisti.push(artistiDiQuestaRicerca[j]);
          }
          console.log("TUTTI GLI ARTISTI COMBINATI:", tuttiGliArtisti);
        }

        const randomArtists = tuttiGliArtisti.sort(() => Math.random() - 0.5).slice(0, 4);
        console.log("RANDOM ARTISTS (4):", randomArtists);
        const carouselArtists = document.getElementById("carouselDesktop");
        console.log("ELEMENTO CAROUSEL:", carouselArtists);
        carouselArtists.innerHTML = "";

        for (let i = 0; i < randomArtists.length; i++) {
          const isActive = i === 0 ? "active" : "";
          carouselArtists.innerHTML += `<div class="carousel-item ${isActive}">
                        <div class="row gx-2 flex-nowrap">
                          <div class="col-md-3 g-2">
                            <img src="${randomArtists[0].artist.picture_big}" class="w-100 card-img-top rounded-circle p-3" />
                            <h5 class="text-white text-center">${randomArtists[0].artist.name}</h5>
                          </div>
                          <div class="col-md-3 g-2">
                            <img src="${randomArtists[1].artist.picture_big}" class="w-100 card-img-top rounded-circle p-3" />
                            <h5 class="text-white text-center">${randomArtists[1].artist.name}</h5>
                          </div>
                          <div class="col-md-3 g-2">
                            <img src="${randomArtists[2].artist.picture_big}" class="w-100 card-img-top rounded-circle p-3" />
                            <h5 class="text-white text-center">${randomArtists[2].artist.name}</h5>
                          </div>
                          <div class="col-md-3 g-2">
                            <img src="${randomArtists[3].artist.picture_big}" class="w-100 card-img-top rounded-circle p-3" />
                            <h5 class="text-white text-center">${randomArtists[3].artist.name}</h5>
                          </div>
                        </div>
                      </div>`;
        }
      })
      .catch((errore) => console.log("ERRORE", errore));
  } else {
    fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=artist")
      .then((Response) => {
        if (Response.ok) return Response.json();
        throw new Error("la response ha un problema");
      })
      .then((data) => {
        const carouselArtists = document.getElementById("carouselDesktop");
        carouselArtists.innerHTML = ""; // Puliamo per evitare duplicati

        const randomArtists = data.data.sort(() => Math.random() - 0.5).slice(0, 8);
        for (let i = 0; i < randomArtists.length; i++) {
          const isActive = i === 0 ? "active" : "";
          carouselArtists.innerHTML += `<div class="carousel-item ${isActive}">
                        <div class="row gx-2 flex-nowrap">
                          <div class="col-md-3 g-2">
                            <img src="${randomArtists[i].artist.picture_big}" class="w-100 card-img-top rounded-circle p-3" />
                            <h5 class="text-white text-center">${randomArtists[i].artist.name}</h5>
                          </div>
                          <div class="col-md-3 g-2">
                            <img src="${randomArtists[i].artist.picture_big}" class="w-100 card-img-top rounded-circle p-3" />
                            <h5 class="text-white text-center">${randomArtists[i].artist.name}</h5>
                          </div>
                          <div class="col-md-3 g-2">
                            <img src="${randomArtists[i].artist.picture_big}" class="w-100 card-img-top rounded-circle p-3" />
                            <h5 class="text-white text-center">${randomArtists[i].artist.name}</h5>
                          </div>
                          <div class="col-md-3 g-2">
                            <img src="${randomArtists[i].artist.picture_big}" class="w-100 card-img-top rounded-circle p-3" />
                            <h5 class="text-white text-center">${randomArtists[i].artist.name}</h5>
                          </div>
                        </div>
                      </div>`;
        }
      })
      .catch((Error) => console.log("ERRORE NELLA FETCH", Error));
  }
};

myArtist();
