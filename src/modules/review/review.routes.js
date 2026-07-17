import { Router } from "express";
import { protectedRoute } from "../../middleware/protectedRoute.js";
import { isAllowedTo } from "../../middleware/isAllowedTo.js";
import { validation } from "../../middleware/validation.js";
import * as reviewVal from "./review.validation.js";
import * as reviewCrud from "./review.controller.js";

export const reviewRouter = Router()
reviewRouter.route('/')
    .get(reviewCrud.getReviews)
reviewRouter.route('/:id')
    .post(protectedRoute, isAllowedTo('user'), validation(reviewVal.addReviewVal), reviewCrud.addReview)
    .put(protectedRoute, isAllowedTo('user'), validation(reviewVal.updateReviewVal), reviewCrud.updateReview)
    .delete(protectedRoute, isAllowedTo('user'), validation(reviewVal.ReviewVal), reviewCrud.deleteReview)