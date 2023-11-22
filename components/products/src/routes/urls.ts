import { Router } from "express";
import { ProductsController } from "../controller/controller";

const router = Router()

const routesWrapper = (controller: ProductsController) =>{
    router.post('/',(req, res) =>{
    
    })

    return router

}

export { routesWrapper }