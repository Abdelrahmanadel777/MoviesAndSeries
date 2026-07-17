import { Router } from "express";
import { checkEmail } from "../../middleware/checkEmail.js";
import { forgetPassword, signin, signup } from "./auth.controller.js";
import { validation } from "../../middleware/validation.js";
import * as authValidation from "./auth.validation.js";
import { isAllowedTo } from "../../middleware/isAllowedTo.js";
import { protectedRoute } from "../../middleware/protectedRoute.js";
import { nodeMailer } from "../../utilities/nodemailer.js";

export const authRouter = Router()
authRouter.route('/signup')
    .post(validation(authValidation.signupValidation), checkEmail, nodeMailer, signup)
authRouter.route('/signin')
    .post(validation(authValidation.signinValidation), signin)
authRouter.route('/forgetPassword')
    .put(protectedRoute, isAllowedTo('user', 'admin'), validation(authValidation.forgetPasswordValidation), forgetPassword)
