import { CartsController } from "../../controller/controller";
import { dataAccess } from "../mocks/data-access";
import { routesWrapper } from "../../routes/urls";
import { app } from "../../config/config";

const controller = new CartsController(dataAccess)

app.use('/carts', routesWrapper(controller))

export { app }