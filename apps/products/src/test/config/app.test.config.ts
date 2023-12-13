import { routesWrapper } from "../../routes/urls";
import { ProductsController } from "../../controller/controller";
import { ProductsDAL } from "../mocks/data-access";
import express from 'express'
import { Product } from "../../data-access/model";
import { authenticator } from "../mocks/auth";

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())


const dal = new ProductsDAL(Product)
const controller:ProductsController = new ProductsController(dal)

app.use('/products', routesWrapper(controller, authenticator ))

export { app }