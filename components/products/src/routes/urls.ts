import { Router } from "express";
import { ProductsController } from "../controller/controller";
import { 
    patchValidators, 
    productValidators 
} from "../utils/middlewears";

const router = Router()

const routesWrapper = (controller: ProductsController) =>{
    router.post('/',productValidators, 
        controller.handleValidationErrors,
        controller.AddNewProduct)

    router.get('/', controller.getProducts)
    router.get('/:id', controller.getOneProduct)

    router.get('/brands/:brandName', 
        controller.getProductsByBrand)

    router.get('/manufacturer/:manufacturerName', 
        controller.getProductsByManufacturer)

    router.get('/models/:modelName', 
        controller.getProductsByModel)

    router.get('/selling-price/:range', 
        controller.getProductsByPriceRange)

    router.get('/categories/:categoryName',
        controller.getProductsByCategory
    )

    router.put('/', controller.respondWithMethodNotAllowed)

    router.put('/:id',productValidators, 
        controller.handleValidationErrors,
        controller.updateOneProduct 
    )

    router.patch('/',controller.respondWithMethodNotAllowed)

    router.patch('/:id', patchValidators,
        controller.handleValidationErrors,
        controller.modifyOneProduct
    )

    router.delete('/', controller.respondWithMethodNotAllowed)
    router.delete('/:id', controller.deleteOneProduct)

    return router

}

export { routesWrapper }