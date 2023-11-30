import { Router } from "express";
import { ProductsController } from "../controller/controller";
import * as middlewears from "../utils/middlewears";
import { validator } from "../utils/validator";

const router = Router()

const routesWrapper = (controller: ProductsController) =>{
    
    router.post('/:id', controller.respondWithMethodNotAllowed)
    router.post('/',
        middlewears.productValidators, 
        controller.handleValidationErrors,
        controller.AddNewProduct
    )

    router.get('/', controller.getProducts)
    router.get('/:id', 
        middlewears.validateReferenceId,
        controller.handleValidationErrors,
        controller.getOneProduct
    )

    router.get('/brands/:brandName', 
        validator.validateReferenceName('brandName'),
        controller.handleValidationErrors,
        controller.getProductsByBrand
    )

    router.get('/manufacturer/:manufacturerName',
        validator.validateReferenceName('manufacturerName'),
        controller.handleValidationErrors, 
        controller.getProductsByManufacturer
    )

    router.get('/models/:modelName', 
        validator.validateReferenceName('modelName'),
        controller.handleValidationErrors,
        controller.getProductsByModel
    )

    router.get('/selling-price/:range',
        validator.validatePriceRange('range'),
        controller.handleValidationErrors,
        controller.getProductsByPriceRange
    )

    router.get('/categories/:categoryName',
        validator.validateReferenceName('categoryName'),
        controller.handleValidationErrors,
        controller.getProductsByCategory
    )

    router.put('/', controller.respondWithMethodNotAllowed)

    router.put('/:id',
        middlewears.productValidators, 
        middlewears.validateReferenceId,
        controller.handleValidationErrors,
        controller.updateOneProduct 
    )

    router.patch('/',controller.respondWithMethodNotAllowed)

    router.patch('/:id', 
        middlewears.patchValidators,
        middlewears.validateReferenceId,
        controller.handleValidationErrors,
        controller.modifyOneProduct
    )

    router.delete('/', controller.respondWithMethodNotAllowed)
    router.delete('/:id', 
        middlewears.validateReferenceId,
        controller.handleValidationErrors,
        controller.deleteOneProduct
    )

    return router

}

export { routesWrapper }