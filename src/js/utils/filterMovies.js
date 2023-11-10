import { movies } from '../data/movies'
import { categories } from '../data/movie-categories'

function showFilteredMovies() {

}

export async function filterMovies() {

    const moviesCopy = [...movies]

    const selectCategories = document.querySelector("#category");
    const selectSort = document.querySelector("#order");
    const searchMovies = document.querySelector("#search");
    
    console.log(selectCategories.value) 
    
    try {

        // filtro por categoria

        const filterByCategory = async (films) => {
            if (selectCategories != null && selectCategories.value != '' &&
                Object.values(categories).includes(selectCategories.value)
            ) {
                let filmsFilter = films.filter((movie) => movie.category === selectCategories.value);

                return filmsFilter;

            } else {


                return films;
            }

        }
        // ordeno por sort

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



    } catch (error) {

    }


    showFilteredMovies()
}