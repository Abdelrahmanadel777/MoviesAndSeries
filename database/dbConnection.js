import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect('mongodb://localhost:27017/MovieProject')
        .then(() => console.log('database is connected successfully'))
}