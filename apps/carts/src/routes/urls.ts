import Router from 'express'
import { CartsController } from '../controller/controller'
import * as middlewear from './input-validation'
import { validator } from '../utils/validator'
import { Authenticatable, Authenticator } from '../z-library/auth/auth'

const router = Router()

export const routesWrapper = (
    controller: CartsController, authenticator: Authenticator | Authenticatable) =>{

    router.post('/', authenticator.authenticate(), 
        validator.validateObjectIDArray('items'), 
        validator.handleValidationErrors, 
        controller.addNew
    )

    router.post('/:id', authenticator.authenticate(),
        controller.respondWithMethodNotAllowed
    )

    router.get('/', authenticator.authenticate(),
        authenticator.allowAdminUser ,controller.getMany
    )
    router.get('/:customerId', authenticator.authenticate(),
        validator.validateReferenceId('customerId') ,
        validator.handleValidationErrors,
        controller.getOne
    )

    router.put('/', authenticator.authenticate(), 
        controller.respondWithMethodNotAllowed
    )
    router.put('/:customerId',authenticator.authenticate(),
        middlewear.updateInputValidator,
        validator.handleValidationErrors,
        controller.updateOne
    )

    router.patch('/', authenticator.authenticate(),
        controller.modifyOne
    )
    router.patch('/:customerId/add-item', authenticator.authenticate(),
        middlewear.patchDataValidator,
        validator.handleValidationErrors,
        controller.addtoCart
    )

    router.patch('/:customerId/remove-item', authenticator.authenticate(),
        middlewear.patchDataValidator,
        validator.handleValidationErrors,
        controller.removeFromCart
    )

    router.delete('/', authenticator.authenticate(),
        controller.respondWithMethodNotAllowed
    )
    router.delete('/:customerId',authenticator.authenticate(), 
        validator.validateReferenceId('customerId'),
        validator.handleValidationErrors,
        controller.deleteOne
    )
    
    return router
}