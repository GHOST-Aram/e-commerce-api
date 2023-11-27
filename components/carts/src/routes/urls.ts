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
    router.put('/:customerId',middlewear.updateInputValidator,
        controller.handleValidationErrors,
        controller.updateCartItems)

    router.patch('/', controller.respondWithMethodNotAllowed)
    router.patch('/:customerId/add-item', 
        middlewear.patchDataValidator,
        controller.handleValidationErrors,
        controller.addItem)

    router.patch('/:customerId/remove-item',
        middlewear.patchDataValidator,
        controller.handleValidationErrors,
        controller.removeItem)
    return router
}