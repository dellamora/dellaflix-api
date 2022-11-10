import {Router} from "express"
import {
  fetchPopularMovies,
  fetchSearchMovies,
  fetchMovieByID,
  fetchAllGenres,
  fetchMoviesByGenre,
} from "./movie.services"
const movieRouter = Router()


movieRouter.get("/getPopularMovies", async (req, res, next) => {
  try {
    const {page} = req.query;
    const parsedPage = page && !isNaN(Number(page)) ? Math.min(Number(page), 500) : 1
    const {data} = await fetchPopularMovies({page: parsedPage});
    return res.status(200).json({
      status:200,
      message: `${data.results.length} movies found`, 
      page: parsedPage,
      hasNextPage: 500 > data.page,
      data: data.results
    })
  } catch (err) {
    return next(err);
  }
})

movieRouter.get("/search", async (req, res , next) => {
  try {
    const {
      language, 
      page, 
      include_adult, 
      query, 
      region, 
      year, 
      primary_release_year
    }  = req.query;

    if ( !query ) {
      return res.status(400).json({
        status: 400, 
        message: "you needed to espefify the query paramater"
      })
    }
  
    const parsedPage = page && !isNaN(Number(page)) ? Math.min(Number(page), 500) : 1
    const {data} = await fetchSearchMovies({
      page: parsedPage,
      query: query as string,
      include_adult: include_adult?.toString().toLowerCase() === "true",
      year: year && !isNaN(Number(year)) ? Number(year) : undefined,
      primary_release_year: primary_release_year && !isNaN(Number(primary_release_year)) ? Number(primary_release_year) : undefined,
      language: language?.toString() || undefined,
      region: region?.toString() || undefined,
    })
    return res.status(200).json({
      status:200,
      page: parsedPage,
      data: data.results,
      hasNextPage: 500 > data.page,
    })
  } catch (err) {
    return next(err);
  }
})

movieRouter.get("/getAllGenres", async (req, res, next) => {
  try {
    const {data, status} = await fetchAllGenres()
    return res.status(status).json({
      status,
      data: data?.genres || null 
    })
  } catch (err) {
    return next(err)
  }
}) 

movieRouter.get("/getMovieByGenre", async (req, res, next) => {
  try {
    const {genre} = req.query;
    if (!genre || typeof genre !== "string") {
      return res.status(400).json({
        status: 400,
        message: "you need to specify a genre"
      })
    }
    const {data, status} = await fetchMoviesByGenre(genre) 
    return res.status(status).json({
      status:status,
      data: data
    })
  } catch (err) {
    return next(err)
  }
})

movieRouter.get("/:movie_id", async (req, res, next) => {
  try { 
    const movie_id = req.params.movie_id;
    if (!movie_id || isNaN(Number(movie_id))) {
      return res.status(400).json({
        status: 400,
        message: !movie_id ? "you needed to provide a movie id" : "the movie id needs to be a number"
      })
    } 
    const {data, status} = await fetchMovieByID({movie_id: Number(movie_id)}) 
    return res.status(status).json({
      status: status,
      data: data
    }) 
  } catch (err) {
    return next(err)
  }
})


 export default movieRouter