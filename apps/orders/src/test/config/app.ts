import { OrdersController } from "../../controller/controller";
import { dataAccess } from "../mocks/data-access";
import { routesWrapper } from "./urls";
import express from 'express'

const controller = new OrdersController(dataAccess)
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/orders', routesWrapper(controller))


export { app }