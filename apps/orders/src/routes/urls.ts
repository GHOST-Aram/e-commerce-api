import Router from 'express'
import { OrdersController } from '../controller/controller'
import * as middlewear from '../z-library/validation/middlewear'
import { validator } from '../z-library/validation/validator'
import { authenticator } from '../z-library/auth/auth'

const router = Router()

export const routesWrapper = (controller: OrdersController) =>{
    router.post('/:orderId', controller.respondWithMethodNotAllowed)

    router.post('/', 
        middlewear.orderDataValidators,
        validator.handleValidationErrors,
        controller.addNew
    )

    router.get('/',
        authenticator.allowAdminUser,
        controller.getMany
    )

    router.get('/:orderId', 
        validator.validateReferenceId('orderId'),
        validator.handleValidationErrors,
        controller.getOne
    )

    router.put('/', controller.respondWithMethodNotAllowed)

    router.put('/:orderId', 
        middlewear.updateValidators,
        validator.handleValidationErrors,
        controller.updateOne
    )

    router.patch('/', controller.respondWithMethodNotAllowed)

    router.patch('/:orderId',
        middlewear.updateValidators,
        validator.handleValidationErrors,
        controller.modifyOne
    )

    router.delete('/', controller.respondWithMethodNotAllowed)

    router.delete('/:orderId', 
        authenticator.allowAdminUser,
        validator.validateReferenceId('orderId'),
        validator.handleValidationErrors,
        controller.deleteOne
    )
        
    return router
}