// Movie Array Data
const movies = [
  { title: "Solo leveling", img: "solo-leveling-ep", episode: "15" },
  { title: "Gachiakuta", img: "Gachiakuta-ep", episode: "4" },
  { title: "Demon Slayer", img: "demon-slayer-ep", episode: "13" },

  { title: "Attack on Titan", img: "attack-on-titan-ep", episode: "22" },
  { title: "Black Clover", img: "black-clover-ep", episode: "6" },
  { title: "Blue Lock", img: "blue-lock-ep", episode: "13" },

  { title: "Dragon Raja", img: "dragon-raja-ep", episode: "2" },
  { title: "Fire Force", img: "fire-force-ep", episode: "13" },
  { title: "Haikyu", img: "haikyu-karasuno-high-ep", episode: "15" },

  { title: "Hunter X Hunter", img: "hunter-x-hunter-ep", episode: "67" },
  { title: "Jujustu Kaisen", img: "jujustu-kaisen-ep", episode: "7" },
  { title: "Kaiju No.8", img: "kaiju-no8-ep", episode: "8" },

  { title: "Kurokuno Basket", img: "kurokuno-ep", episode: "13" },
  { title: "Mashle ", img: "mashle-ep", episode: "18" },
  {
    title: "Mission Yozakura Family",
    img: "Mission-Yozakura-Family-ep",
    episode: "18",
  },

  { title: "Mob Psycho", img: "mob-psycho-ep", episode: "10" },
  { title: "My Hero Academia", img: "my-hero-academia-ep", episode: "65" },
  { title: "One Piece", img: "one-piece-ep", episode: "456" },

  { title: "Sakamoto Days", img: "sakamoto-days-ep", episode: "5" },
  { title: "Spy X Family", img: "spy-x-family-ep", episode: "10" },
  { title: "Tokyo Ghoul", img: "tokyo-ghoul-ep", episode: "19" },

  { title: "Tougen Anki", img: "tougen-anki-ep", episode: "5" },
  { title: "Vinland Saga", img: "vinland-saga-ep", episode: "20" },
  { title: "Wind Breaker", img: "windbreaker-ep", episode: "13" },
];

// ADDED — store current array being displayed
let movieArray = movies;

// get elements
const movieContainer = document.querySelector(".container");
const menu_icon = document.querySelector("#menu_icon");
const menu = document.querySelector("#menu");
const toFirst = document.querySelector(".to-first");
const toLast = document.querySelector(".to-last");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const currentPage = document.querySelector(".current-page");
// const formSearch = document.querySelector("#form-search");

// formSearch.addEventListener("click", () => {
//   formSearch.classList.add("border-red-100");
// });

// Create movie elements on DOMContentLoaded
window.addEventListener("DOMContentLoaded", () => {
  renderMovies(getPage(movies, page)); // Show first 12 only
  currentPage.textContent = page + 1;
});

function renderMovies(arr) {
  // currentPage.innerHTML = `${page + 1}`;
  movieContainer.innerHTML = ""; // clear old movies
  movieArray = arr;
  createMovieElements(); // rebuild with sliced data
}

function getPage(arr, page, size = 12) {
  const start = page * size;
  return arr.slice(start, start + size);
}

let page = 0; // start at page 0
let totalPages = Math.ceil(movies.length / 12) - 1;

toFirst.addEventListener("click", () => {
  page = 0;
  renderMovies(getPage(movies, page));
  currentPage.textContent = page + 1;
});

toLast.addEventListener("click", () => {
  page = totalPages;
  renderMovies(getPage(movies, page));
  currentPage.textContent = page + 1;
});

prevBtn.addEventListener("click", () => {
  if (page > 0) {
    page--;
    renderMovies(getPage(movies, page));
    currentPage.textContent = page + 1;
  }
});

nextBtn.addEventListener("click", () => {
  if (page < totalPages) {
    page++;
    renderMovies(getPage(movies, page));
    currentPage.textContent = page + 1;
  }
});

// Function to create movie elements
function createMovieElements() {
  movieArray.forEach((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("relative", "content");
    movieDiv.innerHTML = ` <a href="">
    <img src="img_1/${movie.img + movie.episode}.jpg" alt="${
      movie.img + movie.episode
    }" class="image" />
  </a>

  <div class="title">${movie.title}</div>
  <div class="episode">${movie.episode}</div>
  <div
    class="overlay absolute top-0 left-0 w-full h-full hidden justify-center items-center bg-transparent"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      class="size-30 fill-white/80"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
      />
    </svg>
  </div>`;
    movieContainer.appendChild(movieDiv);
  });
  // Overlay animation and image zoom for content divs
  const contentDivs = document.querySelectorAll(".content");
  contentDivs.forEach((div) => {
    const overlay = div.querySelector(".overlay");
    const image = div.querySelector(".image");

    div.addEventListener("mouseover", () => {
      console.log("hovered");
      overlay.classList.replace("hidden", "flex");

      if (overlay.classList.contains("animate-out")) {
        overlay.classList.replace("animate-out", "animate-in");
      } else {
        overlay.classList.add("animate-in");
      }
      if (image.classList.contains("zoom-out")) {
        image.classList.replace("zoom-out", "zoom-in");
      } else {
        image.classList.add("zoom-in");
      }
    });

    div.addEventListener("mouseout", () => {
      overlay.classList.replace("animate-in", "animate-out");
      image.classList.replace("zoom-in", "zoom-out");
    });

    overlay.addEventListener("animationend", (e) => {
      if (e.animationName === "fadeOutDown") {
        overlay.classList.replace("flex", "hidden");
      }
    });
  });
}

currentPage.textContent = `${page + 1}`;

// Menu toggle functionality
menu_icon.addEventListener("click", () => {
  if (menu.classList.contains("hidden")) {
    menu.classList.remove("hidden");
  } else {
    menu.classList.add("hidden");
  }
});

// close Announcement Banner

const cancel = document.querySelector("#cancel");
const announcement = document.querySelector("#announcement");

cancel.addEventListener("click", () => {
  if (announcement.classList.contains("hidden")) {
    announcement.classList.remove("hidden");
  } else {
    announcement.classList.add("hidden");
  }
});
