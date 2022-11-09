import {Router} from "express"
import axios from "axios"
import {BaseSearchResponse, PopularMovie} from "../../domain/interfaces"
const movieRouter = Router()


movieRouter.get("/getPopularMovies", async (req, res) => {
    const response = await axios.get<BaseSearchResponse<PopularMovie>>(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&page=1`)
     res.status(200).json(response.data)
 })

 export default movieRouter