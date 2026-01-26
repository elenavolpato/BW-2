const artistURL = "https://striveschool-api.herokuapp.com/api/deezer/artist/666";

let numberOfSongs = 5;

const renderArtistInfo = () => {
  const artistName = document.querySelectorAll(".artist-name");
  const hero = document.getElementById("hero");
  const likedBandImg = document.getElementById("band-you-liked-img");

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
      likedBandImg.src = "https://cdn-images.dzcdn.net/images/artist/ace1cac32e6c087bdf6498189968e091/120x120-000000-80-0-0.jpg";
      likedBandImg.alt = `${data.name} picture`;
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
          <div class=" row song-list py-2 align-items-center">
            <p class="col-1"> ${data.data.indexOf(item) + 1}</p>
            <img 
                class="col-auto" 
                src="${item.album.cover}" 
                alt="Album ${item.album.title} cover"/>
            <p class="col">${item.title}</p>
            <p class="col-2">${item.rank.toLocaleString("de-DE")}</p>
            <p class="col-1">${songDuration(item.duration)}</p>
          </div>
            `,
        )
        .join("");

      mostPlayedSongs.innerHTML =
        songsHTML + (numberOfSongs <= 5 ? `<button class="btn text-white-50 my-3 w-25 fw-bold" id="see-more">VISUALIZA ALTRO</button>` : "");

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
