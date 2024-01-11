const globalState = {
    currentPage: window.location.pathname,
};


// highlight active link
function highlightActiveLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link) => {
        if (link.getAttribute('href') === globalState.currentPage) {
            link.classList.add('active');
        }
    });
}

// show and hide spinner 
function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
}
function hideSpinner() {
    document.querySelector('.spinner').classList.remove('show');
}





// get popular movies
// whenever we need to get data from the API we'll call this funtion and we'll pass in the endpoint
async function displayPopularMovies() {
    // use destructuring {} to get just the results array from that object
    const { results } = await fetchAPIData('movie/popular');
    console.log(results);

    results.forEach(movie => {
        const movieCardDiv = document.createElement('div');
        movieCardDiv.classList.add('card');
        movieCardDiv.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
            ${
                movie.poster_path
                ? `<img
                    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                    class="card-img-top"
                    alt="${movie.title}"
                    />` 
                : `<img
                    src="../images/no-image.jpg"
                    class="card-img-top"
                    alt="${movie.title}"
                    />` 
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>`;

          document.querySelector('#popular-movies').appendChild(movieCardDiv)
    })
}

// display 20 most popular tv shows
async function displayPopularShows() {
    // use destructuring {} to get just the results array from that object
    const { results } = await fetchAPIData('tv/popular');
    console.log(results);

    results.forEach(tvShow => {
        const tvShowCardDiv = document.createElement('div');
        tvShowCardDiv.classList.add('card');
        tvShowCardDiv.innerHTML = `
          <a href="tv-details.html?id=${tvShow.id}">
            ${
                tvShow.poster_path
                ? `<img
                    src="https://image.tmdb.org/t/p/w500${tvShow.poster_path}"
                    class="card-img-top"
                    alt="${tvShow.name}"
                    />` 
                : `<img
                    src="../images/no-image.jpg"
                    class="card-img-top"
                    alt="${tvShow.name}"
                    />` 
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${tvShow.name}</h5>
            <p class="card-text">
              <small class="text-muted">Air Date: ${tvShow.first_air_date}</small>
            </p>
          </div>`;

          document.querySelector('#popular-shows').appendChild(tvShowCardDiv)
    })
}




// fetch data from TMDB api
async function fetchAPIData(endpoint) {
    const API_KEY = '1617f0df048cb9b08554249b0a6cedbe';
    const API_URL = 'https://api.themoviedb.org/3/';

    showSpinner();

    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);

    const data = await response.json();

    hideSpinner();

    return data;
}




// Below is a router, so wherever we want to run a function in response to a certain page, we'll put it inside that corresponding case

// Init app
function init() {
    switch(globalState.currentPage) {
        case '/':
        case '/index.html':
            displayPopularMovies();
            break;
        case '/shows.html':
            displayPopularShows();
            break;
        case '/movie-details.html':
            console.log('Movie Details');
            break;
        case '/tv-details.html':
            console.log('TV Details');
            break;
        case '/search.html':
            console.log('Search');
            break;
    }

    highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);