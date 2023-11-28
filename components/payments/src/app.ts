import { Controller } from "./controller/controller";
import { dataAccess } from "./data-access/data-access";
import { routesWrapper } from "./routes/urls";
import { app } from "./config/config";

const controller = new Controller(dataAccess)

app.use('/payments', routesWrapper(controller))
