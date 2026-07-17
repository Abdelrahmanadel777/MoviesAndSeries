import { Router } from "express";
import { protectedRoute } from "../../middleware/protectedRoute.js";
import { isAllowedTo } from "../../middleware/isAllowedTo.js";
import * as movieCruds from "./movie.controller.js";
import { validation } from "../../middleware/validation.js";
import * as movieVal from "./movie.validation.js";
import { uploadmixOfFiles, uploadSingleFile } from "../../middleware/fileUpload.js";

export const movieRouter = Router()
movieRouter.route('/')
    .get( movieCruds.getMovies)
    .post(protectedRoute, isAllowedTo('admin'), uploadmixOfFiles([{ name: 'movieImages', maxCount: 8 }, { name: 'poster', maxCount: 1 }, { name: 'videos', maxCount: 10 }]), validation(movieVal.addMovieValidation), movieCruds.addMovie)
movieRouter.route('/:id')
    .get(protectedRoute, isAllowedTo('admin', 'user'), validation(movieVal.movieValidation), movieCruds.getMovie)
    .delete(protectedRoute, isAllowedTo('admin'), validation(movieVal.movieValidation), movieCruds.deleteMovie)
    .put(protectedRoute, isAllowedTo('admin'), uploadmixOfFiles([{ name: 'poster', maxCount: 1 }, { name: 'movieImages', maxCount: 8 }, { name: 'videos', maxCount: 10 }]), validation(movieVal.updateMovieValidation), movieCruds.updateMovie)
movieRouter.route('/video/:id')
    .patch(protectedRoute, isAllowedTo('admin'), uploadSingleFile('video'), validation(movieVal.VideoVal), movieCruds.addMovieVideo)
    .put(protectedRoute, isAllowedTo('admin'), uploadSingleFile('video'), validation(movieVal.VideoVal), movieCruds.updateMovieVideo)
    .delete(protectedRoute, isAllowedTo('admin'), validation(movieVal.deleteVideoVal), movieCruds.deleteMovieVideo)