
import axios from "axios"
import {BaseSearchResponse, MovieSearch, DefaultMoviesParams, SearchMoviesParams} from "../../domain/interfaces"


export const fetchMovieDB = async <
  T = Record<string, unknown>, 
  Params = Record<string, unknown>
>(url: string, params?: Params) => {
  const result = await axios 
    .get<BaseSearchResponse<T>>(
      url, 
      {
        params: {
          ...params,
          api_key: process.env.MOVIE_DB_API_KEY
        },
        validateStatus: status => true
      }
    )
  return result.data
}

export const fetchMovieSearchs = async (params: DefaultMoviesParams ) => {
  try {
    const result =  await fetchMovieDB<MovieSearch[], DefaultMoviesParams>(
      "https://api.themoviedb.org/3/movie/popular",
      params
    )
    console.log(result)
    return result;
  } catch (error) {
    console.error(error);
  }
}

export const fetchSearchMovies = async (params: SearchMoviesParams) => {
  try {
    const result = await fetchMovieDB<MovieSearch[], SearchMoviesParams>(
      "https://api.themoviedb.org/3/search/movie",
      params
    )
      return result
  } catch (error) {
    console.error(error)
  }
}
