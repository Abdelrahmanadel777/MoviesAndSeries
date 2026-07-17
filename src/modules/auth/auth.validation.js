import Joi from "joi";

export const signupValidation = Joi.object({
    name: Joi.string().max(50).min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    rePassword: Joi.string().valid(Joi.ref('password')).required(),
})
export const signinValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})
export const forgetPasswordValidation = Joi.object({
    email: Joi.string().email().required(),
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
})