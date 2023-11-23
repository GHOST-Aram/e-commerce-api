import { Router } from "express";
import { ProductsController } from "../controller/controller";
import * as validator from "../utils/validator";

const router = Router()

const routesWrapper = (controller: ProductsController) =>{
    router.post('/',validator.productValidators, controller.AddNewProduct)
    router.get('/', controller.getProducts)
    router.get('/brands/:brandName', controller.getProductsByBrandName)
    router.get('/:id', controller.getOneProduct)

    return router

}

export { routesWrapper }