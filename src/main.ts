import express from "express"
import * as dotenv from "dotenv"
import movieRouter from "./modules/movie/movie.controller"
import cors from "cors"
dotenv.config()

const app = express()
app.use(cors())
app.use("/movie", movieRouter)

app.listen(4000, () => {console.log("RODANDO")})