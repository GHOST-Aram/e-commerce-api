import { PayController } from "./controller/controller";
import { dataAccess } from "./data-access/data-access";
import { routesWrapper } from "./routes/urls";
import { app } from "./config/config";

const controller = new PayController(dataAccess)

app.use('/payments', routesWrapper(controller))
