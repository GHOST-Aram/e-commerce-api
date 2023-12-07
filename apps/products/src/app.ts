import { routesWrapper } from "./test/config/urls";
import { httpErrors } from "./z-library/HTTP/http-errors";
import { ProductsController } from "./controller/controller";
import { ProductsDAL } from "./data-access/data-access";
import { app } from "./config/config";
import logger from "morgan"

//Log requests
app.use(logger('dev'))

const dal = new ProductsDAL()
const controller = new ProductsController(dal)

app.use('/products', routesWrapper(controller))

//Handle errors -- Unknown path
app.use(httpErrors.handleUnknownUrls)
app.use(httpErrors.handleServerErrors)


export { app }