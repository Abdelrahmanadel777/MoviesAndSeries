import { authRouter } from "../modules/auth/auth.routes.js"
import { episodeRouter } from "../modules/episodes/episode.routes.js"
import { movieRouter } from "../modules/movie/movie.routes.js"
import { reviewRouter } from "../modules/review/review.routes.js"
import { seriesRouter } from "../modules/series/series.routes.js"

export const bootstrap = (app) => {
    app.use('/api/auth', authRouter)
    app.use('/api/movie', movieRouter)
    app.use('/api/series', seriesRouter)
    app.use('/api/episode', episodeRouter)
    app.use('/api/review', reviewRouter)
    // app.use('*', (req, res, next) => {
    //     next(new AppError('error in endpoint', 404))
    // })
}