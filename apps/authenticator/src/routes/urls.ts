import Router from 'express'
import { AuthController } from '../controller/controller'
const router = Router()

export const routesWrapper = (controller: AuthController) =>{
        
    return router
}