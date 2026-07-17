import { User } from "../../database/models/user.model.js"
import { AppError } from "../utilities/AppError.js"

export const checkEmail = async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email })
    if (user) next(new AppError('this email is already exist', 500))
    next()
}