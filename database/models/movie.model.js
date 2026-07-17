import { model, Schema } from "mongoose";

const movieSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        imdb: {
            type: String,
            required: true
        },
        videos: [
            {
                quality: Number,
                video: String
            }
        ],
        director: {
            type: String,
            required: true
        },
        part: {
            type: Number,
            default: 1
        },
        writer: String,
        cast: [String],
        releaseDate: {
            type: Date,
            required: true
        },
        movieImages: [String],
        poster: String,
        time: String,
        description: {
            type: String,
            required: true
        },
        language: String,
        genre: [String]


    }, { timestamps: true, versionKey: false })
movieSchema.post('init', function (data) {
    if (data.img) data.img = `${process.env.SERVER}/uploads/${data.img}`
})

export const Movie = model('Movie', movieSchema)    