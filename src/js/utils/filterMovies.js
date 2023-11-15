import { movies } from "../data/movies";
import { categories } from "../data/movie-categories";
import { createMovieElement, createResultElement } from "../exercises/e1-movie";
function showFilteredMovies() {}
let timeOutId;

export async function filterMovies() {
  const moviesCopy = [...movies];

  const selectCategories = document.querySelector("#category");
  const selectSort = document.querySelector("#order");
  const searchMovies = document.querySelector("#search");

  if (timeOutId) {
    clearInterval(timeOutId);
  }

  timeOutId = setTimeout(async () => {
    try {
      // category filter

      const filterByCategory = async (films) => {
        if (
          selectCategories != null &&
          selectCategories.value != "" &&
          Object.keys(categories).includes(selectCategories.value)
        ) {
          let filmsFilter = films.filter(
            (movie) => movie.category.toLowerCase().includes(selectCategories.value.toLowerCase())        
              );
          return filmsFilter;
        } else {
          return films;
        }
      };

      // sort
      const sortFilms = async (films) => {
        if (selectSort != null && selectSort.value != "") {
          switch (selectSort.value) {
            case "title-asc":
              return films.sort((a, b) => a.title.localeCompare(b.title));
              break;

            case "title-desc":
              return films.sort((a, b) => b.title.localeCompare(a.title));
              break;

            case "director-asc":
              return films.sort((a, b) => a.director.localeCompare(b.director));
              break;

            case "director-desc":
              return films.sort((a, b) => b.director.localeCompare(a.director));
              break;

            case "year-asc":
              return films.sort((a, b) => a.year - b.year);
              break;

            case "year-desc":
              return films.sort((a, b) => b.year - a.year);
              break;

            default:
              return films;
              break;
          }
        } else {
          return films;
        }
      };

      const filterBySearch = async (films) => {
        console.log("films");
        console.log("films");
        if (searchMovies != null && searchMovies.value != "") {
          let val = searchMovies.value.toLowerCase();

          let filmsBySearch = films.filter(
            (movie) =>
              movie.title.toLowerCase().includes(val) ||
              movie.director.toLowerCase().includes(val) ||
              movie.actors.toLowerCase().includes(val) 

          );
          console.log("filmsBySearch");
          return filmsBySearch;
        } else {
          return films
        }
      };

      let filter = await filterByCategory(moviesCopy);
      console.log("filter", filter);

      let sortedFilms = await sortFilms(filter);
      console.log("sortedFilmss", sortedFilms);

      let requestedData = await filterBySearch(sortedFilms);
      console.log("requestedData", requestedData);

      showMovieSelection(requestedData);
      // const sortMode = async (films) => {
      //     if (selectSort != null && selectSort.value &&
      //         Object.values().includes(selectSort.value)
      //     ) {
      //         let orderedMovies = films.sort((film) => film.sort = selectSort.value);

      //         return orderedMovies;
      //     } else {

      //         return films;
      //     }
      // }

      // texto
    } catch (error) {}
  }, 800);

  

  function showMovieSelection(mki) {

   let g =  document.querySelector('#result-films') 
    g.style.display = "flex";
    g.textContent = `Se han encontrado ${mki.length} películas que coinciden con tu búsqueda`
    if (document.querySelector(".list-container") !== null) {
      document.querySelector(".list-container").remove();
    } else {
      document.querySelector(".movie-container").remove();
    }

    const movieContainer = document.createElement("div");
    movieContainer.className = "movie-container";

    for (let i = 0; i < mki.length; i++) {
      const movie = mki[i];
      const movieElement = createMovieElement(movie);
      movieContainer.appendChild(movieElement);
    }

    document.querySelector("#root").appendChild(movieContainer);
  }

  showFilteredMovies();
}
