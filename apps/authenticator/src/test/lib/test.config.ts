import { AuthController } from "../../controller/controller";
import { dataAccess } from "../mocks/data-access";
import { routesWrapper } from "../../routes/urls";
import { app } from "../../config/config";

const controller = new AuthController(dataAccess)

app.use('/auth', routesWrapper(controller))

export { app }