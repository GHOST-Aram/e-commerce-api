import { UsersController } from "../controller/controller";
import { Router } from "express";

const router = Router()

export const routesWrapper = (controller: UsersController) =>{
    router.post('/')

    return router
}