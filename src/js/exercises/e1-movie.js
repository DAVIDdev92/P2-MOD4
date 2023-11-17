// import { movies } from "../data/movies";
import { getMoviePosterUrl } from "../utils/movie-utils";
import { createMovieList } from "../practice/practice1";
import { categories } from "../data/movie-categories";
import { filterMovies } from "../utils/filterMovies";
import { movieLoading } from "../utils/movies-API";
import { showMovie } from "../utils/movie-info";

const movies = await movieLoading();

console.log(movies)
function createSortContainer() {
  const element = document.createElement("div");
  element.className = "sort-container";
  element.appendChild(createTitleSortContainer("title-sort-container"));
  element.appendChild(createSelectAreas("select-areas"));
  element.appendChild(createResultElement(0));

  return element;
}

function createTitleSortContainer() {
  const element = document.createElement("h2");
  element.className = "title-sort-container";
  element.textContent = "Movie Searcher";

  return element;
}

function createSelect(text) {
  const element = document.createElement("select");
  element.id = text;
  element.name = text;

  if (text === "category") {
    let myArray = Object.values(categories);

    const element3 = document.createElement("option");
    element3.setAttribute("disabled", true);
    element3.setAttribute("selected", true);
    element3.value = "";
    element3.textContent = "Select category";
    element.appendChild(element3);

    for (let i = 0; i < myArray.length; i++) {
      const element2 = document.createElement("option");
      element2.value = myArray[i].toLowerCase();
      element2.textContent = myArray[i];
      element.appendChild(element2);
    }

    return element;
  } else if (text === "order") {
    let myArray2 = [
      "Title-Asc",
      "Title-Desc",
      "Director-asc",
      "Director-desc",
      "Year-asc",
      "Year-desc",
    ];
    const element3 = document.createElement("option");
    element3.setAttribute("disabled", true);
    element3.setAttribute("selected", true);
    element3.value = "";
    element3.textContent = "Select order";
    element.appendChild(element3);
    for (let i = 0; i < myArray2.length; i++) {
      const element2 = document.createElement("option");
      element2.value = myArray2[i].toLowerCase();
      element2.textContent = myArray2[i];
      element.appendChild(element2);
    }
    return element;
  }
}

function createSearchElement() {
  const element = document.createElement("search");
  element.className = "search";
  const element2 = document.createElement("input");
  element2.type = "text";
  element2.id = "search";
  element2.name = "search";
  element2.placeholder = "Title,Actor,...";
  element.appendChild(element2);
  return element;
}

function createResetElement() {
  const element = document.createElement("input");
  element.className = "reset";
  element.type = "reset";
  element.id = "reset";
  element.textContent = "Reset";

  return element;
}

function createSelectAreas() {
  const element = document.createElement("form");
  element.className = "select-areas";
  element.appendChild(createSelect("category"));
  element.appendChild(createSelect("order"));
  element.appendChild(createSearchElement());
  element.appendChild(createResetElement("reset"));
  return element;
}

function createNavElement() {
  const element = document.createElement("nav");
  element.appendChild(createUlElement());

  return element;
}

function createUlElement() {
  const element = document.createElement("ul");
  element.appendChild(createLiElement("grid"));
  element.appendChild(createLiElement("list"));
  return element;
}

function createLiElement(txt) {
  const element = document.createElement("li");
  element.appendChild(createButtonElement(txt));

  return element;
}

function createButtonElement(content) {
  const element = document.createElement("button");
  element.className = "button";
  element.id = content;
  let a = content.charAt(0).toUpperCase() + content.slice(1);
  element.textContent = a;

  return element;
}

export function createResultElement(totalFilms) {
  const element = document.createElement("p");
  element.style.display = "none";
  element.id = "result-films";
  element.textContent = ``;

  return element;
}

document.querySelector("#root").appendChild(createSortContainer());

document.querySelector("#category").addEventListener("input", filterMovies);
document.querySelector("#order").addEventListener("input", filterMovies);
document.querySelector("#search").addEventListener("input", filterMovies);
document.querySelector("#reset").addEventListener("click", showGrid);

document.querySelector("#root").appendChild(createNavElement());

document.querySelector("#grid").addEventListener("click", showGrid);
document.querySelector("#list").addEventListener("click", showList);

function createPosterElement(path) {
  const moviePosterWidth = 400;
  const element = document.createElement("img");
  element.src = getMoviePosterUrl(path, moviePosterWidth);
  element.className = "movie-poster";
  return element;
}

function createTitleElement(title) {
  const element = document.createElement("div");
  element.className = "movie-title";
  element.textContent = title;
  return element;
}

function createDataElement(rating, year) {
  const element = document.createElement("div");
  element.className = "movie-data";
  element.textContent = `Rating: ${rating} | ${year}`;
  return element;
}

function createDescriptionElement(description) {
  const element = document.createElement("p");
  element.className = "movie-description";
  element.textContent = description;
  return element;
}

function createDirectorElement(director) {
  const element = document.createElement("p");
  element.className = "movie-director";
  element.textContent = director;
  return element;
}

function createCategoryElement(category) {
  const element = document.createElement("p");
  element.className = "movie-category";
  element.textContent = category;
  return element;
}

// TO BE COMPLETED (Add description, director, etc.)
export function createMovieElement(movieObj, ox) {
  const movieElement = document.createElement("div");
  movieElement.className = "movie";
  movieElement.id = ox;
  movieElement.appendChild(createPosterElement(movieObj.poster));
  movieElement.appendChild(createTitleElement(movieObj.title));
  movieElement.appendChild(createDataElement(movieObj.rating, movieObj.year));
  movieElement.appendChild(createDescriptionElement(movieObj.description));
  movieElement.appendChild(createDirectorElement(movieObj.director));
  movieElement.appendChild(createCategoryElement(movieObj.category));
  return movieElement;
}

const movieContainer = document.createElement("div");
movieContainer.className = "movie-container";
movieContainer.addEventListener('click', showMovie)

for (let i = 0; i < movies.length; i++) {
  const movie = movies[i];
  const movieElement = createMovieElement(movie, i);
  movieContainer.appendChild(movieElement);
}

document.querySelector("#root").appendChild(movieContainer);

function showGrid() {
  let g = document.querySelector("#result-films");
  g.style.display = "none";
  g.textContent = ``;
  if (document.querySelector(".list-container") !== null) {
    document.querySelector(".list-container").remove();
  } else {
    document.querySelector(".movie-container").remove();
  }

  const movieContainer = document.createElement("div");
  movieContainer.className = "movie-container";
  movieContainer.addEventListener('click', showMovie)

  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    const movieElement = createMovieElement(movie, i);
    movieContainer.appendChild(movieElement);
  }

  document.querySelector("#root").appendChild(movieContainer);
}

function showList() {
  if (document.querySelector(".movie-container") !== null) {
    document.querySelector(".movie-container").remove();
  } else {
    document.querySelector(".list-container").remove();
  }

  document.querySelector("#root").appendChild(createMovieList());
}

