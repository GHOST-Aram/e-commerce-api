import Router from 'express'
import { Controller } from '../controller/controller'
import * as middlewear from '../utils/middlewear'
import { validator } from '../utils/validator'

const router = Router()

export const routesWrapper = (controller: Controller) =>{

    router.post('/:id', controller.respondWithMethodNotAllowed)
    router.post('/', 
        middlewear.newReviewInputValidators ,
        validator.handleValidationErrors,
        controller.addNew
    )

    router.get('/', controller.getRandomDocs)
    router.get('/:productId', 
        validator.validateReferenceId('productId'),
        validator.handleValidationErrors,
        controller.getByProductId
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