import Router from 'express'
import { ReviewsController } from '../../controller/controller'
import * as middlewear from '../../z-library/validation/middlewear'
import { validator } from '../../z-library/validation/validator'

const router = Router()

export const routesWrapper = (controller: ReviewsController) =>{

    router.post('/:id', controller.respondWithMethodNotAllowed)
    router.post('/', 
        middlewear.newReviewInputValidators ,
        validator.handleValidationErrors,
        controller.addNew
    )

    router.get('/', controller.getMany)
    router.get('/:productId', 
        validator.validateReferenceId('productId'),
        validator.handleValidationErrors,
        controller.getOne
    )

    router.put('/', controller.respondWithMethodNotAllowed)
    router.put('/:reviewId', 
        middlewear.newReviewInputValidators,
        validator.validateReferenceId('reviewId'),
        validator.handleValidationErrors,
        controller.updateOne
    )

    router.patch('/', controller.respondWithMethodNotAllowed)
    router.patch('/:reviewId', 
        validator.validateReferenceId('reviewId'),
        middlewear.patchInputValidators,
        validator.handleValidationErrors,
        controller.modifyOne
    )

    router.delete('/', controller.respondWithMethodNotAllowed )
    router.delete('/:reviewId', 
        validator.validateReferenceId('reviewId'),
        validator.handleValidationErrors,
        controller.deleteOne
    )

    return router
}