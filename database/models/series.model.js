import { model, Schema } from "mongoose";

const seriesSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        season: {
            type: String,
            default: 1
        },
        numOfSeasons: {
            type: Number,
            required: true,
            default: 1
        },

        imdb: {
            type: String,
            required: true
        },
        poster: {
            type: String,
            required: true
        },
        director: {
            type: String,
            required: true
        },
        writer: String,
        cast: {
            type: [String],
            default: []
        },
        seriesImages: [String],
        releaseDate: {
            type: Date,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        language: String,
        genre: {
            type: [String],
            default: []
        }


    }, { timestamps: true, versionKey: false })
seriesSchema.post('init', function (data) {
    if (data.seriesImages) data.seriesImages = data.seriesImages.map((img) => img = `${process.env.SERVER}/uploads/${img}`)
    if (data.poster) data.poster = `${process.env.SERVER}/uploads/${data.poster}`

})

export const Series = model('Series', seriesSchema)    