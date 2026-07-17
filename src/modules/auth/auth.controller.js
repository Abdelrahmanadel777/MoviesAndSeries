import { User } from "../../../database/models/user.model.js"
import bcrypt from 'bcrypt'
import { AppError } from "../../utilities/AppError.js"
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    let user = User(req.body)
    await user.save()
    res.json({ message: "success", user })
}

export const signin = async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email })

    if (!(user && bcrypt.compareSync(req.body.password, user.password))) next(new AppError('something wrong in email or password', 501))
    let token = jwt.sign({ userId: user._id, role: user.role }, 'MovieToken')
    res.json({ message: "success", user, token })

}
export const forgetPassword = async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email })
    if (!(user && bcrypt.compareSync(req.body.oldPassword, user.password))) return next(new AppError('email or password is not correct', 500))
    user.password = req.body.newPassword
    user.passwordChangedAt = Date.now()
    await user.save()
    res.json({ message: "success", user })
}
