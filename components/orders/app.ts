import { OrdersController } from "./controller/controller";
import { dataAccess } from "./data-access/data-access";
import { routesWrapper } from "./routes/urls";
import { app } from "./config/config";

const controller = new OrdersController(dataAccess)

app.use('/orders', routesWrapper(controller))
