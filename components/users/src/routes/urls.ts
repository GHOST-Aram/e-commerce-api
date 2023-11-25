import { UsersController } from "../controller/controller";
import { Router } from "express";
import { patchValidators, userValidators } from "../utils/middlewears";

const router = Router()

export const routesWrapper = (controller: UsersController) =>{
    router.post('/', userValidators ,controller.AddNewUser)

    router.get('/', controller.getMultipleUsers)
    router.get('/:id', controller.getOneUser)

    router.put('/', controller.updateAllUsers)
    router.put('/:id', userValidators, controller.updateOneUser)
    
    router.patch('/', controller.modifyAllUsers)
    router.patch('/:id', patchValidators, controller.modifyOneUser)

    router.delete('/', controller.removeAllUsers)
    router.delete('/:id', controller.removeOneUser)

    return router
}