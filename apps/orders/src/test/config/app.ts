import { OrdersController } from "../../controller/controller";
import { Order } from "../../data-access/model";
import { mockAuth } from "../mocks/auth";
import { DataAccess } from "../mocks/data-access";
import { routesWrapper } from "./urls";
import express from 'express'

const dataAccess = new DataAccess(Order)
const controller = new OrdersController(dataAccess)
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/orders', mockAuth, routesWrapper(controller))


export { app }