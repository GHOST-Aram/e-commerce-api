import { Router } from "express";
import { ProductsController } from "../../controller/controller";
import * as middlewears from "../../z-library/validation/middlewears";
import { validator } from "../../z-library/validation/validator";
import { mockAuth } from "../mocks/auth";

const router = Router()

const routesWrapper = (controller: ProductsController) =>{

    router.post('/:id', controller.respondWithMethodNotAllowed)
    router.post('/',
        mockAuth,
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
        mockAuth,
        middlewears.productValidators, 
        middlewears.validateReferenceId,
        validator.handleValidationErrors,
        controller.updateOne
    )

    router.patch('/',controller.respondWithMethodNotAllowed)

    router.patch('/:id', 
        mockAuth,
        middlewears.patchValidators,
        middlewears.validateReferenceId,
        validator.handleValidationErrors,
        controller.modifyOne
    )

    router.delete('/', controller.respondWithMethodNotAllowed)
    router.delete('/:id', 
        mockAuth,
        middlewears.validateReferenceId,
        validator.handleValidationErrors,
        controller.deleteOne
    )

    return router

}

export { routesWrapper }