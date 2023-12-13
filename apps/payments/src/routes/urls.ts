import Router from 'express'
import { PayController } from '../controller/controller'
import * as middlewear from '../z-library/validators/middlewear'
import { validator } from '../z-library/validators/validator'
import { Authenticatable, Authenticator, authenticator } from '../z-library/auth/auth'

const router = Router()

export const routesWrapper = (
    controller: PayController, authenticator: Authenticator | Authenticatable) =>{

    router.post('/:paymentId',authenticator.authenticate(),
        controller.respondWithMethodNotAllowed)

    router.post('/', authenticator.authenticate(),
        middlewear.postValidators,
        validator.handleValidationErrors, 
        controller.addNew
    )

    router.get('/', authenticator.authenticate(),
        authenticator.allowAdminUser, 
        controller.getMany
    )

    router.get('/:orderId', authenticator.authenticate(),
        middlewear.referenceIdValidator,
        validator.handleValidationErrors,
        controller.getOne
    )

    router.put('/', authenticator.authenticate(), 
        controller.respondWithMethodNotAllowed
    )

    router.put('/:orderId', authenticator.authenticate(), 
        controller.respondWithMethodNotAllowed
    )

    router.patch('/', authenticator.authenticate(), 
        controller.respondWithMethodNotAllowed
    )

    router.patch('/:orderId', authenticator.authenticate(), 
        controller.respondWithMethodNotAllowed
    )

    router.delete('/', authenticator.authenticate(), 
        controller.respondWithMethodNotAllowed
    )

    router.delete('/:orderId', authenticator.authenticate(),
        authenticator.allowAdminUser,
        middlewear.referenceIdValidator,
        validator.handleValidationErrors,
        controller.deleteOne
    )

    return router
}