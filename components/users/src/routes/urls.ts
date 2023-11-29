import { UsersController } from "../controller/controller";
import { Router } from "express";
import * as middlewear from "../utils/middlewears";
import { validator } from "../utils/validator";

const router = Router()

export const routesWrapper = (controller: UsersController) =>{
    router.post('/', 
        middlewear.userValidators ,
        controller.handleValidationErrors,
        controller.AddNewUser
    )

    router.get('/', controller.getMultipleUsers)
    router.get('/:id', 
        validator.validateReferenceId('id'),
        controller.handleValidationErrors,
        controller.getOneUser
    )

    router.put('/', controller.respondWithMethodNotAllowed)
    router.put('/:id', 
        validator.validateReferenceId('id'),
        middlewear.userValidators, 
        controller.handleValidationErrors,
        controller.updateOneUser
    )
    
    router.patch('/', controller.respondWithMethodNotAllowed)
    router.patch('/:id', 
        validator.validateReferenceId('id'),
        middlewear.patchValidators, 
        controller.handleValidationErrors,
        controller.modifyOneUser
    )

    router.delete('/', controller.respondWithMethodNotAllowed)
    router.delete('/:id', 
        validator.validateReferenceId('id'),
        controller.handleValidationErrors,
        controller.removeOneUser
    )

    return router
}