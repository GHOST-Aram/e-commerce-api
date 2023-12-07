import { ReviewsController } from "./controller/controller";
import { dataAccess } from "./data-access/data-access";
import { routesWrapper } from "./test/config/urls";
import { httpErrors } from "./z-library/HTTP/http-errors";
import { app } from "./config/config";
import logger from "morgan"
import { authenticator } from "./z-library/auth/auth";

//Log requests
app.use(logger('dev'))

const controller = new ReviewsController(dataAccess)

app.use('/reviews', routesWrapper(controller))

//Handle errors -- Unknown path
app.use(httpErrors.handleUnknownUrls)
app.use(httpErrors.handleServerErrors)


export { app }
