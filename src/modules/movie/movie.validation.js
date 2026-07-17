import Joi from "joi";

export const addMovieValidation = Joi.object({
    name: Joi.string().max(50).min(2).required(),
    imdb: Joi.string(),
    language: Joi.string().required(),
    director: Joi.string().required(),
    writer: Joi.string().required(),
    genre: Joi.array().items(Joi.string()).required(),
    part: Joi.number(),
    time: Joi.string().required(),
    description: Joi.string().max(500).min(30).required(),
    releaseDate: Joi.date(),
    cast: Joi.array().items(Joi.string()).required(),
    poster: Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/gif', 'image/jpg').required(),
        size: Joi.number().max(5242880).required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required()
    })).required(),
    movieImages: Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/gif', 'image/jpg').required(),
        size: Joi.number().max(5242880).required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required()
    })).required(),
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
export const movieValidation = Joi.object({
    id: Joi.string().hex().length(24).required()
})
export const updateMovieValidation = Joi.object({
    id: Joi.string().hex().length(24).required(),
    name: Joi.string().max(50).min(2),
    imdb: Joi.string(),
    language: Joi.string(),
    director: Joi.string(),
    writer: Joi.string(),
    genre: Joi.array().items(Joi.string()),
    part: Joi.number(),
    oldQuality: Joi.number(),
    newQuality: Joi.number(),
    time: Joi.string(),
    description: Joi.string().max(500).min(30),
    releaseDate: Joi.date(),
    cast: Joi.array().items(Joi.string()),
    poster: Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/gif', 'image/jpg').required(),
        size: Joi.number().max(5242880).required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required()
    })),
    movieImages: Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/gif', 'image/jpg').required(),
        size: Joi.number().max(5242880).required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required()
    })),
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