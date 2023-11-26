import Router from 'express'
import { Controller } from '../controller/controller'
import { newReviewInputValidators, patchInputValidators } from '../utils/middlewear'

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
        controller.updateReview)

    router.patch('/', controller.modifyAllReviews)
    router.patch('/:reviewId', patchInputValidators,
        controller.handleValidationErrors,
        controller.modifyReview)

    router.delete('/', controller.deleteAllReviews )
    router.delete('/:reviewId', controller.deleteReview)

    return router
}