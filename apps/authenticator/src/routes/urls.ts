import Router from 'express'
import { AuthController } from '../controller/controller'
import { validateLoginInput } from './input-validators'
import { validator } from '../utils/validator'

const router = Router()

export const routesWrapper = (controller: AuthController) =>{
    
    router.post('/:id', controller.respondWithMethodNotAllowed)

    router.post('/', 
        validateLoginInput,
        validator.handleValidationErrors,
        controller.signIn
    )
    
    return router
}