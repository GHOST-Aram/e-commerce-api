import { Router } from "express";
import { ProductsController } from "../controller/controller";
import { patchValidators, productValidators } from "../utils/middlewears";

const router = Router()

const routesWrapper = (controller: ProductsController) =>{
    router.post('/',productValidators, controller.AddNewProduct)
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
        controller.getProductsByCategory)

    router.put('/', productValidators, 
        controller.updateAllProducts)

    router.put('/:id',productValidators, 
        controller.updateOneProduct )

    router.patch('/', patchValidators, 
        controller.modifyAllProducts)
        
    router.patch('/:id', patchValidators,
        controller.modifyOneProduct)

    return router

}

export { routesWrapper }