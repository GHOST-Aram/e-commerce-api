import Router from 'express'
import { Controller } from '../controller/controller'

const router = Router()

export const routesWrapper = (controller: Controller) =>{

    return router
}