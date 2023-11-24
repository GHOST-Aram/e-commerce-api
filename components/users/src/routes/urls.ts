import { UsersController } from "../controller/controller";
import { Router } from "express";
import { userValidators } from "../utils/middlewears";

const router = Router()

export const routesWrapper = (controller: UsersController) =>{
    router.post('/', userValidators ,controller.AddNewUser)
    router.get('/', controller.getMultipleUsers)
    router.get('/:id', controller.getOneUser)

    return router
}