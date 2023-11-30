import { Router } from "express";
import { ProductsController } from "../controller/controller";
import * as middlewears from "../utils/middlewears";
import { validator } from "../utils/validator";

const router = Router()

const routesWrapper = (controller: ProductsController) =>{

    router.post('/:id', controller.respondWithMethodNotAllowed)
    router.post('/',
        middlewears.productValidators, 
        validator.handleValidationErrors,
        controller.AddNewProduct
    )

    router.get('/', controller.getProducts)
    router.get('/:id', 
        middlewears.validateReferenceId,
        validator.handleValidationErrors,
        controller.getOneProduct
    )

    router.get('/brands/:brandName', 
        validator.validateReferenceName('brandName'),
        validator.handleValidationErrors,
        controller.getProductsByBrand
    )

    router.get('/manufacturer/:manufacturerName',
        validator.validateReferenceName('manufacturerName'),
        validator.handleValidationErrors, 
        controller.getProductsByManufacturer
    )

    router.get('/models/:modelName', 
        validator.validateReferenceName('modelName'),
        validator.handleValidationErrors,
        controller.getProductsByModel
    )

    router.get('/selling-price/:range',
        validator.validatePriceRangeParam('range'),
        validator.handleValidationErrors,
        controller.getProductsByPriceRange
    )

    router.get('/categories/:categoryName',
        validator.validateReferenceName('categoryName'),
        validator.handleValidationErrors,
        controller.getProductsByCategory
    )

    router.put('/', controller.respondWithMethodNotAllowed)

    router.put('/:id',
        middlewears.productValidators, 
        middlewears.validateReferenceId,
        validator.handleValidationErrors,
        controller.updateOneProduct 
    )

    router.patch('/',controller.respondWithMethodNotAllowed)

    router.patch('/:id', 
        middlewears.patchValidators,
        middlewears.validateReferenceId,
        validator.handleValidationErrors,
        controller.modifyOneProduct
    )

    router.delete('/', controller.respondWithMethodNotAllowed)
    router.delete('/:id', 
        middlewears.validateReferenceId,
        validator.handleValidationErrors,
        controller.deleteOneProduct
    )

    return router

}

export { routesWrapper }