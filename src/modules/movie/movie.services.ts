
import axios from "axios"
import {
  BaseSearchResponse,
  MovieSearch,
  DefaultMoviesParams,
  SearchMoviesParams,
  MovieByID,
  Genre,
} from "../../domain/interfaces"


export const fetchMovieDB = async <
  T = Record<string, unknown>, 
  Params = Record<string, unknown>
>(url: string, params?: Params) => {
  const {status, data} = await axios 
    .get<T>(
      url, 
      {
        params: {
          ...params,
          api_key: process.env.MOVIE_DB_API_KEY
        },
        validateStatus: status => true
      }
    )
  return {status,data}
}

export const fetchPopularMovies = async (params: DefaultMoviesParams ) => {
  try {
    const result =  await fetchMovieDB<BaseSearchResponse<MovieSearch[]>, DefaultMoviesParams>(
      "https://api.themoviedb.org/3/movie/popular",
      params
    )
    return result;
  } catch (error) {
    console.error(error);
  }
}

export const fetchSearchMovies = async (params: SearchMoviesParams) => {
  try {
    const result = await fetchMovieDB<BaseSearchResponse<MovieSearch[]>, SearchMoviesParams>(
      "https://api.themoviedb.org/3/search/movie",
      params
    )
    return result
  } catch (error) {
    console.error(error)
  }
}

export const fetchMovieByID = async (params:{movie_id: number}) => {
  try {
    const {movie_id} = params
    const result = await fetchMovieDB<MovieByID>(`https://api.themoviedb.org/3/movie/${movie_id}` )
    if (result.status !== 200) {
      return {
        status: result.status,
        data: null
      }
    }
    return result
  } catch (error) {
    console.error(error)
  }
}

export const fetchAllGenres = async () => {
  try {
    const result = await fetchMovieDB<{genres:Genre[]}>(`https://api.themoviedb.org/3/genre/movie/list`)
    return result
  } catch (err) {
    console.error(err)
  }

}

export const fetchMoviesByGenre = async (genre: string) => {
  try {  
    let genreID: number;
    if (isNaN(Number(genre)) ) {
      const allGenresResult = await fetchAllGenres()
      const genreMatch = allGenresResult.data?.genres?.find(
        g => g.name.toLowerCase().includes(genre.toLowerCase())
        ) 
      if (!genreMatch) {
        return {
          status: 404,
          data: null
        }
      }
      genreID = genreMatch.id
     
    } else {

      genreID = Number(genre)
    } 
    const result = await fetchMovieDB<BaseSearchResponse<MovieSearch[]>>(
      `https://api.themoviedb.org/3/discover/movie`,
      {
        with_genres: genreID
      }
    )
    return result
  } catch (err) {
  console.error(err)
}
}

