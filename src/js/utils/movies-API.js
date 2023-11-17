const rankingOptions = Object.freeze({
  popular: "popular",
  nowPlaying: "now_playing",
  topRated: "top_rated",
  upcoming: "upcoming"
})


export const movieLoading = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${rankingOptions.popular}?api_key=6b7adafe3ad39cf437ff53850b99871a&language=en-EN`
    );

    if (response.status === 200) {
      const json = await response.json();

      const movies = await json.results;
      

      const arrayMoviesPromises = movies.map(async (film) => {
        let idMovie = film.id;

        let detailsInfoNeed = await getMovieDetails(idMovie);
        let crewCast = await getMovieCredits(idMovie);
        let recommendations = await getMovieRecommendations(idMovie);
      
        function director() {
          return crewCast.crew.find(a=> a.department == "Directing").name
        } 

        return {
          id: film.id,
          poster: film.poster_path,
          title: film.title,
          director: director(),
          actors: film.actors,
          year: film.release_date.split("-")[0],
          description: film.overview,
          category: film.category,
          rating: film.vote_average.toFixed(2),
          genres: detailsInfoNeed,
          crew: crewCast.crew,
          cast: crewCast.cast,
          recommendations: recommendations.results.map((recom) => ({
            id: recom.id,
            poster: recom.poster_path,
            title: recom.title,
            director: recom.director,
            actors: recom.actors,
            year: recom.release_date.split("-")[0],
            description: recom.overview,
            category: recom.category,
            rating: recom.vote_average.toFixed(2),
          })),
        };
      });

      const arrayMovies = await Promise.all(arrayMoviesPromises);
      

      return arrayMovies;
    } else if (response.status === 404) {
      throw Error("This movie doens't exist");
    } else if (response.status === 401) {
      throw Error("Authentication failure");
    } else {
      throw Error("Unknown error");
    }
  } catch (Error) {
    
  }
};

async function getMovieDetails(idMovie) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${idMovie}?api_key=6b7adafe3ad39cf437ff53850b99871a&language=en-EN`
    );
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const json = await response.json();

    return json.genres;
  } catch (error) {
    
  }
}

async function getMovieCredits(idMovie) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${idMovie}/credits?api_key=6b7adafe3ad39cf437ff53850b99871a&language=en-EN`
    );
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const json = await response.json();

    return json;
  } catch (error) {
    
  }
}

async function getMovieRecommendations(idMovie) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${idMovie}/recommendations?api_key=6b7adafe3ad39cf437ff53850b99871a&language=en-EN&page=1`
    );
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const json = await response.json();
    
    return json;
  } catch (error) {
    
  }
}
