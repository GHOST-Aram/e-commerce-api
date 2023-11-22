import { Router } from "express";
import { ProductsController } from "../controller/controller";
import { productValidators } from "../utils/validator";

const router = Router()

const routesWrapper = (controller: ProductsController) =>{
    router.post('/',productValidators, controller.AddNewProduct)

    return router

}

export { routesWrapper }