document.getElementById("year").textContent = new Date().getFullYear();

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
      const artistaTarget = document.getElementById("artista-target");
      const braniTarget = document.getElementById("brani-container");
      row.innerHTML = "";

      const primaFotoArtista = songs[0].artist.picture_medium;
      const nomeArtista = songs[0].artist.name;
      console.log("top result", primaFotoArtista);
      console.log("nome artista", nomeArtista);
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

      braniTarget.innerHTML = `
        <h4 class="text-light mb-1 mt-5">Brani</h4>`;
      primiQuattro.forEach((song) => {
        braniTarget.innerHTML += `
        <div class="d-flex align-items-center justify-content-between p-2 rounded">
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
      const primiSei = songs.slice(1, 8);
      const artistiContainer = document.getElementById("artisti-container");

      artistiContainer.innerHTML = `
        <h4 class="text-light my-3">Artisti</h4>`;
      for (let i = 1; i < primiSei.length; i++) {
        console.log("CICLO I", i);
        const fotoartista = songs[i].artist.picture;
        const nomeArtista = songs[i].artist.name;
        const album = songs[i].album.cover;
        const nomeAlbum = songs[i].album.title;
        console.log("FOTO ARTISTA", fotoartista);
        console.log("Album", album);
        // const primaFotoArtista = songs[0].artist.picture;
        // if (fotoartista === primaFotoArtista) {
        //   null;
        // } else {
        artistiContainer.innerHTML += `
           <div class="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2 
                        ${i === 2 ? "d-none d-sm-block" : ""} 
                        ${i === 4 ? "d-none d-lg-block" : ""} 
                        ${i >= 4 ? "d-none d-xl-block" : ""}">
               <img src="${fotoartista}" alt="" style="width: 180px; height: 180px; object-fit: cover" 
                 class="rounded-circle shadow">
               <h6 class="text-light mt-2 mb-0">${nomeArtista}</h6>
               <p class="text-secondary small">Artista</p>
            </div>
       `;
        // }  ===>     ELSE IF SOPRA  -  FILTRO PER NON RIPETERE FOTO ARTISTA     <===
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
        <img src="${album}" alt="" style="width: 180px; height: 180px; object-fit: cover"
                 class="rounded shadow">
               <h6 class="text-light mt-2 mb-0">${nomeAlbum}</h6>
               <p class="text-secondary small">${nomeArtista}</p>
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
console.log("script caricato");
getData("");

// songs.[0].artist.picture
// songs.[0].artist.name

// songs.[0].album.cover
// songs.[0].artist.title-short
// songs.[0].artist.name
