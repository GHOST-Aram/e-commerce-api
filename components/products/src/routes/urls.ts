import { Router } from "express";
import { ProductsController } from "../controller/controller";

const router = Router()

const routesWrapper = (controller: ProductsController) =>{
    router.post('/',controller.AddNewProduct)

    return router

}

export { routesWrapper }