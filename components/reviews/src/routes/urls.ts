import Router from 'express'
import { Controller } from '../controller/controller'
import * as middlewear from '../utils/middlewear'
import { validator } from '../utils/validator'

const router = Router()

export const routesWrapper = (controller: Controller) =>{
    router.post('/', 
        middlewear.newReviewInputValidators ,
        validator.handleValidationErrors,
        controller.addNewReview)

    router.post('/:id', controller.respondWithMethodNotAllowed)

    router.get('/', controller.getRandomReviews)
    router.get('/:productId', 
        validator.validateReferenceId('productId'),
        validator.handleValidationErrors,
        controller.getReviewsByProductId
    )

    router.put('/', controller.respondWithMethodNotAllowed)
    router.put('/:reviewId', 
        middlewear.newReviewInputValidators,
        validator.validateReferenceId('reviewId'),
        validator.handleValidationErrors,
        controller.updateReview
    )

    router.patch('/', controller.respondWithMethodNotAllowed)
    router.patch('/:reviewId', 
        validator.validateReferenceId('reviewId'),
        middlewear.patchInputValidators,
        validator.handleValidationErrors,
        controller.modifyReview
    )

    router.delete('/', controller.respondWithMethodNotAllowed )
    router.delete('/:reviewId', 
        validator.validateReferenceId('reviewId'),
        validator.handleValidationErrors,
        controller.deleteReview
    )

    return router
}