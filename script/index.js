// creazione fetch per gli artisti sul modale
const btnNext = document.getElementById("btnNext");
const keyWords = [];

const getArtists = function () {
  fetch(" https://striveschool-api.herokuapp.com/api/deezer/search?q=artist")
    .then((Response) => {
      console.log("RESPONSE", Response);
      if (Response.ok) {
        return Response.json();
      } else {
        throw new Error("la response ha un problema");
      }
    })
    .then((data) => {
      console.log("EVENTI RICEVUTI", data);

      const row = document.getElementById("cardCheck");
      row.innerHTML = "";

      for (let i = 0; i < Math.min(data.data.length, 9); i++) {
        row.innerHTML += `<div class= "col-4 mt-2 mb-4"> 
        <input type="checkbox" class="btn-check" value="${data.data[i].artist.id}" id="btn-check-${i}" autocomplete="off" />
                    <label class="btn" for="btn-check-${i}"
                      ><img src="${data.data[i].artist.picture_medium}" class="card-img-top card-img-top rounded-circle p-3" alt="${data.data[i].title_short}" />${data.data[i].artist.name}</label
                    > </div>`;
      }
      const checkBox = document.querySelectorAll(".btn-check");
      console.log(checkBox);
      Array.from(checkBox)
        .forEach((button) => {
          button.addEventListener("click", () => {
            if (button.checked) {
              const valueModalCard = button.value;
              keyWords.push(valueModalCard);
              localStorage.setItem("selectedArtists", JSON.stringify(keyWords));
            }
            btnNext.addEventListener("click", () => {
              if (keyWords.length === 0) {
                localStorage.setItem("randomMode", "true");
              }
            });
          });
        })
        .catch((Error) => {
          console.log("ERRORE NELLA FETCH", Error);
        });
    });
};

// 1.apparizione del modale all'apertura dello schermo

const myModal = new bootstrap.Modal(document.getElementById("loginModal"), {
  keyboard: false,
  backdrop: "static",
});

window.addEventListener("DOMContentLoaded", (event) => {
  console.log("page is fully loaded");
  myModal.show();
});

// 2. se non viene copilato l'username non può andare avanti

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
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        const userName = document.getElementById("userName").value;
        localStorage.setItem("username", userName);
        event.preventDefault();
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

// 3. prendo la proprietà di username da inserire nei template literals

btnNext.addEventListener("submit", (event) => {
  event.preventDefault();
  myModal2.hide();
  modalElement.addEventListener("hidden.bs.modal", () => {
    window.location.href = "index.html";
  });
  {
    once: true;
  }
});

//nella home page

// 4. metto i check in un array
/*const keyWords = [];
const checkBox = document.querySelectorAll(".btn-check");
console.log(checkBox);

Array.from(checkBox).forEach((button) => {
  button.addEventListener("click", () => {
    if (button.checked) {
      e;
      const valueModalCard = document.getElementById("btn-check-${i}").value;
      keyWords.push(valueModalCard);
      localStorage.setItem("selectedGenres", JSON.stringify(keyWords));
    } else if (keyWords.length === 0) {
      localStorage.setItem("randomMode", "true");
    }
  });
});*/

console.log(keyWords);

/*const btnNext = document.querySelectorAll("#loginModal2 .btn");
console.log(btnNext);
const keyWords = [];

function validate() {
  //btnNext.addEventListener("click", () => {
  if (btnNext.checked) {
    btnNext.push(keyWords);
    console.log(keyWords);
    localStorage.setItem("query di ricerca", keyWords);
  } else {
  }
}*/

/*const userName = document.getElementsByTagName(aria - label);
console.log(aria - label);*/

// 3. non appare più una volta completato

//5. chiusura primo modale

/*const myModal2 = new bootstrap.Modal(document.getElementById("loginModal2"), {
  backdrop: "static",
});
const btnNext = document.getElementById("btnNext");*/

4; /*btnNext.addEventListener("click", (event) => {
  myModal.hide();
});*/

/*const buttonClicked = document.getElementById("buttonLogin");
buttonClicked.addEventListener("clicked", () => {
  loginModal.style.display = "none";
});*/

//variabili

//valori di ricerca
/*const customMusic = function (value) {
  const keywordsSearch = document.getElementsByClass("form-check-input").value;
  const checked = true;

  if (checked === true) {
    return keywordsSearch.push(keyWords);
    console.log(keyWords);
    console.log(customMusic);
  }
};*/

//personalizzazione delle card subito disponibili

//scritte personalizzate in base all'orario
/*const myDayTime = new Date();
let text = document.getElementById("greeting");
text = "";
if (myDayTime.getHours() < 12) {
  document.getElementById("greeting").innerHtml = "Buongiorno ${userName}";
} else if (myDate.getHours() >= 12 && myDate.getHours() <= 17) {
  document.getElementById("greeting").innerHTML = "Good Afternoon, ${userName}!";
} else if (myDate.getHours() > 17 && myDate.getHours() <= 24) {
  document.getElementById("greeting").innerHTML = "Good Evening! ${userName}";
} else {
  document.getElementById("greeting").innerHTML = "I'm not sure what time it is!";
}*/

//personalizzazione della musica in base a qualche criterio
