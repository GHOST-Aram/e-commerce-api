import Router from 'express'
import { Controller } from '../controller/controller'
import * as middlewear from '../utils/middlewear'

const router = Router()

export const routesWrapper = (controller: Controller) =>{
    router.post('/', middlewear.initialInputValidators, 
        controller.handleValidationErrors, 
        controller.addNewCart)

    router.post('/:id', controller.respondWithMethodNotAllowed)

    router.get('/', controller.getManyCarts)
    router.get('/:customerId', controller.getOneCart)

    router.put('/', controller.respondWithMethodNotAllowed)
    router.put('/:customerId',middlewear.validateUpdateData,
        controller.handleValidationErrors,
        controller.updateCartItems)


    return router
}