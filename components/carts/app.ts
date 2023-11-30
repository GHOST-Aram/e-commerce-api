import { CartsController } from "./controller/controller";
import { dataAccess } from "./data-access/data-access";
import { routesWrapper } from "./routes/urls";
import { app } from "./config/config";

const controller = new CartsController(dataAccess)

app.use('/app', routesWrapper(controller))
