const APILINK = '';
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "";

const moviesContainer = document.getElementById("section");
const searchForm = document.getElementById("form");
const searchInput = document.getElementById("query");

returnMovies(APILINK);

function returnMovies(url) {
  fetch(url).then(res => res.json())
    .then(function(data) {
      console.log(data.results);
      data.results.forEach(movieData => {
        const movieCard = document.createElement('div');
        movieCard.setAttribute('class', 'card');

        const rowContainer = document.createElement('div');
        rowContainer.setAttribute('class', 'row');

        const columnContainer = document.createElement('div');
        columnContainer.setAttribute('class', 'column');

        const posterImage = document.createElement('img');
        posterImage.setAttribute('class', 'thumbnail');
        posterImage.setAttribute('id', 'image');

        const movieTitle = document.createElement('h3');
        movieTitle.setAttribute('id', 'title');

        const imageContainer = document.createElement('center');

        movieTitle.innerHTML = `${movieData.title}<br><a href="movie.html?id=${movieData.id}&title=${movieData.title}">reviews</a>`;
        posterImage.src = IMG_PATH + movieData.poster_path;

        imageContainer.appendChild(posterImage);
        movieCard.appendChild(imageContainer);
        movieCard.appendChild(movieTitle);
        columnContainer.appendChild(movieCard);
        rowContainer.appendChild(columnContainer);

        moviesContainer.appendChild(rowContainer);
      });
    });
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  moviesContainer.innerHTML = '';

  const searchItem = searchInput.value;

  if (searchItem) {
    returnMovies(SEARCHAPI + searchItem);
    searchInput.value = "";
  }
});
