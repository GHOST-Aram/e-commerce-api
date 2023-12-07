import { UsersController } from "../controller/controller";
import { Router } from "express";
import * as middlewear from "../z-library/validation/middlewears";
import { validator } from "../z-library/validation/validator";
import { authenticator } from "../z-library/auth/auth";

const router = Router()

export const routesWrapper = (controller: UsersController) =>{
    
    router.post('/:id', controller.respondWithMethodNotAllowed)
    router.post('/', 
        middlewear.userValidators ,
        validator.handleValidationErrors,
        controller.addNew
    )

    router.get('/', 
        authenticator.authenticate(),
        authenticator.isAdminUser,
        controller.getMany
    )
    router.get('/:id',
        authenticator.authenticate(), 
        validator.validateReferenceId('id'),
        validator.handleValidationErrors,
        controller.getOne
    )

    router.put('/', controller.respondWithMethodNotAllowed)
    router.put('/:id', 
        authenticator.authenticate(),
        validator.validateReferenceId('id'),
        middlewear.userValidators, 
        validator.handleValidationErrors,
        controller.updateOne
    )
    
    router.patch('/', controller.respondWithMethodNotAllowed)
    router.patch('/:id', 
        authenticator.authenticate(),
        validator.validateReferenceId('id'),
        middlewear.patchValidators, 
        validator.handleValidationErrors,
        controller.modifyOne
    )

    router.delete('/', controller.respondWithMethodNotAllowed)
    router.delete('/:id', 
        authenticator.authenticate(),
        authenticator.isAdminUser,
        validator.validateReferenceId('id'),
        validator.handleValidationErrors,
        controller.deleteOne
    )

    return router
}