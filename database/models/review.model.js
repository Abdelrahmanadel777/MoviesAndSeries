import { model, Schema, Types } from "mongoose";

const reviewSchema = new Schema(
    {
        comment: {
            type: String,
        },
        user: {
            type: Types.ObjectId,
            ref: "User",
            required: true
        },
        rating: {
            type: Number,
            max: 5,
            min: 1,
            required: true
        },
        onModel: {
            type: String,
            required: true,
            enum: ['Movie', 'Series']
        },
        target: {
            type: Types.ObjectId,
            required: true,
            ref: "onModel"
        }
    }, { timestamps: true, versionKey: false }
)
export const Review = model('Review', reviewSchema)
