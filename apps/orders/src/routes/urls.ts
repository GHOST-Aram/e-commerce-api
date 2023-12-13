import Router from 'express'
import { OrdersController } from '../controller/controller'
import * as middlewear from '../z-library/validation/middlewear'
import { validator } from '../z-library/validation/validator'
import { Authenticatable, Authenticator, authenticator } from '../z-library/auth/auth'

const router = Router()

export const routesWrapper = (
    controller: OrdersController, authenticator: Authenticator | Authenticatable) =>{

    router.post('/:orderId', authenticator.authenticate(), 
        controller.respondWithMethodNotAllowed)

    router.post('/', authenticator.authenticate(),
        middlewear.validateOrderInput,
        validator.handleValidationErrors,
        controller.addNew
    )

    router.get('/', authenticator.authenticate(),
        authenticator.allowAdminUser,
        controller.getMany
    )

    router.get('/:orderId', authenticator.authenticate(),
        validator.validateReferenceId('orderId'),
        validator.handleValidationErrors,
        controller.getOne
    )

    router.put('/',authenticator.authenticate(),
         controller.respondWithMethodNotAllowed)

    router.put('/:orderId', authenticator.authenticate(), 
        controller.respondWithMethodNotAllowed)

    router.patch('/', authenticator.authenticate(),
        controller.respondWithMethodNotAllowed)

    router.patch('/:orderId',authenticator.authenticate(),
        validator.validateReferenceId('orderId'),
        middlewear.validatePatchInput,
        validator.handleValidationErrors,
        controller.modifyOne
    )

    router.delete('/', authenticator.authenticate(),
        controller.respondWithMethodNotAllowed)

    router.delete('/:orderId', authenticator.authenticate(),
        authenticator.allowAdminUser,
        validator.validateReferenceId('orderId'),
        validator.handleValidationErrors,
        controller.deleteOne
    )
        
    return router
}