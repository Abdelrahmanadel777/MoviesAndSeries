import Joi from "joi";

export const addEpisodeValidation = Joi.object({
    episode_name: Joi.string().max(20).min(1),
    episode_number: Joi.number().required(),
    id: Joi.string().hex().length(24).required(),
    videos: Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid(
            'video/mp4',
            'video/mkv',
            'video/x-matroska',
            'video/avi',
            'video/mov'
        ).required(),
        size: Joi.number().max(800 * 1024 * 1024).required(), // e.g., 100MB max
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
    })).required()
})
export const episodeValidation = Joi.object({
    id: Joi.string().hex().length(24).required()
})
export const updateEpisodeValidation = Joi.object({
    id: Joi.string().hex().length(24).required(),
    episode_name: Joi.string().max(20).min(1),
    episode_number: Joi.number(),
    series: Joi.string().hex().length(24),
    oldQuality: Joi.number().valid(360, 480, 720, 1080),
    newQuality: Joi.number().valid(360, 480, 720, 1080),
}).and('oldQuality', 'newQuality')
export const VideoVal = Joi.object({
    quality: Joi.number().valid(360, 480, 720, 1080).required(),
    id: Joi.string().hex().length(24).required(),
    video: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid(
            'video/mp4',
            'video/mkv',
            'video/x-matroska',
            'video/avi',
            'video/mov'
        ).required(),
        size: Joi.number().max(800 * 1024 * 1024).required(), // e.g., 100MB max
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required()
    }).required()
})
export const deleteVideoVal = Joi.object({
    quality: Joi.number().valid(360, 480, 720, 1080).required(),
    id: Joi.string().hex().length(24).required(),
})