import { app } from "./config/config";
import { routesWrapper } from "./routes/urls";
import { usersDAL } from "./data-access/data-access";
import { UsersController } from "./controller/controller";

const controller = new UsersController(usersDAL)
app.use('/users',routesWrapper(controller))

app.use(controller.handleUnknownUrls)
app.use(controller.handleServerErrors)

export { app }