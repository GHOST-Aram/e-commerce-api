import Router from 'express'
import { Controller } from '../controller/controller'
import * as middlewear from '../utils/middlewear'

const router = Router()

export const routesWrapper = (controller: Controller) =>{
    router.post('/:paymentId',controller.respondWithMethodNotAllowed)
    router.post('/', 
        middlewear.postValidators,
        controller.handleValidationErrors, 
        controller.addNew
    )

    router.get('/',controller.getMany)
    router.get('/:orderId', 
        middlewear.referenceIdValidator,
        controller.handleValidationErrors,
        controller.getOne
    )

    router.put('/', controller.respondWithMethodNotAllowed)
    router.put('/:orderId',
        middlewear.postValidators,
        middlewear.referenceIdValidator,
        controller.handleValidationErrors,
        controller.updateOne
    )

    router.patch('/', controller.respondWithMethodNotAllowed)
    router.patch('/:orderId',
        middlewear.patchValidators,
        middlewear.referenceIdValidator,
        controller.handleValidationErrors,
        controller.modifyOne
    )

    router.delete('/', controller.respondWithMethodNotAllowed)
    router.delete('/:orderId', 
        middlewear.referenceIdValidator,
        controller.handleValidationErrors,
        controller.deleteOne
    )

    return router
}