import { ReviewsController } from "./controller/controller";
import { dataAccess } from "./data-access/data-access";
import { routesWrapper } from "./routes/urls";
import { httpErrors } from "../../library/HTTP/http-errors";
import { app } from "./config/config";

const controller = new ReviewsController(dataAccess)

app.use('/reviews', routesWrapper(controller))

//Handle errors -- Unknown path
app.use(httpErrors.handleUnknownUrls)
app.use(httpErrors.handleServerErrors)

export { app }
