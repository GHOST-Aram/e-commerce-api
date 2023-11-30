import Router from 'express'
import { Controller } from '../controller/controller'
import * as middlewear from '../utils/middlewear'
import { validator } from '../utils/validator'

const router = Router()

export const routesWrapper = (controller: Controller) =>{
    router.post('/', 
        middlewear.initialInputValidators, 
        validator.handleValidationErrors, 
        controller.addNew
    )

    router.post('/:id', 
        controller.respondWithMethodNotAllowed
    )

    router.get('/', controller.getMany)
    router.get('/:customerId',
        validator.validateReferenceId('customerId') ,
        validator.handleValidationErrors,
        controller.getOne
    )

    router.put('/', controller.respondWithMethodNotAllowed)
    router.put('/:customerId',middlewear.updateInputValidator,
        validator.handleValidationErrors,
        controller.updateOne
    )

    router.patch('/', controller.respondWithMethodNotAllowed)
    router.patch('/:customerId/add-item', 
        middlewear.patchDataValidator,
        validator.handleValidationErrors,
        controller.addtoCart
    )

    router.patch('/:customerId/remove-item',
        middlewear.patchDataValidator,
        validator.handleValidationErrors,
        controller.removeFromCart
    )

    router.delete('/', controller.respondWithMethodNotAllowed)
    router.delete('/:customerId', 
        validator.validateReferenceId('customerId'),
        validator.handleValidationErrors,
        controller.deleteOne
    )
    
    return router
}