import {Router} from "express"
import {
  fetchMovieSearchs,
  fetchSearchMovies,
} from "./movie.services"
const movieRouter = Router()


movieRouter.get("/getMovieSearchs", async (req, res, next) => {
  try {
    const {page} = req.query;
    const parsedPage = page && !isNaN(Number(page)) ? Math.min(Number(page), 500) : 1
    const data = await fetchMovieSearchs({page: parsedPage});
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
    const data = await fetchSearchMovies({
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


 export default movieRouter