import Router from 'express'
import { PayController } from '../controller/controller'
import * as middlewear from '../z-library/validators/middlewear'
import { validator } from '../z-library/validators/validator'
import { authenticator } from '../z-library/auth/auth'

const router = Router()

export const routesWrapper = (controller: PayController) =>{
    router.post('/:paymentId',controller.respondWithMethodNotAllowed)
    router.post('/', 
        middlewear.postValidators,
        validator.handleValidationErrors, 
        controller.addNew
    )

    router.get('/',
    authenticator.allowAdminUser, 
    controller.getMany)

    router.get('/:orderId',
        middlewear.referenceIdValidator,
        validator.handleValidationErrors,
        controller.getOne
    )

    router.put('/', controller.respondWithMethodNotAllowed)
    router.put('/:orderId', controller.respondWithMethodNotAllowed)

    router.patch('/', controller.respondWithMethodNotAllowed)
    router.patch('/:orderId',controller.respondWithMethodNotAllowed)

    router.delete('/', controller.respondWithMethodNotAllowed)
    router.delete('/:orderId', 
        middlewear.referenceIdValidator,
        validator.handleValidationErrors,
        controller.deleteOne
    )

    return router
}