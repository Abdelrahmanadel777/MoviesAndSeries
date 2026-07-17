import { User } from "../../database/models/user.model.js"
import { AppError } from "../utilities/AppError.js"
import jwt from 'jsonwebtoken'

export const protectedRoute = async (req, res, next) => {
    let { token } = req.headers
    let userPayload = null
    if (!token) return next(new AppError('token must be sent', 501))
    jwt.verify(token, 'MovieToken', (err, payload) => {
        if (err) return next(new AppError('token is invalid', 502))
        userPayload = payload
    })
    let user = await User.findById(userPayload.userId)
    if (!user) return next(new AppError('user not found', 404))        
    let time = parseInt(user.passwordChangedAt?.getTime() / 1000)
    
    if (time > userPayload.iat) return next(new AppError('unauthorized', 500))
        
    req.user = user
    next()
}