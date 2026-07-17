import { model, Schema, Types } from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new Schema(

    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user'
        },
        yourFavMovie: {
            type: [Types.ObjectId],
            ref: 'Movie',
            default: []
        },
        yourFavSeries: {
            type: [Types.ObjectId],
            ref: 'Series',
            default: []

        },
        confirmEmail: {
            type: Boolean,
            default: false
        },
        profilePhoto: String,
        passwordChangedAt: Date
    }, { timestamps: true, versionKey: false }
)
userSchema.pre('save', function () {
    this.password = bcrypt.hashSync(this.password, 8)
})
userSchema.post('init', function (data) {
    if (data.profilePhoto) data.profilePhoto = `${process.env.SERVER}/uploads/${data.profilePhoto}`
})
export const User = model('User', userSchema)