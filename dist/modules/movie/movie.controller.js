"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const movieRouter = (0, express_1.Router)();
movieRouter.get("/getPopularMovies", async (req, res) => {
    const response = await axios_1.default.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&page=1`);
    res.status(200).json(response.data);
});
exports.default = movieRouter;
//# sourceMappingURL=movie.controller.js.map