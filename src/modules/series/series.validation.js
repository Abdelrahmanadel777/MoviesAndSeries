import Joi from "joi";

export const addSeriesValidation = Joi.object({
    name: Joi.string().max(50).min(2).required(),
    imdb: Joi.string(),
    numOfSeasons: Joi.number().required(),
    season: Joi.number().required(),
    language: Joi.string().required(),
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
    director: Joi.string().required(),
    writer: Joi.string().required(),
    genre: Joi.array().items(Joi.string()).required(),
    episodes: Joi.array().items(Joi.string().hex().length(24)),
    description: Joi.string().max(500).min(30).required(),
    releaseDate: Joi.date().required(),
    cast: Joi.array().items(Joi.string()).required(),
    seriesImages: Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/gif', 'image/jpg').required(),
        size: Joi.number().max(5242880).required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required()
    }).required())

})
export const seriesValidation = Joi.object({
    id: Joi.string().hex().length(24).required()
})
export const updateSeriesValidation = Joi.object({
    id: Joi.string().hex().length(24).required(),
    name: Joi.string().max(50).min(2),
    imdb: Joi.string(),
    numOfSeasons: Joi.number(),
    language: Joi.string(),
    director: Joi.string(),
    writer: Joi.string(),
    genre: Joi.array().items(Joi.string()),
    episodes: Joi.array().items(Joi.string().hex().length(24)),
    description: Joi.string().max(500).min(30),
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
    releaseDate: Joi.date(),
    cast: Joi.array().items(Joi.string()),
    seriesImages: Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/gif', 'image/jpg').required(),
        size: Joi.number().max(5242880).required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required()
    }).required())
})
