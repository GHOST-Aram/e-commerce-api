import { UsersController } from "../controller/controller";
import { Router } from "express";
import * as middlewear from "./input-validation";
import { validator } from "../utils/validator";
import { Authenticatable, Authenticator } from "../z-library/auth/auth";

const router = Router()

export const routesWrapper = (
    controller: UsersController, authenticator: Authenticator | Authenticatable ) =>{
    
    router.post('/:id', controller.respondWithMethodNotAllowed)
    router.post('/', 
        middlewear.userValidators ,
        validator.handleValidationErrors,
        controller.addNew
    )

    router.get('/', 
        authenticator.authenticate(),
        authenticator.allowAdminUser,
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
        authenticator.allowAdminUser,
        validator.validateReferenceId('id'),
        validator.handleValidationErrors,
        controller.deleteOne
    )

    return router
}