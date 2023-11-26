import Router from 'express'
import { Controller } from '../controller/controller'
import { newReviewInputValidators } from '../utils/middlewear'

const router = Router()

export const routesWrapper = (controller: Controller) =>{
    router.post('/', newReviewInputValidators ,
        controller.handleValidationErrors,
        controller.addNewReview)

    router.post('/:id', controller.addNewReviewWithId)

    router.get('/', controller.getRandomReviews)
    router.get('/:productId', controller.getReviewsByProductId)

    router.put('/', controller.updateAllReviews)
    router.put('/:reviewId', newReviewInputValidators,
        controller.handleValidationErrors,
        controller.updateReview
    )

    return router
}