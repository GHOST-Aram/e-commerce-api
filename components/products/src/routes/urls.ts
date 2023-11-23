import { Router } from "express";
import { ProductsController } from "../controller/controller";
import * as validator from "../utils/validator";

const router = Router()

const routesWrapper = (controller: ProductsController) =>{
    router.post('/',validator.productValidators, controller.AddNewProduct)
    router.get('/', controller.getProducts)
    router.get('/:id', controller.getOneProduct)
    router.get('/brands/:brandName', 
        controller.getProductsByBrand
    )
    router.get('/manufacturer/:manufacturerName', 
        controller.getProductsByManufacturer
    )
    router.get('/models/:modelName', 
        controller.getProductsByModel
    )

    router.get('/selling-price/:range', 
        controller.getProductsByPriceRange
    )

    router.get('/categories/:categoryName',
        controller.getProductsByCategory
    )

    return router

}

export { routesWrapper }