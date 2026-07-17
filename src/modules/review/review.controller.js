import { Movie } from "../../../database/models/movie.model.js";
import { Review } from "../../../database/models/review.model.js";
import { Series } from "../../../database/models/series.model.js";
import { catchError } from "../../middleware/catchError.js";
import { ApiFeatures } from "../../utilities/ApiFeatures.js";
import { AppError } from "../../utilities/AppError.js";

export const addReview = catchError(async (req, res, next) => {
    const { comment, rating, onModel } = req.body
    const { id } = req.params
    if (onModel == 'Movie') {
        let movie = await Movie.findById(id)
        if (!movie) return next(new AppError('this movie is not exist', 404))
    }
    if (onModel == 'Series') {
        let series = await Series.findById(id)
        if (!series) return next(new AppError('this Series is not exist', 404))
    }
    let review = await Review.create(
        {
            comment,
            rating,
            onModel,
            user: req.user._id,
            target: id
        }
    )
    res.json({ message: "success", review })
})
export const getReviews = catchError(async (req, res, next) => {
    let mongooseQuery = Review.find()
    let apiFeatures = new ApiFeatures(mongooseQuery, req.query).pagination().fields().filter().search().sort()
    let reviews = await apiFeatures.mongooseQuery
    res.json({ message: "success", reviews, pageNumber: apiFeatures.pageNumber })
})
export const updateReview = catchError(async (req, res, next) => {
    let review = await Review.findOne({ _id: req.params.id, user: req.user._id })
    if (!review) return next(new AppError("review not found or not authorized", 404));
    review = Object.assign(review, req.body)
    await review.save()
    res.json({ message: "success", review })
})
export const deleteReview = catchError(async (req, res, next) => {
    let review = await Review.findOneAndDelete({ _id: req.params.id, user: req.user._id })
    if (!review) return next(new AppError("review not found or not authorized", 404));
    res.json({ message: "deleted", review })
})
