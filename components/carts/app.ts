import { CartsController } from "./controller/controller";
import { dataAccess } from "./data-access/data-access";
import { routesWrapper } from "./routes/urls";
import { app } from "./config/config";



const controller = new CartsController(dataAccess)
app.use('/carts', routesWrapper(controller))

 //Handle errors -- Unknown path
 app.use(controller.handleUnknownUrls)
 app.use(controller.handleServerErrors)

export {app}