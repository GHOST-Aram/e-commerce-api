import Router, { NextFunction, Response, Request } from 'express'
import { ReviewsController } from '../controller/controller'
import * as middlewear from '../z-library/validation/middlewear'
import { validator } from '../z-library/validation/validator'
import { Authenticatable, Authenticator } from '../z-library/auth/auth'

const router = Router()

export const routesWrapper = (
    controller: ReviewsController, authenticator: Authenticator | Authenticatable
    ) =>{

    router.post('/:id', controller.respondWithMethodNotAllowed)
    router.post('/', 
        authenticator.authenticate(),
        middlewear.newReviewInputValidators ,
        validator.handleValidationErrors,
        controller.addNew
    )

    router.get('/', 
        authenticator.authenticate(),
        authenticator.allowAdminUser,
        controller.getMany
    )
    router.get('/:productId', 
        validator.validateReferenceId('productId'),
        validator.handleValidationErrors,
        controller.getOne
    )

    router.put('/', authenticator.authenticate(),
        controller.respondWithMethodNotAllowed)
        
    router.put('/:reviewId', 
        authenticator.authenticate(),
        controller.respondWithMethodNotAllowed
    )

    router.patch('/', controller.respondWithMethodNotAllowed)
    router.patch('/:reviewId', 
        authenticator.authenticate(),
        validator.validateReferenceId('reviewId'),
        middlewear.patchInputValidators,
        validator.handleValidationErrors,
        controller.modifyOne
    )

    router.delete('/', controller.respondWithMethodNotAllowed )
    router.delete('/:reviewId', 
        authenticator.authenticate(),
        authenticator.allowAdminUser,
        validator.validateReferenceId('reviewId'),
        validator.handleValidationErrors,
        controller.deleteOne
    )

    return router
}