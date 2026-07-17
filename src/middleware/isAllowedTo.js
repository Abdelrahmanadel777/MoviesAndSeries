import { AppError } from "../utilities/AppError.js"

export const isAllowedTo = (...roles) => {
    return (req, res, next) => {
        if (!(roles.includes(req.user.role))) return next(new AppError('unauthorized', 500))
  
            
        next()

    }
}