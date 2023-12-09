import { CartsController } from "../../controller/controller";
import { Cart } from "../../data-access/model";
import { DataAccess } from "../mocks/data-access";
import { routesWrapper } from "./urls";
import express from 'express'

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const dataAccess = new DataAccess(Cart)
const controller = new CartsController(dataAccess)

app.use('/carts', routesWrapper(controller))

export { app }