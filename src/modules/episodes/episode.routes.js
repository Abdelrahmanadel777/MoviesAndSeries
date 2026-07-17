import { Router } from "express";
import { protectedRoute } from "../../middleware/protectedRoute.js";
import { isAllowedTo } from "../../middleware/isAllowedTo.js";
import * as episodeCruds from "./episode.controller.js";
import { uploadmixOfFiles, uploadSingleFile } from "../../middleware/fileUpload.js";
import * as episodeVal from "./episode.validation.js";
import { validation } from "../../middleware/validation.js";


export const episodeRouter = Router()
episodeRouter.route('/')
    .get(protectedRoute, isAllowedTo('user', 'admin'), episodeCruds.getEpisodes)
episodeRouter.route('/:id')
    .post(protectedRoute, isAllowedTo('admin'), uploadmixOfFiles([{ name: 'videos', maxCount: 5 }]), validation(episodeVal.addEpisodeValidation), episodeCruds.addEpisodes)
    .get(protectedRoute, isAllowedTo('user', 'admin'), validation(episodeVal.episodeValidation), episodeCruds.getEpisode)
    .put(protectedRoute, isAllowedTo('admin'), uploadmixOfFiles([{ name: 'videos', maxCount: 1 }]), validation(episodeVal.updateEpisodeValidation), episodeCruds.updateEpisode)
    .delete(protectedRoute, isAllowedTo('admin'), validation(episodeVal.episodeValidation), episodeCruds.deleteEpisode)
episodeRouter.route('/video/:id')
    .patch(protectedRoute, isAllowedTo('admin'), uploadSingleFile('video'), validation(episodeVal.VideoVal), episodeCruds.addEpisodeVideo)
    .put(protectedRoute, isAllowedTo('admin'), uploadSingleFile('video'), validation(episodeVal.VideoVal), episodeCruds.updateEpisodeVideo)
    .delete(protectedRoute, isAllowedTo('admin'), validation(episodeVal.deleteVideoVal), episodeCruds.deleteEpisodeVideo)        