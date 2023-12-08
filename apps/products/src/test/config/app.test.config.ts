import { routesWrapper } from "./urls";
import { ProductsController } from "../../controller/controller";
import { ProductsDAL } from "../mocks/data-access";
import express from 'express'
import { Product } from "../../data-access/model";

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())


const dal = new ProductsDAL(Product)
const controller = new ProductsController(dal)

app.use('/products', routesWrapper(controller))

export { app }