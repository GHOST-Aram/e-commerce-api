import Router from 'express'
import { Controller } from '../controller/controller'
import { initialInputValidators } from '../utils/middlewear'

const router = Router()

export const routesWrapper = (controller: Controller) =>{
    router.post('/', initialInputValidators, 
        controller.handleValidationErrors, 
        controller.addNewCart)

    router.post('/:id', controller.handleMethodNotAllowed)

    router.get('/', controller.getManyCarts)
    router.get('/:customerId', controller.getOneCart)

    return router
}