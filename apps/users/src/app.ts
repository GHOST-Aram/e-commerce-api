import { routesWrapper } from "./routes/urls";
import { usersDAL } from "./data-access/data-access";
import { httpErrors } from "./z-library/HTTP/http-errors";
import { UsersController } from "./controller/controller";
import { app } from "./config/config";

const controller = new UsersController(usersDAL)
app.use('/users',routesWrapper(controller))

//Handle errors -- Unknown path
app.use(httpErrors.handleUnknownUrls)
app.use(httpErrors.handleServerErrors)

export { app }