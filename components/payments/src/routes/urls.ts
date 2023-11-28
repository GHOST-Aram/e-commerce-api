import Router from 'express'
import { Controller } from '../controller/controller'
import * as middlewear from '../utils/middlewear'

const router = Router()

export const routesWrapper = (controller: Controller) =>{
    router.post('/:paymentId',controller.respondWithMethodNotAllowed)
    router.post('/', 
        middlewear.postValidators,
        controller.handleValidationErrors, 
        controller.addNewPayment
    )

    router.get('/',controller.getManyPayments)
    router.get('/:orderId', 
        middlewear.referenceIdValidator,
        controller.handleValidationErrors,
        controller.getOnePayment
    )

    router.put('/', controller.respondWithMethodNotAllowed)
    router.put('/:orderId',
        middlewear.postValidators,
        middlewear.referenceIdValidator,
        controller.handleValidationErrors,
        controller.updatePayment
    )

    return router
}