import { Episode } from "../../../database/models/episode.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utilities/AppError.js"

export const addEpisodes = catchError(async (req, res, next) => {
    let getEpisode = await Episode.findOne({ episode_number: req.body.episode_number, series: req.params.id })
    if (getEpisode) return next(new AppError('this episode is already exist', 407))
    req.body.videos[0].video = req.files.videos[0].filename
    req.body.series = req.params.id
    let episode = Episode(req.body)
    await episode.save()
    res.json({ message: "success", episode })
})
export const getEpisodes = catchError(async (req, res, next) => {
    let episodes = await Episode.find().sort('-createdAt')
    if (!episodes) return next(new AppError('no episodes found', 404))
    res.json({ message: "success", episodes })
})
export const getEpisode = catchError(async (req, res, next) => {
    let episodes = await Episode.findById(req.params.id)
    if (!episodes) return next(new AppError('no episodes found', 404))
    res.json({ message: "success", episodes })
})
export const updateEpisode = catchError(async (req, res, next) => {
    let episode = await Episode.findById(req.params.id)
    if (!episode) return next(new AppError('this episode is not exist', 404))
    if (req.body.oldQuality && req.body.newQuality) {
        const index = episode.videos.findIndex((vid) => vid.quality == req.body.oldQuality)
        if (index === -1) return next(new AppError('this quality is not exist', 404))
        episode.videos[index].quality = req.body.newQuality
        delete req.body.oldQuality
        delete req.body.newQuality
    }
    Object.assign(episode, req.body)
    await episode.save()
    res.json({ message: "success", episode })
})
export const deleteEpisode = catchError(async (req, res, next) => {
    let episode = await Episode.findByIdAndDelete(req.params.id)
    if (!episode) return next(new AppError('no episode found to delete', 404))
    res.json({ message: "deleted", episode })
})
export const addEpisodeVideo = catchError(async (req, res, next) => {
    let episode = await Episode.findById(req.params.id)
    if (!episode) return next(new AppError('this episode is not exist', 404))
    let checkQuality = episode.videos.find((vid) => vid.quality == req.body.quality)
    if (checkQuality) return next(new AppError('this quality is already exist', 407))
    req.body.video = req.file.filename
    episode.videos.push(req.body)
    await episode.save()
    res.json({ message: "success", episode })
})
export const updateEpisodeVideo = catchError(async (req, res, next) => {
    let episode = await Episode.findById(req.params.id)
    if (!episode) return next(new AppError('this episode is not exist', 404))
    const index = episode.videos.findIndex((vid) => vid.quality == req.body.quality)
    if (index === -1) return next(new AppError('this quality is not exist', 407))
    episode.videos[index].video = req.file.filename
    await episode.save()
    res.json({ message: "success", episode })
})
export const deleteEpisodeVideo = catchError(async (req, res, next) => {
    let episode = await Episode.findById(req.params.id)
    if (!episode) return next(new AppError('this episode is not exist', 404))
    const index = episode.videos.findIndex((vid) => vid.quality == req.body.quality)
    if (index === -1) return next(new AppError('this quality is not exist', 407))
    episode.videos.splice(index, 1)
    await episode.save()
    res.json({ message: "success", episode })
})