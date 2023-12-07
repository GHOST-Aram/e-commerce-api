import Router from 'express'
import { CartsController } from '../controller/controller'
import * as middlewear from '../z-library/validators/middlewear'
import { validator } from '../z-library/validators/validator'
import { authenticator } from '../z-library/auth/auth'

const router = Router()

export const routesWrapper = (controller: CartsController) =>{
    router.post('/', 
        middlewear.initialInputValidators, 
        validator.handleValidationErrors, 
        controller.addNew
    )

    router.post('/:id', 
        controller.respondWithMethodNotAllowed
    )

    router.get('/', authenticator.isAdminUser ,controller.getMany)
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