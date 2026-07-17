import { Movie } from "../../../database/models/movie.model.js"
import { Review } from "../../../database/models/review.model.js"
import { User } from "../../../database/models/user.model.js"
import { catchError } from "../../middleware/catchError.js"
import { ApiFeatures } from "../../utilities/ApiFeatures.js"
import { AppError } from "../../utilities/AppError.js"

export const addMovie = catchError(async (req, res, next) => {
    let movie = await Movie.findOne({ name: req.body.name, part: req.body.part })
    if (movie) return next(new AppError('this movie is already exist', 404))
    req.body.poster = req.files.poster[0].filename
    req.body.movieImages = req.files.movieImages.map((img) => img.filename)
    req.body.videos[0].video = req.files.videos[0].filename
    let newMovie = await Movie.create(req.body)
    res.json({ message: "success", newMovie })
})
export const getMovies = catchError(async (req, res, next) => {
    let mongooseQuery = Movie.find()
    let apiFeatures = new ApiFeatures(mongooseQuery, req.query).pagination().filter().fields().sort().search()
    let movies = await apiFeatures.mongooseQuery
    if (!movies) return next(new AppError('no movies found', 404))
    res.json({ message: "success", movies, page: apiFeatures.pageNumber })
})
export const getMovie = catchError(async (req, res, next) => {
    let movie = await Movie.findById(req.params.id)
    if (!movie) return next(new AppError('no movie found'))
    res.json({ message: "success", movie })
})
export const deleteMovie = catchError(async (req, res, next) => {
    const id = req.params.id
    let movie = await Movie.findByIdAndDelete(id)
    if (!movie) return next(new AppError('can not find this movie', 501))
    await User.updateMany({ yourFavMovie: id }, { $pull: { yourFavMovie: id } })
    await Review.deleteMany({ target: id })
    res.json({ message: "deleted", movie })
})
export const updateMovie = catchError(async (req, res, next) => {
    let movie = await Movie.findById(req.params.id)
    if (!movie) return next(new AppError('can not find this movie', 501))
    if (req.files) {
        for (const file in req.files) {
            if (file == 'poster') {
                movie.poster = req.files[file][0].filename
            } else if (file == 'movieImages') {
                movie.movieImages = req.files[file].map((img) => img.filename)
            }
        }
    }
    if (!req.body) {
        await movie.save()
        res.json({ message: "success", movie })
    } else {
        if (req.body.oldQuality && req.body.newQuality) {
            const index = movie.videos.findIndex((vid) => vid.quality == req.body.oldQuality)
            if (index === -1) return next(new AppError('no quality found', 404))
            movie.videos[index].quality = req.body.newQuality
            delete req.body.oldQuality
            delete req.body.newQuality
        }
        Object.assign(movie, req.body)
        await movie.save()
        res.json({ message: "success", movie })
    }
}
)
export const addMovieVideo = catchError(async (req, res, next) => {

    let movie = await Movie.findById(req.params.id)
    if (!movie) return next(new AppError('this movie is not exist', 404))
    let checkQuality = movie.videos.find((vid) => vid.quality == req.body.quality)
    if (checkQuality) return next(new AppError('this quality is already exist', 407))
    req.body.video = req.file.filename
    movie.videos.push(req.body)
    await movie.save()
    res.json({ message: "success", movie })
})
export const updateMovieVideo = catchError(async (req, res, next) => {
    let movie = await Movie.findById(req.params.id)
    if (!movie) return next(new AppError('this movie is not exist', 404))
    const index = movie.videos.findIndex((vid) => vid.quality == req.body.quality)
    if (index === -1) return next(new AppError('this quality is not exist', 407))
    movie.videos[index].video = req.file.filename
    await movie.save()
    res.json({ message: "success", movie })
})
export const deleteMovieVideo = catchError(async (req, res, next) => {
    let movie = await Movie.findById(req.params.id)
    if (!movie) return next(new AppError('this movie is not exist', 404))
    const index = movie.videos.findIndex((vid) => vid.quality == req.body.quality)
    if (index === -1) return next(new AppError('this quality is not exist', 407))
    movie.videos.splice(index, 1)
    await movie.save()
    res.json({ message: "success", movie })
})

