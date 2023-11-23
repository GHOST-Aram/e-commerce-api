import { Router } from "express";
import { ProductsController } from "../controller/controller";
import * as validator from "../utils/validator";

const router = Router()

const routesWrapper = (controller: ProductsController) =>{
    router.post('/',validator.productValidators, controller.AddNewProduct)
    router.get('/', controller.getProducts)
    router.get('/:id', controller.getOneProduct)
    router.get('/brands/:brandName', 
        controller.getProductsByBrandName
    )
    router.get('/manufacturer/:manufacturerName', 
        controller.getProductsByManufacturerName
    )

    return router

}

export { routesWrapper }