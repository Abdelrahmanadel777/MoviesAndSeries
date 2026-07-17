import { AppError } from "../../utilities/AppError.js"
import { Series } from "../../../database/models/series.model.js"
import { Episode } from "../../../database/models/episode.model.js"
import { User } from "../../../database/models/user.model.js"
import { ApiFeatures } from "../../utilities/ApiFeatures.js"
import { Review } from "../../../database/models/review.model.js"
export const addSeries = async (req, res, next) => {
    let getSeries = await Series.findOne({ name: req.body.name, season: req.body.season })
    if (getSeries) return next(new AppError('this series is already exist', 500))
    req.body.seriesImages = req.files.seriesImages.map((img) => img.filename)
    req.body.poster = req.files.poster[0].filename
    let series = await Series.create(req.body)
    res.json({ message: "success", series })
}
export const getSeries = async (req, res, next) => {
    let series = await Series.findById(req.params.id)
    if (!series) return next(new AppError('no series found', 404))
    res.json({ message: "success", series })
}
export const deleteSeries = async (req, res, next) => {
    const id = req.params.id
    let series = await Series.findByIdAndDelete(id)
    if (!series) return next(new AppError('no series found', 404))
    await Episode.deleteMany({ series: id })
    await User.updateMany({ yourFavSeries: id }, { $pull: { yourFavSeries: id } })
    await Review.deleteMany({ target: id })
    res.json({ message: "series and episodes have been deleted", series })
}
export const updateSeries = async (req, res, next) => {
    if (req.files.seriesImages) {
        req.body.seriesImages = req.files.seriesImages.map((img) => img.filename)
    }
    if (req.files.poster) {
        req.body.poster = req.files.poster[0].filename
    }
    let series = await Series.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!series) return next(new AppError('no series found', 404))
    res.json({ message: "success", series })
}
export const getAllSeries = async (req, res, next) => {
    let mongooseQuery = Series.find()
    let apiFeature = new ApiFeatures(mongooseQuery, req.query).pagination().filter().search().fields().sort()
    let getAllSeries = await apiFeature.mongooseQuery
    if (!getAllSeries) return next(new AppError('no series found', 404))
    res.json({ message: "success", getAllSeries, pageNumber: apiFeature.pageNumber })
}