import { movies } from "../data/movies";
import { getMoviePosterUrl } from "../utils/movie-utils";
import { createMovieList } from "../practice/practice1";



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
function createMovieElement(movieObj) {
  const movieElement = document.createElement("div");
  movieElement.className = "movie";
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

for (let i = 0; i < movies.length; i++) {
  const movie = movies[i];
  const movieElement = createMovieElement(movie);
  movieContainer.appendChild(movieElement);
}

document.querySelector("#root").appendChild(movieContainer);

function showGrid() {
    if (document.querySelector(".list-container") !== null) {
        document.querySelector(".list-container").remove();
      }else {
        document.querySelector(".movie-container").remove();
      }
  

  const movieContainer = document.createElement("div");
  movieContainer.className = "movie-container";

  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    const movieElement = createMovieElement(movie);
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
