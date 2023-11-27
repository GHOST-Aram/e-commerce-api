import Router from 'express'
import { Controller } from '../controller/controller'
import * as middlewear from '../utils/middlewear'

const router = Router()

export const routesWrapper = (controller: Controller) =>{
    router.post('/:orderId', controller.respondWithMethodNotAllowed)
    router.post('/', middlewear.validateItem,
        controller.handleValidationErrors,
        controller.addNewOrder)
    return router
}