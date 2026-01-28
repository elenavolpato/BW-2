//when integrated with home page use this to replace the artist ID
/* const url = location.search;
const allTheParameters = new URLSearchParams(url);
const artistID = allTheParameters.get("id"); */

const artistID = "126";

const artistURL = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistID}`;
let numberOfSongs = 5;

const renderArtistInfo = () => {
  const artistName = document.querySelectorAll(".artist-name");
  const hero = document.getElementById("hero");
  const likedBandImg = document.getElementById("band-you-liked-img");
  const numberOfListeners = document.getElementById("number-listeners");

  fetch(artistURL)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error in retrieving data");
      }
    })
    .then((data) => {
      console.log("artistdata", data);
      artistName.forEach((element) => (element.innerText = data.name));
      hero.style.backgroundImage = `url(${data.picture_xl})`;
      likedBandImg.src = data.picture_medium;
      likedBandImg.alt = `${data.name} picture`;
      numberOfListeners.innerText = `${data.nb_fan.toLocaleString("de-DE")} ascoltatori mensile`;
    })
    .catch((err) => {
      console.error("error", err);
    });
};

const renderSongList = () => {
  fetch(artistURL + `/top?limit=${numberOfSongs}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error in retrieving data");
      }
    })
    .then((data) => {
      //console.log("data", data);
      const mostPlayedSongs = document.getElementById("most-played-songs");

      //converts seconds into minutes and seconds
      const songDuration = (seconds) => {
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);

        return `${mins}:${secs.toString().padStart(2, "0")}`;
      };

      const songsHTML = data.data
        .map(
          (item) => `
          <div class="row song-list my-2 align-items-center">
            <p class="col-1 text-white-50 text-end mb-0"> ${data.data.indexOf(item) + 1}</p>
            <img 
                class="col-auto" 
                src="${item.album.cover}" 
                alt="Album ${item.album.title} cover"/>
            <p class="col fw-bold mb-0">${item.title}</p>
            <p class="col-2 text-end text-white-50 mb-0">${item.rank.toLocaleString("de-DE")}</p>
            <p class="col-1 text-white-50 mb-0">${songDuration(item.duration)}</p>
          </div>
            `,
        )
        .join("");

      mostPlayedSongs.innerHTML =
        songsHTML + (numberOfSongs <= 5 ? `<button class="btn text-white-50 my-3  fw-bold text-start" id="see-more">VISUALIZA ALTRO</button>` : "");

      const seeMoreBtn = document.getElementById("see-more");
      seeMoreBtn.addEventListener("click", () => {
        numberOfSongs = 15;
        renderSongList();
      });
    })

    .catch((err) => {
      console.error("error", err);
    });
};
renderSongList();

renderArtistInfo();

const followBtn = document.getElementById("follow-btn");

followBtn.addEventListener("click", () => {
  followBtn.innerText = followBtn.innerText === "FOLLOWING" ? "FOLLOW" : "FOLLOWING";
});
