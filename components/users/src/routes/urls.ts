import { UsersController } from "../controller/controller";
import { Router } from "express";
import * as middlewear from "../utils/middlewears";

const router = Router()

export const routesWrapper = (controller: UsersController) =>{
    router.post('/', middlewear.userValidators ,
        controller.AddNewUser)

    router.get('/', controller.getMultipleUsers)
    router.get('/:id', controller.getOneUser)

    router.put('/', controller.respondWithMethodNotAllowed)
    router.put('/:id', middlewear.userValidators, 
        controller.updateOneUser)
    
    router.patch('/', controller.respondWithMethodNotAllowed)
    router.patch('/:id', middlewear.patchValidators, 
        controller.modifyOneUser)

    router.delete('/', controller.respondWithMethodNotAllowed)
    router.delete('/:id', controller.removeOneUser)

    return router
}