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
      const row = document.getElementById("row");
      row.innerHTML = "";

      for (let i = 0; i < songs.length; i++) {
        const fotoUrl = songs[i].album.cover_big;
        console.log("url foto", fotoUrl);

        row.innerHTML += `
          <div class="col-6 col-md-4 col-lg-3">
            <div class="ratio ratio-4x3 mb-3 shadow-lg">
              <img 
                src="${fotoUrl}" 
                class="img-fluid rounded object-fit-cover"
                style="object-position: top;"
                alt="cover"
              >
            </div>
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
