import Router from 'express'
import { Controller } from '../controller/controller'
import * as middlewear from '../utils/middlewear'
import { validator } from '../utils/validator'

const router = Router()

export const routesWrapper = (controller: Controller) =>{
    router.post('/:orderId', controller.respondWithMethodNotAllowed)

    router.post('/', middlewear.orderDataValidators,
        validator.handleValidationErrors,
        controller.addNew
    )

    router.get('/', controller.getMany)

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
        controller.modifyOrder
    )

    router.delete('/', controller.respondWithMethodNotAllowed)

    router.delete('/:orderId', validator.validateReferenceId('orderId'),
        validator.handleValidationErrors,
        controller.deleteOne
    )
        
    return router
}