import { UsersController } from "../controller/controller";
import { Router } from "express";
import { userValidators } from "../utils/middlewears";

const router = Router()

export const routesWrapper = (controller: UsersController) =>{
    router.post('/', userValidators ,controller.AddNewUser)

    return router
}