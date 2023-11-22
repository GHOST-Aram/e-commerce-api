import { app } from "../config/config";
import { routesWrapper } from "../routes/urls";
import { ProductsController } from "../controller/controller";
import { ProductsDAL } from "../data-access/data-access";
import { describe, expect, test } from "@jest/globals"


const dal = new ProductsDAL()
const controller = new ProductsController(dal)

app.use('/products', routesWrapper(controller))

