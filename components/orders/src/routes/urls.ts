import Router from 'express'
import { Controller } from '../controller/controller'
import * as middlewear from '../utils/middlewear'
import { validator } from '../utils/validator'

const router = Router()

export const routesWrapper = (controller: Controller) =>{
    router.post('/:orderId', controller.respondWithMethodNotAllowed)

    router.post('/', middlewear.orderDataValidators,
        controller.handleValidationErrors,
        controller.addNewOrder
    )

    router.get('/', controller.getOrders)

    router.get('/:orderId', validator.validateReferenceId('orderId'),
        controller.handleValidationErrors,
        controller.getOneOrder
    )

    router.put('/', controller.respondWithMethodNotAllowed)

    router.put('/:orderId', 
        validator.validateReferenceId('orderId'),
        middlewear.orderDataValidators,
        controller.handleValidationErrors,
        controller.updateOrder)
        
    return router
}