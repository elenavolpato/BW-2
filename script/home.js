// creazione fetch per gli artisti sul modale
const btnNext = document.getElementById("btnNext");
let keyWords = []; // Usiamo let per poterlo gestire meglio

const getArtists = function () {
  fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=artist")
    .then((Response) => {
      if (Response.ok) return Response.json();
      throw new Error("la response ha un problema");
    })
    .then((data) => {
      const row = document.getElementById("cardCheck");
      row.innerHTML = ""; // Puliamo per evitare duplicati

      for (let i = 0; i < Math.min(data.data.length, 9); i++) {
        row.innerHTML += `
          <div class="col-4 mt-2 mb-4"> 
            <input type="checkbox" class="btn-check" value="${data.data[i].artist.id}" id="btn-check-${i}" autocomplete="off" />
            <label class="btn" for="btn-check-${i}">
              <img src="${data.data[i].artist.picture_medium}" class="card-img-top rounded-circle p-3" />
              <span class="text-white small">${data.data[i].artist.name}</span>
            </label>
          </div>`;
      }

      // NOTA: Abbiamo tolto i listener dai singoli checkbox e dal btnNext qui dentro
      // perché li gestiremo globalmente in modo più pulito.
    })
    .catch((Error) => console.log("ERRORE NELLA FETCH", Error));
};

// 1. Apparizione modale (Il tuo codice originale)
const myModal = new bootstrap.Modal(document.getElementById("loginModal"), {
  keyboard: false,
  backdrop: "static",
});

window.addEventListener("DOMContentLoaded", () => {
  myModal.show();
});

// 2. Validazione Username (Il tuo codice originale)
const modalElement = document.getElementById("loginModal");
const myModal2 = new bootstrap.Modal(document.getElementById("loginModal2"), {
  keyboard: false,
  backdrop: "static",
});

const forms = document.querySelectorAll(".needs-validation");
Array.from(forms).forEach((form) => {
  form.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        event.stopPropagation();
      } else {
        const userName = document.getElementById("userName").value;
        localStorage.setItem("username", userName);
        myModal.hide();
        modalElement.addEventListener(
          "hidden.bs.modal",
          () => {
            getArtists();
            myModal2.show();
          },
          { once: true },
        );
      }
      form.classList.add("was-validated");
    },
    false,
  );
});

// 3. SISTEMAZIONE SUBMIT (Il pezzo mancante)
// Usiamo il click sul bottone e raccogliamo i dati alla fine
btnNext.addEventListener("click", (event) => {
  event.preventDefault();

  // Troviamo tutti i checkbox che l'utente ha spuntato al momento del click
  const checkedBoxes = document.querySelectorAll(".btn-check:checked");
  keyWords = Array.from(checkedBoxes).map((cb) => cb.value);

  if (keyWords.length === 0) {
    localStorage.setItem("randomMode", "true");
  } else {
    localStorage.setItem("selectedArtists", JSON.stringify(keyWords));
    localStorage.removeItem("randomMode"); // Puliamo il random se ci sono scelte
  }

  // Chiudiamo il modale e cambiamo pagina
  myModal2.hide();
  document.getElementById("loginModal2").addEventListener(
    "hidden.bs.modal",
    () => {
      window.location.href = "home.html"; // Ti consiglio home.html per non tornare al login
    },
    { once: true },
  );
});
