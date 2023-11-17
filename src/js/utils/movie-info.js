import { movies } from "../data/movies";

export function showMovie(e) {
const padre = e.target.parentNode.id;
console.log(padre.id)

let film = movies[padre]
console.log(film)
}