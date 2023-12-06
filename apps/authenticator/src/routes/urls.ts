import Router from 'express'
import { AuthController } from '../controller/controller'
import { validator } from '../z-library/validation/validator'
const router = Router()

export const routesWrapper = (controller: AuthController) =>{
    
    router.post('/:id', controller.respondWithMethodNotAllowed)

    router.post('/', 
        validator.validateEmail(),
        validator.validatePassword(),
        validator.handleValidationErrors,
        controller.signIn
    )
    
    return router
}