import { model, Schema, Types } from "mongoose";

const episodeSchema = new Schema(
    {
        episode_name: {
            type: String,
            required: true
        },
        episode_number: {
            type: Number,
            required: true
        },
        videos: [
            {
                quality: Number,
                video: String
            }

        ],
        series: {
            type: Types.ObjectId,
            ref: 'Series',
            required: true
        },
    }, { timestamps: true, versionKey: false })

export const Episode = model('Episode', episodeSchema)    