import { CartsController } from "../../controller/controller";
import { Cart } from "../../data-access/model";
import { DataAccess } from "../mocks/data-access";
import { routesWrapper } from "../../routes/urls";
import express from 'express'
import { authenticator } from "../mocks/auth";
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const dataAccess = new DataAccess(Cart)
const controller = new CartsController(dataAccess)

app.use('/carts',routesWrapper(controller, authenticator))

export { app }