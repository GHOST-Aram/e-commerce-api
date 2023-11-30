import Router from 'express'
import { PayController } from '../controller/controller'
import * as middlewear from '../utils/middlewear'
import { validator } from '../utils/validator'

const router = Router()

export const routesWrapper = (controller: PayController) =>{
    router.post('/:paymentId',controller.respondWithMethodNotAllowed)
    router.post('/', 
        middlewear.postValidators,
        validator.handleValidationErrors, 
        controller.addNew
    )

    router.get('/',controller.getMany)
    router.get('/:orderId', 
        middlewear.referenceIdValidator,
        validator.handleValidationErrors,
        controller.getOne
    )

    router.put('/', controller.respondWithMethodNotAllowed)
    router.put('/:orderId',
        middlewear.postValidators,
        middlewear.referenceIdValidator,
        validator.handleValidationErrors,
        controller.updateOne
    )

    router.patch('/', controller.respondWithMethodNotAllowed)
    router.patch('/:orderId',
        middlewear.patchValidators,
        middlewear.referenceIdValidator,
        validator.handleValidationErrors,
        controller.modifyOne
    )

    router.delete('/', controller.respondWithMethodNotAllowed)
    router.delete('/:orderId', 
        middlewear.referenceIdValidator,
        validator.handleValidationErrors,
        controller.deleteOne
    )

    return router
}