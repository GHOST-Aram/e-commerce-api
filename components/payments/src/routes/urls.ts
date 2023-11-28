import Router from 'express'
import { Controller } from '../controller/controller'
import * as middlewear from '../utils/middlewear'

const router = Router()

export const routesWrapper = (controller: Controller) =>{
    router.post('/:paymentId',controller.respondWithMethodNotAllowed)
    router.post('/', 
        middlewear.postValidators,
        controller.handleValidationErrors, 
        controller.addNewPayment)
        
    return router
}