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
const userName = localStorage.getItem("username");

// 3. accedere alla home una volta cliccato il tasto avanti

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

const keyWords = [];

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
const myDayTime = new Date();
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
}

//personalizzazione della musica in base a qualche criterio
