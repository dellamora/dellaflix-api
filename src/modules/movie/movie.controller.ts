import {Router} from "express"
import {fetchPopularMovies} from "./movie.services"
const movieRouter = Router()


movieRouter.get("/getPopularMovies", async (req, res, next) => {
  try {
    const {page} = req.query;
    const parsedPage = page && !isNaN(Number(page)) ? Math.min(Number(page), 500) : 1
    const data = await fetchPopularMovies({page: parsedPage});
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


 export default movieRouter