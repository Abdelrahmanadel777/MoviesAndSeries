import Joi from "joi";

export const addReviewVal = Joi.object({
    comment: Joi.string().max(500).min(1).optional().trim(),
    rating: Joi.number().max(5).min(1).required(),
    onModel: Joi.string().valid('Movie', 'Series').required(),
    id: Joi.string().hex().length(24).required()
})
export const updateReviewVal = Joi.object({
    comment: Joi.string().max(500).min(1).optional().trim(),
    rating: Joi.number().max(5).min(1).optional(),
    id: Joi.string().hex().length(24).required()
}).min(2)
export const ReviewVal = Joi.object({
    id: Joi.string().hex().length(24).required()
})
export const getReviewsVal = Joi.object({
    onModel: Joi.string().valid('Movie', 'Series').required(),
    target: Joi.string().hex().length(24).required()
})