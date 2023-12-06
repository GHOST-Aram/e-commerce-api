import { CartsController } from "./controller/controller";
import { dataAccess } from "./data-access/data-access";
import { routesWrapper } from "./routes/urls";
import { httpErrors } from "./z-library/HTTP/http-errors";
import { app } from "./config/config";
import logger from "morgan"

//Log requests
app.use(logger('dev'))

//Authenticate




const controller = new CartsController(dataAccess)
app.use('/carts', routesWrapper(controller))

//Handle errors -- Unknown path
app.use(httpErrors.handleUnknownUrls)
app.use(httpErrors.handleServerErrors)


export {app}