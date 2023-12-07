import { PayController } from "./controller/controller";
import { dataAccess } from "./data-access/data-access";
import { routesWrapper } from "./test/config/urls";
import { httpErrors } from "./z-library/HTTP/http-errors";
import { app } from "./config/config";
import { authenticator } from "./z-library/auth/auth";


const controller = new PayController(dataAccess)

app.use('/payments', authenticator.authenticate(), routesWrapper(controller))

//Handle errors -- Unknown path
app.use(httpErrors.handleUnknownUrls)
app.use(httpErrors.handleServerErrors)


export { app }