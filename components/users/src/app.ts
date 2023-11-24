import { app } from "./config/config";
import { routesWrapper } from "./routes/urls";
import { usersDAL } from "./data-access/data-access";
import { UsersController } from "./controller/controller";

const controller = new UsersController(usersDAL)
app.use(routesWrapper(controller))