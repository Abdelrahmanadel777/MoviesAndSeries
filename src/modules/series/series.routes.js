import { Router } from "express";
import { protectedRoute } from "../../middleware/protectedRoute.js";
import { isAllowedTo } from "../../middleware/isAllowedTo.js";
import * as seriesCruds from "./series.controller.js";
import { validation } from "../../middleware/validation.js";
import * as seriesVal from "./series.validation.js";
import { uploadmixOfFiles} from "../../middleware/fileUpload.js";

export const seriesRouter = Router()
seriesRouter.route('/')
    .get( seriesCruds.getAllSeries)
    .post(protectedRoute, isAllowedTo('admin'), uploadmixOfFiles([
        { name: 'seriesImages', maxCount: 10 },
        { name: "poster", maxCount: 1 }]), validation(seriesVal.addSeriesValidation), seriesCruds.addSeries)
seriesRouter.route('/:id')
    .get(protectedRoute, isAllowedTo('user', 'admin'), validation(seriesVal.seriesValidation), seriesCruds.getSeries)
    .put(protectedRoute, isAllowedTo('admin'), uploadmixOfFiles([
        { name: 'seriesImages', maxCount: 10 },
        { name: "poster", maxCount: 1 }]), validation(seriesVal.updateSeriesValidation), seriesCruds.updateSeries)
    .delete(protectedRoute, isAllowedTo('admin'), validation(seriesVal.seriesValidation), seriesCruds.deleteSeries)     