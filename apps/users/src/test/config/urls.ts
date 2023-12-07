import { UsersController } from "../../controller/controller";
import { Router } from "express";
import * as middlewear from "../../z-library/validation/middlewears";
import { validator } from "../../z-library/validation/validator";

const router = Router()

export const routesWrapper = (controller: UsersController) =>{
    
    router.post('/:id', controller.respondWithMethodNotAllowed)
    router.post('/', 
        middlewear.userValidators ,
        validator.handleValidationErrors,
        controller.addNew
    )

    router.get('/', controller.getMany)
    router.get('/:id', 
        validator.validateReferenceId('id'),
        validator.handleValidationErrors,
        controller.getOne
    )

    router.put('/', controller.respondWithMethodNotAllowed)
    router.put('/:id', 
        validator.validateReferenceId('id'),
        middlewear.userValidators, 
        validator.handleValidationErrors,
        controller.updateOne
    )
    
    router.patch('/', controller.respondWithMethodNotAllowed)
    router.patch('/:id', 
        validator.validateReferenceId('id'),
        middlewear.patchValidators, 
        validator.handleValidationErrors,
        controller.modifyOne
    )

    router.delete('/', controller.respondWithMethodNotAllowed)
    router.delete('/:id', 
        validator.validateReferenceId('id'),
        validator.handleValidationErrors,
        controller.deleteOne
    )

    return router
}