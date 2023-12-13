import { Router } from "express";
import { ProductsController } from "../controller/controller";
import * as middlewears from "../z-library/validation/middlewears";
import { validator } from "../z-library/validation/validator";
import { Authenticatable, Authenticator } from "../z-library/auth/auth";

const router = Router()

const routesWrapper = (
    controller: ProductsController, 
    authenticator: Authenticator | Authenticatable
    ) =>{

    router.post('/:id', controller.respondWithMethodNotAllowed)
    router.post('/',
        authenticator.authenticate(),
        authenticator.allowAdminUser,
        middlewears.productValidators, 
        validator.handleValidationErrors,
        controller.addNew
    )

    router.get('/', controller.getMany)
    router.get('/:id', 
        middlewears.validateReferenceId,
        validator.handleValidationErrors,
        controller.getOne
    )

    router.get('/selling-price/:range',
        validator.validatePriceRangeParam('range'),
        validator.handleValidationErrors,
        controller.getByPriceRange
    )

    router.get('/categories/:categoryName',
        validator.validateReferenceName('categoryName'),
        validator.handleValidationErrors,
        controller.getByCategory
    )
    
    router.get('/brands/:brandName', 
        validator.validateReferenceName('brandName'),
        validator.handleValidationErrors,
        controller.getByBrand
    )


    router.get('/manufacturer/:manufacturerName',
        validator.validateReferenceName('manufacturerName'),
        validator.handleValidationErrors, 
        controller.getByManufacturer
    )

    router.get('/models/:modelName', 
        validator.validateReferenceName('modelName'),
        validator.handleValidationErrors,
        controller.getByModelName
    )

    router.put('/', controller.respondWithMethodNotAllowed)

    router.put('/:id',
        authenticator.authenticate(),
        authenticator.allowAdminUser,
        middlewears.productValidators, 
        middlewears.validateReferenceId,
        validator.handleValidationErrors,
        controller.updateOne
    )

    router.patch('/',controller.respondWithMethodNotAllowed)

    router.patch('/:id', 
        authenticator.authenticate(),
        authenticator.allowAdminUser,
        middlewears.patchValidators,
        middlewears.validateReferenceId,
        validator.handleValidationErrors,
        controller.modifyOne
    )

    router.delete('/', controller.respondWithMethodNotAllowed)
    router.delete('/:id', 
        authenticator.authenticate(),
        authenticator.allowAdminUser,
        middlewears.validateReferenceId,
        validator.handleValidationErrors,
        controller.deleteOne
    )

    return router

}

export { routesWrapper }